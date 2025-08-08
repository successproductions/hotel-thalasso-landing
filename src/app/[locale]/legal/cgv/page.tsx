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

  const cgvMeta = {
    fr: {
      title: 'Conditions Générales de Vente - Dakhla Club',
      description:
        'Conditions générales de vente pour les séjours wellness et thalasso au Dakhla Club. Modalités de réservation, annulation et remboursement.',
    },
    en: {
      title: 'Terms and Conditions of Sale - Dakhla Club',
      description:
        'General terms and conditions of sale for wellness and thalasso stays at Dakhla Club. Booking, cancellation and refund procedures.',
    },
  };

  const currentMeta = cgvMeta[locale as 'fr' | 'en'] || cgvMeta.fr;
  const currentUrl = `${baseUrl}/${locale}/legal/cgv`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/legal/cgv`,
        'en-US': `${baseUrl}/en/legal/cgv`,
        'x-default': `${baseUrl}/fr/legal/cgv`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CGVPage() {
  const t = useTranslations('legal.cgv');

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
          <p className="text-gray-700">{t('section2.content')}</p>
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
          <p className="text-gray-700">{t('section4.content')}</p>
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
          <p className="text-gray-700">{t('section8.content')}</p>
        </section>

        <section>
          <h2 className="playfair mb-4 text-2xl font-semibold text-gray-800">
            {t('section9.title')}
          </h2>
          <p className="text-gray-700">{t('section9.content')}</p>
        </section>
      </div>
    </LegalLayout>
  );
}
