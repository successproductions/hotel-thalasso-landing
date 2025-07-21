import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import LegalLayout from '../components/LegalLayout';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'fr' ? 'Politique de Cookies - Dakhla Club' : 'Cookie Policy - Dakhla Club',
    description: locale === 'fr' 
      ? 'Politique de cookies du site Dakhla Club - Gestion des cookies'
      : 'Cookie policy for Dakhla Club website - Cookie management',
  };
}

export default function CookiesPage() {
  const t = useTranslations('legal.cookies');
  
  return (
    <LegalLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 playfair">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('lastUpdate')}
        </p>
        <div className="bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-24 mx-auto mt-6"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section1.title')}</h2>
          <p className="text-gray-700">{t('section1.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section2.title')}</h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('section2.necessary.title')}</h3>
              <p className="text-gray-700">{t('section2.necessary.content')}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('section2.analytics.title')}</h3>
              <p className="text-gray-700">{t('section2.analytics.content')}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('section2.functional.title')}</h3>
              <p className="text-gray-700">{t('section2.functional.content')}</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('section2.advertising.title')}</h3>
              <p className="text-gray-700">{t('section2.advertising.content')}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section3.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section3.content')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li><a href="#" className="text-teal-600 hover:underline">{t('section3.browsers.chrome')}</a></li>
            <li><a href="#" className="text-teal-600 hover:underline">{t('section3.browsers.firefox')}</a></li>
            <li><a href="#" className="text-teal-600 hover:underline">{t('section3.browsers.safari')}</a></li>
            <li><a href="#" className="text-teal-600 hover:underline">{t('section3.browsers.edge')}</a></li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  );
}