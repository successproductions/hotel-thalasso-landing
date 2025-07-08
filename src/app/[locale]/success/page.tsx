import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Paiement réussi',
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold text-green-600">
        Paiement accepté 🎉
      </h1>
      <p>Merci ! Votre réservation est confirmée. Un e-mail récapitulatif vient de vous être envoyé.</p>
      <Link href="/" className="underline text-blue-600">
        Retour à l’accueil
      </Link>
    </main>
  );
}
