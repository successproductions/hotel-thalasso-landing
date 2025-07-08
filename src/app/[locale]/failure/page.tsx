import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Paiement refusé',
  robots: { index: false, follow: false },
};

export default function FailurePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold text-red-600">
        Paiement refusé
      </h1>
      <p>
        Votre transaction n’a pas abouti. 
        Veuillez réessayer ou contacter notre service réservation.
      </p>
      <Link href="/" className="underline text-blue-600">
        Retourner à l’offre
      </Link>
    </main>
  );
}
