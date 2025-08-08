import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import LegalLayout from '../components/LegalLayout';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';

  const cookiesMeta = {
    fr: {
      title: 'Politique des Cookies - Dakhla Club',
      description:
        'Politique de gestion des cookies sur le site Dakhla Club. Types de cookies utilisés et gestion de vos préférences.',
    },
    en: {
      title: 'Cookie Policy - Dakhla Club',
      description:
        'Cookie management policy on Dakhla Club website. Types of cookies used and managing your preferences.',
    },
  };

  const currentMeta = cookiesMeta[locale as 'fr' | 'en'] || cookiesMeta.fr;
  const currentUrl = `${baseUrl}/${locale}/legal/cookies`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/legal/cookies`,
        'en-US': `${baseUrl}/en/legal/cookies`,
        'x-default': `${baseUrl}/fr/legal/cookies`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CookiesPage() {
  const t = useTranslations('legal.cookies');

  return (
    <LegalLayout>
      <div className="mb-12 text-center">
        <h1 className="playfair mb-4 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">{t('lastUpdate')}</p>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section1.title')}
          </h2>
          <p className="text-gray-700">{t('section1.content')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section2.title')}
          </h2>

          <div className="space-y-6">
            <div className="rounded-r-lg border-l-4 border-green-500 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-800">{t('section2.necessary.title')}</h3>
              <p className="text-green-700">{t('section2.necessary.content')}</p>
            </div>

            <div className="rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-4">
              <h3 className="mb-2 font-semibold text-blue-800">{t('section2.analytics.title')}</h3>
              <p className="text-blue-700">{t('section2.analytics.content')}</p>
            </div>

            <div className="rounded-r-lg border-l-4 border-purple-500 bg-purple-50 p-4">
              <h3 className="mb-2 font-semibold text-purple-800">
                {t('section2.functional.title')}
              </h3>
              <p className="text-purple-700">{t('section2.functional.content')}</p>
            </div>

            <div className="rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-4">
              <h3 className="mb-2 font-semibold text-orange-800">
                {t('section2.advertising.title')}
              </h3>
              <p className="text-orange-700">{t('section2.advertising.content')}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section3.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section3.content')}</p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-50 p-3 text-center transition-colors hover:bg-gray-100"
            >
              <div className="text-sm font-medium text-gray-800">
                {t('section3.browsers.chrome')}
              </div>
            </a>

            <a
              href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-50 p-3 text-center transition-colors hover:bg-gray-100"
            >
              <div className="text-sm font-medium text-gray-800">
                {t('section3.browsers.firefox')}
              </div>
            </a>

            <a
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-50 p-3 text-center transition-colors hover:bg-gray-100"
            >
              <div className="text-sm font-medium text-gray-800">
                {t('section3.browsers.safari')}
              </div>
            </a>

            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-50 p-3 text-center transition-colors hover:bg-gray-100"
            >
              <div className="text-sm font-medium text-gray-800">{t('section3.browsers.edge')}</div>
            </a>
          </div>
        </section>

        <div className="mt-8 rounded-xl border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 p-6">
          <p className="text-center text-gray-700">
            Pour toute question concernant notre politique de cookies, contactez-nous à :
            <a
              href="mailto:reservation@dakhlaclub.com"
              className="ml-1 text-orange-600 hover:underline"
            >
              reservation@dakhlaclub.com
            </a>
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
