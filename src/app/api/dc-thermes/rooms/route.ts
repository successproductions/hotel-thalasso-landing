import { NextRequest, NextResponse } from 'next/server';
import { packOffers, packStay } from '@/lib/siteminder';

// Rooms available for a DC Thermes pack, live from SiteMinder: /dc-thermes/paiement/reservation with a room.
// GET ?cure=vitalite&arrival=2026-11-15&guests=2 → { checkIn, checkOut, offers: PackOffer[] }
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const stay = packStay(q.get('cure') || '', q.get('arrival') || '', Number(q.get('guests')));
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (!stay || stay.checkIn < tomorrow) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  try {
    const offers = await packOffers(stay);
    return NextResponse.json({ checkIn: stay.checkIn, checkOut: stay.checkOut, offers }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    // The page shows its own message: never the raw SiteMinder error (integration rules)
    console.error('dc-thermes rooms error:', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  }
}
