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

  const privacyMeta = {
    fr: {
      title: 'Politique de Confidentialité - Dakhla Club',
      description:
        'Politique de protection des données personnelles de Dakhla Club. Collecte, traitement et protection de vos informations.',
    },
    en: {
      title: 'Privacy Policy - Dakhla Club',
      description:
        'Dakhla Club personal data protection policy. Collection, processing and protection of your information.',
    },
  };

  const currentMeta = privacyMeta[locale as 'fr' | 'en'] || privacyMeta.fr;
  const currentUrl = `${baseUrl}/${locale}/legal/privacy`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/legal/privacy`,
        'en-US': `${baseUrl}/en/legal/privacy`,
        'x-default': `${baseUrl}/fr/legal/privacy`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PrivacyPage() {
  const t = useTranslations('legal.privacy');

  return (
    <LegalLayout>
      <div className="mb-12 text-center">
        <h1 className="playfair mb-4 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">{t('effectiveDate')}</p>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <p className="text-gray-700">{t('intro')}</p>
        </div>

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
          <p className="mb-4 text-gray-700">{t('section2.content')}</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
            <li>{t('section2.list1')}</li>
            <li>{t('section2.list2')}</li>
            <li>{t('section2.list3')}</li>
            <li>{t('section2.list4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section3.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section3.content')}</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
            <li>{t('section3.list1')}</li>
            <li>{t('section3.list2')}</li>
            <li>{t('section3.list3')}</li>
            <li>{t('section3.list4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section4.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section4.content')}</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
            <li>{t('section4.list1')}</li>
            <li>{t('section4.list2')}</li>
            <li>{t('section4.list3')}</li>
          </ul>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section5.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section5.content')}</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
            <li>{t('section5.list1')}</li>
            <li>{t('section5.list2')}</li>
          </ul>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section6.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section6.content')}</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
            <li>{t('section6.list1')}</li>
            <li>{t('section6.list2')}</li>
          </ul>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section7.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section7.content')}</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
            <li>{t('section7.list1')}</li>
            <li>{t('section7.list2')}</li>
          </ul>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section8.title')}
          </h2>
          <p className="text-gray-700">{t('section8.content')}</p>
        </section>
      </div>
    </LegalLayout>
  );
}
