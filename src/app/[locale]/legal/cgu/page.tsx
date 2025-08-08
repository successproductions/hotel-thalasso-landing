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

  const cguMeta = {
    fr: {
      title: "Conditions Générales d'Utilisation - Dakhla Club",
      description:
        "Conditions générales d'utilisation du site Dakhla Club. Règles d'accès, propriété intellectuelle et responsabilités.",
    },
    en: {
      title: 'Terms of Use - Dakhla Club',
      description:
        'Terms of use for Dakhla Club website. Access rules, intellectual property and responsibilities.',
    },
  };

  const currentMeta = cguMeta[locale as 'fr' | 'en'] || cguMeta.fr;
  const currentUrl = `${baseUrl}/${locale}/legal/cgu`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/legal/cgu`,
        'en-US': `${baseUrl}/en/legal/cgu`,
        'x-default': `${baseUrl}/fr/legal/cgu`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CGUPage() {
  const t = useTranslations('legal.cgu');

  return (
    <LegalLayout>
      <div className="mb-12 text-center">
        <h1 className="playfair mb-4 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">{t('lastUpdate')}</p>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-xl border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-blue-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">{t('summary.title')}</h3>
          <p className="text-gray-700">{t('summary.content')}</p>
        </div>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section1.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section1.content1')}</p>
          <p className="text-gray-700">{t('section1.content2')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section2.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section2.content1')}</p>
          <p className="text-gray-700">{t('section2.content2')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section3.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section3.content1')}</p>
          <p className="text-gray-700">{t('section3.content2')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section4.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section4.content1')}</p>
          <p className="text-gray-700">{t('section4.content2')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section5.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section5.content1')}</p>
          <p className="mb-4 text-gray-700">{t('section5.content2')}</p>
          <p className="text-gray-700">{t('section5.content3')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section6.title')}
          </h2>
          <p className="text-gray-700">{t('section6.content')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section7.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section7.content1')}</p>
          <p className="text-gray-700">{t('section7.content2')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section8.title')}
          </h2>
          <p className="mb-4 text-gray-700">{t('section8.content1')}</p>
          <p className="text-gray-700">{t('section8.content2')}</p>
        </section>
      </div>
    </LegalLayout>
  );
}
