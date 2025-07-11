import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const messages = await getMessages({ locale: 'fr' });

  return (
    <NextIntlClientProvider locale="fr" messages={messages}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Page non trouvée
            </h2>
            <p className="text-gray-600">
              La page que vous recherchez n existe pas ou a été déplacée.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/fr/evasion-holistique-3-jours"
              className="inline-block w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Retour à l accueil
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>Ou contactez-nous :</p>
              <a 
                href="tel:+212652881921" 
                className="text-teal-600 hover:underline"
              >
                +212 652-881921
              </a>
            </div>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}