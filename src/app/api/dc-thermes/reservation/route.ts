import { NextRequest, NextResponse } from 'next/server';
import { upsertBrevoContact } from '@/lib/brevo';

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

// Order IDs built on the reservation page: DCT-VIT3-..., DCT-REG5-ACOMPTE-...
const ORDER_ID = /^DCT-(VIT3|REG5|REN7)-(ACOMPTE-)?[A-Z0-9]{6,24}$/;

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

    if (
      !cure ||
      !reservation.fullName ||
      !reservation.email ||
      !reservation.phone ||
      (cmi && !ORDER_ID.test(reservation.orderId))
    ) {
      return NextResponse.json({ success: false, error: 'Missing or invalid fields' }, { status: 400 });
    }

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
