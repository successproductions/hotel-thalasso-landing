import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import LegalLayout from '../components/LegalLayout';
import './styles.css';

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
      <div className="mb-16 text-center">
        <h1 className="mb-6 text-[2rem] font-light tracking-tight text-gray-900 md:text-[2.5rem]">
          {t('title')}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-gray-500">{t('lastUpdate')}</p>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        {/* Introduction */}
        <div className="rounded-xl bg-blue-50/50 p-6 border-l-4 border-blue-400">
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('intro')}</p>
        </div>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section1.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section1.content')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section2.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section2.content')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section3.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section3.content')}</p>
        </section>

        {/* Payment Section - Highlighted as required by CMI */}
        <section className="rounded-xl bg-amber-50/50 p-6 border-l-4 border-amber-400">
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section4.title')}
          </h2>
          <p className="mb-4 text-[1rem] leading-relaxed text-gray-700">{t('section4.content1')}</p>
          <p className="mb-4 text-[1rem] leading-relaxed text-gray-700">{t('section4.content2')}</p>
          <p className="mb-4 text-[1rem] leading-relaxed text-gray-700">{t('section4.content3')}</p>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section4.content4')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section5.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section5.content')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section6.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section6.content')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section7.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section7.content')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section8.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section8.content')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section9.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section9.content')}</p>
        </section>

        <section>
          <h2 className="mb-4 text-[1.5rem] font-light text-gray-900">
            {t('section10.title')}
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-700">{t('section10.content')}</p>
        </section>
      </div>
    </LegalLayout>
  );
}
