/**
 * Direct booking engine for the Halloween offer.
 *
 * The page no longer collects reservations itself: every CTA hands the visitor
 * straight to the engine, with the stay dates and occupancy pre-filled. Kept in
 * one place so the dates can be changed for the next campaign without hunting
 * through five components.
 */
export const HALLOWEEN_BOOKING_URL =
  'https://direct-book.com/properties/DakhlaClubDIRECT?locale=fr&items[0][adults]=1&items[0][children]=0&items[0][infants]=0&currency=EUR&checkInDate=2026-10-29&checkOutDate=2026-10-31&trackPage=yes';

/** Opens the booking engine in a new tab, keeping the landing page behind. */
export function openHalloweenBooking(): void {
  window.open(HALLOWEEN_BOOKING_URL, '_blank', 'noopener,noreferrer');
}
