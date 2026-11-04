import { ConfirmationClient } from '@/dc-thermes/ClientOnly';
import { confirmationMetadata, formViewport } from '../../seo';

// Payment declined or cancelled: /api/payment/success and /api/payment/fail send DC Thermes orders (DCT-…) here
export const viewport = formViewport;

export const metadata = confirmationMetadata(false);

export default function Page() {
  return <ConfirmationClient paid={false} />;
}
