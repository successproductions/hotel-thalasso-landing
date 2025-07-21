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
    title: locale === 'fr' ? 'Conditions Générales d\'Utilisation - Dakhla Club' : 'Terms of Use - Dakhla Club',
    description: locale === 'fr' 
      ? 'Conditions générales d\'utilisation du site Dakhla Club - Spa & Thalassothérapie'
      : 'Terms of use for Dakhla Club website - Spa & Thalassotherapy',
  };
}

export default function CGUPage() {
  const t = useTranslations('legal.cgu');
  
  return (
    <LegalLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 playfair">
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('lastUpdate')}
        </p>
        <div className="bg-gradient-to-r from-transparent via-teal-500 to-transparent h-px w-24 mx-auto mt-6"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border-l-4 border-teal-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('summary.title')}</h3>
          <p className="text-gray-700">
            {t('summary.content')}
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section1.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section1.content1')}</p>
          <p className="text-gray-700">{t('section1.content2')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section2.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section2.content1')}</p>
          <p className="text-gray-700">{t('section2.content2')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section3.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section3.content1')}</p>
          <p className="text-gray-700">{t('section3.content2')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section4.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section4.content1')}</p>
          <p className="text-gray-700">{t('section4.content2')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section5.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section5.content1')}</p>
          <p className="text-gray-700 mb-4">{t('section5.content2')}</p>
          <p className="text-gray-700">{t('section5.content3')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section6.title')}</h2>
          <p className="text-gray-700">{t('section6.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section7.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section7.content1')}</p>
          <p className="text-gray-700">{t('section7.content2')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section8.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section8.content1')}</p>
          <p className="text-gray-700">{t('section8.content2')}</p>
        </section>
      </div>
    </LegalLayout>
  );
}