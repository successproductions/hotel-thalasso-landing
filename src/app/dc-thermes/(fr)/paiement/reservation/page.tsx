import { BookingClient } from '@/dc-thermes/ClientOnly';
import { isDcThermesTest } from '@/lib/dcThermesTest';
import { formViewport, reservationMetadata, type LangSearchParams } from '../../../seo';

export const viewport = formViewport;

export function generateMetadata({ searchParams }: { searchParams: LangSearchParams }) {
  return reservationMetadata(searchParams, 'cmi');
}

// TEMPORARY: the 1 MAD test link (?test=<code>) is checked here, on the server (src/lib/dcThermesTest.ts)
export default async function Page({ searchParams }: { searchParams: Promise<{ test?: string }> }) {
  const { test } = await searchParams;
  return <BookingClient funnel="cmi" testCode={isDcThermesTest(test) ? test : undefined} />;
}
