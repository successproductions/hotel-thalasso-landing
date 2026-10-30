import { GiftClient } from '@/dc-thermes/ClientOnly';
import { formViewport, offrirMetadata, type LangSearchParams } from '../../seo';

export const viewport = formViewport;

export function generateMetadata({ searchParams }: { searchParams: LangSearchParams }) {
  return offrirMetadata(searchParams);
}

export default function Page() {
  return <GiftClient />;
}
