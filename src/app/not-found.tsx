import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const messages = await getMessages({ locale: 'fr' });

  return (
    <NextIntlClientProvider locale="fr" messages={messages}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <h1 className="mb-4 text-6xl font-bold text-gray-300">404</h1>
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">Page non trouvée</h2>
            <p className="text-gray-600">
              La page que vous recherchez n existe pas ou a été déplacée.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/fr/evasion-holistique-3-jours"
              className="inline-block w-full rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition-colors hover:bg-teal-700"
            >
              Retour à l accueil
            </Link>

            <div className="text-sm text-gray-500">
              <p>Ou contactez-nous :</p>
              <a href="tel:+212652881921" className="text-teal-600 hover:underline">
                +212 652-881921
              </a>
            </div>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
