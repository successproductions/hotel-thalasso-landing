import { Suspense } from 'react';
import ThankYouContent from './ThankYouContent';

export default async function ThankYouPage({
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
