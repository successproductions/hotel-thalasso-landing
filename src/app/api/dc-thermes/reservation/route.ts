import { NextRequest, NextResponse } from 'next/server';
import { upsertBrevoContact } from '@/lib/brevo';
import { packOffers, packStay } from '@/lib/siteminder';
import { rememberGuest } from '@/lib/paymentEmails';

// Saves the bookings of the two /dc-thermes versions, then creates the contact in Brevo:
// - /dc-thermes/paiement (funnel "cmi"): saved before CMI with status "En attente",
//   then set to "Paiement confirmé" by /api/payment/success through its orderId
// - /dc-thermes/contact (funnel "lead"): no payment, status "Nouvelle demande", the team calls back
// The Apps Script at GOOGLE_SHEET_EVASION_URL writes each version to its own tab (it recognises `source`),
// with the 8 Meta attribution fields built in the browser by src/lib/metaTracking.ts.
// selectedOffer and pageSlug are sent too: a script without the DC Thermes branch still files
// the row with the panier reservations instead of losing it.
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_SHEET_EVASION_URL || '';

// Same labels as /api/reservations/evasion, so Brevo and the sheets agree
const CURES: Record<string, { days: string; programme: string }> = {
  vitalite: { days: '3', programme: 'Thalasso Vitalité 3 Jours' },
  regeneration: { days: '5', programme: 'Thalasso Régénération 5 Jours' },
  renaissance: { days: '7', programme: 'Thalasso Renaissance 7 Jours' },
};

// Order IDs built on the reservation page: DCT-VIT3-..., DCT-REG5-ACOMPTE-..., DCT-REN7-PACK-... (cure + room)
const ORDER_ID = /^DCT-(VIT3|REG5|REN7)-(ACOMPTE-|PACK-)?[A-Z0-9]{6,24}$/;

// Meta attribution columns of the sheet, passed through as strings ('' when unavailable)
const META_FIELDS = ['fbclid', 'fbp', 'utm_source', 'utm_campaign', 'country', 'event_time', 'event_name', 'event_id'];

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const cmi = data.funnel === 'cmi';
    const cure = CURES[data.cure];
    const guests = Number(data.numberOfPeople);

    const reservation = {
      source: cmi ? 'dc-thermes/paiement' : 'dc-thermes/contact',
      timestamp: new Date().toISOString(),
      programme: cure?.programme || '',
      fullName: text(data.fullName, 120),
      email: text(data.email, 160),
      phone: text(data.phone, 40),
      numberOfPeople: String(Number.isInteger(guests) && guests >= 1 && guests <= 50 ? guests : 1),
      arrivalDate: /^\d{4}-\d{2}-\d{2}$/.test(data.arrivalDate) ? data.arrivalDate : '',
      paymentPlan: cmi ? (data.paymentPlan === 'acompte' ? 'acompte' : 'total') : '',
      message: text(data.message, 1000),
      optIn: data.optIn === true ? 'Oui' : 'Non',
      lang: data.lang === 'en' ? 'en' : 'fr',
      orderId: cmi ? text(data.orderId, 40) : '',
      status: cmi ? 'En attente' : 'Nouvelle demande',
      selectedOffer: cure?.days || '',
      pageSlug: cure ? data.cure : '',
      ...Object.fromEntries(META_FIELDS.map((field) => [field, text(data[field], 500)])),
    };

    // /dc-thermes/paiement also asks for city, postcode, country, how they heard of us and arrival time (in French).
    // Sent as their own fields, and written in the note too, which the sheet already shows.
    const guest = {
      city: cmi ? text(data.city, 80) : '',
      postalCode: cmi ? text(data.postalCode, 20) : '',
      country: cmi ? text(data.residenceCountry, 80) : '',
      heardFrom: cmi ? text(data.heardFrom, 80) : '',
      arrivalTime: cmi ? text(data.arrivalTime, 40) : '',
    };
    const guestNote = [
      guest.city && `Ville : ${guest.city}`,
      guest.postalCode && `Code postal : ${guest.postalCode}`,
      guest.country && `Pays : ${guest.country}`,
      guest.heardFrom && `Nous a connus par : ${guest.heardFrom}`,
      guest.arrivalTime && `Heure d'arrivée : ${guest.arrivalTime}`,
    ].filter(Boolean).join(' · ');

    if (
      !cure ||
      !reservation.fullName ||
      !reservation.email ||
      !reservation.phone ||
      (cmi && !ORDER_ID.test(reservation.orderId))
    ) {
      return NextResponse.json({ success: false, error: 'Missing or invalid fields' }, { status: 400 });
    }

    // Pack (cure + room): the room is entered in SiteMinder by the team, so the note starts with what they need,
    // priced here from SiteMinder rather than taken from the browser
    const notes: string[] = [];
    if (cmi && typeof data.roomRateUuid === 'string') {
      const stay = packStay(data.cure, reservation.arrivalDate, Number(reservation.numberOfPeople));
      const pack = stay && (await packOffers(stay).catch(() => [])).find((o) => o.roomRateUuid === data.roomRateUuid);
      const room = pack
        ? `${pack.room} · ${pack.plan} · du ${stay.checkIn} au ${stay.checkOut} · ${stay.guests} pers. · ${pack.gross} MAD`
        : `chambre ${text(data.roomRateUuid, 60)} (prix non confirmé par SiteMinder)`;
      notes.push(`[Hébergement à saisir dans SiteMinder] ${room}`);
    }
    if (guestNote) {
      notes.push(`[Client] ${guestNote}`);
      Object.assign(reservation, { city: guest.city, postalCode: guest.postalCode, residenceCountry: guest.country, heardFrom: guest.heardFrom, arrivalTime: guest.arrivalTime });
      // For the team's email once CMI confirms the payment
      rememberGuest(reservation.orderId, guest);
    }
    if (notes.length) reservation.message = [...notes, reservation.message].filter(Boolean).join(' | ');

    if (GOOGLE_APPS_SCRIPT_URL) {
      try {
        const sheetsResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reservation),
          redirect: 'follow',
        });
        console.log('Google Sheets response:', await sheetsResponse.text());
      } catch (sheetsError) {
        // The contact still reaches Brevo below
        console.error('Google Sheets error:', sheetsError);
      }
    } else {
      console.warn('GOOGLE_SHEET_EVASION_URL is not set: dc-thermes booking not written to the sheet', reservation.email);
    }

    // Never throws: a Brevo failure must not lose the booking
    await upsertBrevoContact({
      fullName: reservation.fullName,
      email: reservation.email,
      phone: reservation.phone,
      numberOfPeople: reservation.numberOfPeople,
      arrivalDate: reservation.arrivalDate,
      selectedPack: reservation.programme,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('dc-thermes reservation error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
