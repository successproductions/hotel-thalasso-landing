import { BookingClient } from '@/dc-thermes/ClientOnly';
import { formViewport, reservationMetadata, type LangSearchParams } from '../../../seo';

export const viewport = formViewport;

export function generateMetadata({ searchParams }: { searchParams: LangSearchParams }) {
  return reservationMetadata(searchParams, 'lead');
}

export default function Page() {
  return <BookingClient funnel="lead" />;
}
