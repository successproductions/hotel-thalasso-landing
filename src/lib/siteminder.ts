// SiteMinder Direct Booking API: rooms, rates and live prices of the DC Thermes packs, for /dc-thermes/paiement.
// The API is read-only: it cannot create a reservation. A pack paid through CMI is entered in SiteMinder by the team
// (the admin email says so). Server-side only: the key must never reach the browser (SiteMinder's integration rules).
// Docs: https://developer.siteminder.com/direct-booking-api

const BASE = 'https://directbooking.siteminder.com/public-api/api';
const KEY = process.env.SITEMINDER_API_KEY || '';
const PROPERTY = process.env.SITEMINDER_PROPERTY_UUID || '';

// Same rate as /api/payment/initiate: the CMI fee is added to what the client pays
const CMI_FEE_RATE = 0.0297;
export const packAmount = (gross: number) => Math.floor(gross * (1 + CMI_FEE_RATE));

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

export type PackOffer = {
  roomRateUuid: string;
  room: string;
  plan: string;
  size: string;
  photo: string | null;
  available: number;
  gross: number; // SiteMinder price: cure, room on full board and taxe de séjour
  pay: number; // what CMI charges: gross + CMI fee, rounded down
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
const firstPhoto = (roomTypeUuid: string) =>
  cached(`photo:${roomTypeUuid}`, HOUR, async () => {
    const photos = await get<Photo[]>(`/room-types/${roomTypeUuid}/photos`).catch(() => []);
    const url = [...photos].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))[0]?.url;
    return url ? `${url}?w=640&h=420&fit=crop&auto=format` : null;
  });
const quotes = (checkIn: string, checkOut: string, guests: number, fresh: boolean) => {
  const load = () => get<Quote[]>(`/quotes?checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}`);
  return fresh ? load() : cached(`quotes:${checkIn}:${checkOut}:${guests}`, 60 * 1000, load);
};

// The packs are SiteMinder rate plans named "Programme 3 Jours – Vitalité", "Programme 5 Jours – Régénération"…
// Each has one rate per room and number of guests (Single, Double, Triple, Quadruple). The API quotes every rate
// for any stay, so the pack is chosen here: the plan of the cure's length, the rate for exactly this many guests.
async function packRates(days: number, guests: number) {
  const rates = await roomRates();
  const plans = await Promise.all([...new Set(rates.map((r) => r.ratePlanUuid))].map(ratePlan));
  const pack = plans.filter((p) => Number(p.name.match(/(\d+)\s*jours/i)?.[1]) === days);
  if (!pack.length) console.error(`SiteMinder: no rate plan named "Programme ${days} Jours"`);
  const names = new Map(pack.map((p) => [p.uuid, p.name]));
  return new Map(
    rates
      .filter((r) => names.has(r.ratePlanUuid) && r.includedOccupancy === guests)
      .map((r) => [r.uuid, { rate: r, plan: names.get(r.ratePlanUuid)! }]),
  );
}

type Stay = { days: number; checkIn: string; checkOut: string; guests: number };

async function offers({ days, checkIn, checkOut, guests }: Stay, fresh: boolean): Promise<PackOffer[]> {
  const [rates, types, prices] = await Promise.all([packRates(days, guests), roomTypes(), quotes(checkIn, checkOut, guests, fresh)]);
  const typeById = new Map(types.map((t) => [t.uuid, t]));
  const found = prices.filter((q) => rates.has(q.roomRateUuid) && q.availability > 0);
  return Promise.all(
    found.map(async (q) => {
      const type = typeById.get(q.roomTypeUuid);
      return {
        roomRateUuid: q.roomRateUuid,
        room: type?.name || '',
        plan: rates.get(q.roomRateUuid)!.plan,
        size: type?.roomSize ? `${type.roomSize} ${(type.roomSizeUnit || 'm^2').replace('m^2', 'm²')}` : '',
        photo: await firstPhoto(q.roomTypeUuid),
        available: q.availability,
        gross: q.price.gross,
        pay: packAmount(q.price.gross),
        currency: q.price.currency,
      };
    }),
  ).then((list) => list.sort((a, b) => a.gross - b.gross));
}

// Rooms shown on the reservation page (prices cached for a minute)
export const packOffers = (stay: Stay) => offers(stay, false);

// The room chosen by the client, priced again just before the payment: null if it is no longer available
export async function packQuote(stay: Stay & { roomRateUuid: string }): Promise<PackOffer | null> {
  return (await offers(stay, true)).find((o) => o.roomRateUuid === stay.roomRateUuid) || null;
}

// Arrival the day before the first treatment, departure the day after the last (same rule as the page)
export function packStay(cure: string, arrival: string, guests: number): Stay | null {
  const days = ({ vitalite: 3, regeneration: 5, renaissance: 7 } as Record<string, number>)[cure];
  if (!days || !/^\d{4}-\d{2}-\d{2}$/.test(arrival) || !Number.isInteger(guests) || guests < 1 || guests > 4) return null;
  const [y, m, d] = arrival.split('-').map(Number);
  const out = new Date(Date.UTC(y, m - 1, d + days + 1));
  return { days, checkIn: arrival, checkOut: out.toISOString().slice(0, 10), guests };
}
