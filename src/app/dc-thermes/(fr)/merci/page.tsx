import { ConfirmationClient } from '@/dc-thermes/ClientOnly';
import { confirmationMetadata, formViewport } from '../../seo';

// Payment confirmed: /api/payment/success sends DC Thermes orders (DCT-…) here
export const viewport = formViewport;

export const metadata = confirmationMetadata(true);

export default function Page() {
  return <ConfirmationClient paid={true} />;
}
