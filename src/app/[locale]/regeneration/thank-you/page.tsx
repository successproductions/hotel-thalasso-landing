import { Suspense } from 'react';
import ThankYouContent from '../../evasion/thank-you/ThankYouContent';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === 'en' ? 'en' : 'fr';
  return {
    title: locale === 'fr' ? 'Merci pour votre réservation - Dakhla Club' : 'Thank you for your reservation - Dakhla Club',
    description: locale === 'fr' ? 'Votre réservation Thalasso Régénération a été confirmée.' : 'Your Thalasso Regeneration reservation has been confirmed.',
    robots: { index: false, follow: false },
  };
}

export default async function RegenerationThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ThankYouContent params={resolvedParams} />
    </Suspense>
  );
}
