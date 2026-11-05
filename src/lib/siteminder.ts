// SiteMinder Direct Booking API: hotel rooms and their live prices, for /dc-thermes/paiement/reservation.
// The client books the cure (priced by the site) and, if they wish, a room for the dates and number of people they choose.
// The API is read-only: it cannot create a reservation. A room paid through CMI is entered in SiteMinder by the team
// (the admin email says so). Server-side only: the key must never reach the browser (SiteMinder's integration rules).
// Docs: https://developer.siteminder.com/direct-booking-api

const BASE = 'https://directbooking.siteminder.com/public-api/api';
const KEY = process.env.SITEMINDER_API_KEY || '';
const PROPERTY = process.env.SITEMINDER_PROPERTY_UUID || '';

// Same rate as /api/payment/initiate: the CMI fee is added to what the client pays
const CMI_FEE_RATE = 0.0297;
export const roomAmount = (gross: number) => Math.floor(gross * (1 + CMI_FEE_RATE));

type Page<T> = { page: number; totalPages: number; results: T[] };
type RoomType = { uuid: string; name: string; description: string | null; roomSize: number | null; roomSizeUnit: string | null };
type RoomRate = { uuid: string; roomTypeUuid: string; ratePlanUuid: string; name: string; includedOccupancy: number | null; maxOccupancy: number | null };
type RatePlan = { uuid: string; name: string };
type Photo = { url: string; sortOrder: number | null };
type Quote = {
  roomTypeUuid: string;
  roomRateUuid: string;
  availability: number;
  price: { gross: number; net: number; tax: number; currency: string };
};

export type RoomOffer = {
  roomRateUuid: string;
  room: string;
  plan: string;
  size: string;
  photo: string | null; // first photo, sized for the room card
  photos: string[]; // every photo of the room (imgix URLs without size), for the gallery
  available: number;
  gross: number; // SiteMinder price for the whole stay: room on full board and taxe de séjour
  pay: number; // what CMI charges for it: gross + CMI fee, rounded down
  currency: string;
};

// Short in-memory cache (single PM2 process): the limit is 100 calls a minute per key, and prices must stay fresh
const store = globalThis as typeof globalThis & { smCache?: Map<string, { at: number; value: unknown }> };
const cache = (store.smCache ??= new Map());
async function cached<T>(key: string, ttl: number, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < ttl) return hit.value as T;
  const value = await load();
  cache.set(key, { at: Date.now(), value });
  return value;
}

async function get<T>(path: string): Promise<T> {
  if (!KEY || !PROPERTY) throw new Error('SITEMINDER_API_KEY or SITEMINDER_PROPERTY_UUID is not set');
  const res = await fetch(`${BASE}/properties/${PROPERTY}${path}`, {
    headers: { 'x-sm-api-key': KEY, accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`SiteMinder ${res.status} on ${path} (trace ${res.headers.get('x-sm-trace-token')})`);
  return res.json() as Promise<T>;
}

async function all<T>(path: string): Promise<T[]> {
  const results: T[] = [];
  for (let page = 1; ; page++) {
    const data = await get<Page<T>>(`${path}?page=${page}&perPage=50`);
    results.push(...data.results);
    if (page >= data.totalPages) return results;
  }
}

const HOUR = 60 * 60 * 1000;
const roomTypes = () => cached('room-types', HOUR, () => all<RoomType>('/room-types'));
const roomRates = () => cached('room-rates', 10 * 60 * 1000, () => all<RoomRate>('/room-rates'));
const ratePlan = (uuid: string) => cached(`rate-plan:${uuid}`, HOUR, () => get<RatePlan>(`/rate-plans/${uuid}`));
// The room's photos in the hotel's order (6 to 21 per room in SiteMinder)
const roomPhotos = (roomTypeUuid: string) =>
  cached(`photos:${roomTypeUuid}`, HOUR, async () => {
    const photos = await get<Photo[]>(`/room-types/${roomTypeUuid}/photos`).catch(() => []);
    return [...photos].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99)).map((p) => p.url);
  });
