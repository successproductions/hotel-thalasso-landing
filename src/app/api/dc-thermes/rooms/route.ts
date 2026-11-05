import { NextRequest, NextResponse } from 'next/server';
import { hotelStay, roomOffers } from '@/lib/siteminder';

// Hotel rooms available for the stay chosen on /dc-thermes/paiement/reservation, live from SiteMinder.
// GET ?cure=vitalite&arrival=2026-11-15&departure=2026-11-19&participants=2 → { checkIn, checkOut, nights, offers: RoomOffer[] }
// The departure must leave at least the cure's minimum nights (4, 6 or 8); 1 to 4 people in the room.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const stay = hotelStay(q.get('cure') || '', q.get('arrival') || '', q.get('departure') || '', Number(q.get('participants')));
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (!stay || stay.checkIn < tomorrow) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  try {
    const offers = await roomOffers(stay);
    return NextResponse.json({ checkIn: stay.checkIn, checkOut: stay.checkOut, nights: stay.nights, offers }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    // The page shows its own message: never the raw SiteMinder error (integration rules)
    console.error('dc-thermes rooms error:', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  }
}
