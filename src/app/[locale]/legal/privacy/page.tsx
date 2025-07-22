'use client';
import { useTranslations } from 'next-intl';
import LegalLayout from '../components/LegalLayout';

export default function PrivacyPage() {
  const t = useTranslations('legal.privacy');
  
  return (
    <LegalLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 playfair">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('effectiveDate')}
        </p>
        <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-24 mx-auto mt-6"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
          <p className="text-gray-700">{t('intro')}</p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section1.title')}</h2>
          <p className="text-gray-700">{t('section1.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section2.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section2.content')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>{t('section2.list1')}</li>
            <li>{t('section2.list2')}</li>
            <li>{t('section2.list3')}</li>
            <li>{t('section2.list4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section3.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section3.content')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>{t('section3.list1')}</li>
            <li>{t('section3.list2')}</li>
            <li>{t('section3.list3')}</li>
            <li>{t('section3.list4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section4.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section4.content')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>{t('section4.list1')}</li>
            <li>{t('section4.list2')}</li>
            <li>{t('section4.list3')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section5.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section5.content')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>{t('section5.list1')}</li>
            <li>{t('section5.list2')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section6.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section6.content')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>{t('section6.list1')}</li>
            <li>{t('section6.list2')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section7.title')}</h2>
          <p className="text-gray-700 mb-4">{t('section7.content')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>{t('section7.list1')}</li>
            <li>{t('section7.list2')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">{t('section8.title')}</h2>
          <p className="text-gray-700">{t('section8.content')}</p>
        </section>
      </div>
    </LegalLayout>
  );
}