const quotes = (checkIn: string, checkOut: string, guests: number, fresh: boolean) => {
  const load = () => get<Quote[]>(`/quotes?checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}`);
  return fresh ? load() : cached(`quotes:${checkIn}:${checkOut}:${guests}`, 60 * 1000, load);
};

// The room is priced on the "Public Rate" plan: full board, one rate per room and number of guests (Single, Double,
// Triple, Quadruple). SiteMinder's "Programme N Jours" packs are this rate plus the cure, which the site prices itself.
// The API quotes every rate for any stay, so the rate is chosen here: Public Rate, for exactly this many guests.
const ROOM_PLAN = /^public rate$/i;

async function roomRatesFor(guests: number) {
  const rates = await roomRates();
  const plans = await Promise.all([...new Set(rates.map((r) => r.ratePlanUuid))].map(ratePlan));
  const plan = plans.find((p) => ROOM_PLAN.test(p.name.trim()));
  if (!plan) console.error('SiteMinder: no rate plan named "Public Rate"');
  return new Map(
    rates
      .filter((r) => r.ratePlanUuid === plan?.uuid && r.includedOccupancy === guests)
      .map((r) => [r.uuid, plan!.name.trim()]),
  );
}

export type HotelStay = { checkIn: string; checkOut: string; guests: number; nights: number };

async function offers({ checkIn, checkOut, guests }: HotelStay, fresh: boolean): Promise<RoomOffer[]> {
  const [rates, types, prices] = await Promise.all([roomRatesFor(guests), roomTypes(), quotes(checkIn, checkOut, guests, fresh)]);
  const typeById = new Map(types.map((t) => [t.uuid, t]));
  const found = prices.filter((q) => rates.has(q.roomRateUuid) && q.availability > 0);
  return Promise.all(
    found.map(async (q) => {
      const type = typeById.get(q.roomTypeUuid);
      const photos = await roomPhotos(q.roomTypeUuid);
      return {
        roomRateUuid: q.roomRateUuid,
        room: type?.name || '',
        plan: rates.get(q.roomRateUuid)!,
        size: type?.roomSize ? `${type.roomSize} ${(type.roomSizeUnit || 'm^2').replace('m^2', 'm²')}` : '',
        photo: photos[0] ? `${photos[0]}?w=640&h=420&fit=crop&auto=format` : null,
        photos,
        available: q.availability,
        gross: q.price.gross,
        pay: roomAmount(q.price.gross),
        currency: q.price.currency,
      };
    }),
  ).then((list) => list.sort((a, b) => a.gross - b.gross));
}

// Rooms shown on the reservation page (prices cached for a minute)
export const roomOffers = (stay: HotelStay) => offers(stay, false);

// The room chosen by the client, priced again just before the payment: null if it is no longer available
export async function roomQuote(stay: HotelStay & { roomRateUuid: string }): Promise<RoomOffer | null> {
  return (await offers(stay, true)).find((o) => o.roomRateUuid === stay.roomRateUuid) || null;
}

// Cure length in days. The hotel stay lasts at least one night more than the cure (arrival the day before the
// first treatment, departure the day after the last): Vitalité 4 nights, Régénération 6, Renaissance 8.
export const CURE_DAYS: Record<string, number> = { vitalite: 3, regeneration: 5, renaissance: 7 };
export const MAX_NIGHTS = 30; // SiteMinder quotes up to 31 nights
const DAY = 24 * 60 * 60 * 1000;

// The stay chosen on the page, checked: dates, minimum nights for the cure, 1 to 4 guests in the room
export function hotelStay(cure: string, arrival: string, departure: string, guests: number): HotelStay | null {
  const days = CURE_DAYS[cure];
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (!days || !iso.test(arrival) || !iso.test(departure) || !Number.isInteger(guests) || guests < 1 || guests > 4) return null;
  const nights = Math.round((Date.parse(`${departure}T00:00:00Z`) - Date.parse(`${arrival}T00:00:00Z`)) / DAY);
  if (!(nights >= days + 1 && nights <= MAX_NIGHTS)) return null;
  return { checkIn: arrival, checkOut: departure, guests, nights };
}
