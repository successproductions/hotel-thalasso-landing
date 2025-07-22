'use client';
import { useTranslations } from 'next-intl';
import LegalLayout from '../components/LegalLayout';

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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">
            {t('section1.title')}
          </h2>
          <p className="text-gray-700">
            {t('section1.content')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">
            {t('section2.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                {t('section2.necessary.title')}
              </h3>
              <p className="text-green-700">
                {t('section2.necessary.content')}
              </p>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                {t('section2.analytics.title')}
              </h3>
              <p className="text-blue-700">
                {t('section2.analytics.content')}
              </p>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
              <h3 className="font-semibold text-purple-800 mb-2">
                {t('section2.functional.title')}
              </h3>
              <p className="text-purple-700">
                {t('section2.functional.content')}
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
              <h3 className="font-semibold text-orange-800 mb-2">
                {t('section2.advertising.title')}
              </h3>
              <p className="text-orange-700">
                {t('section2.advertising.content')}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 playfair">
            {t('section3.title')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('section3.content')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="https://support.google.com/chrome/answer/95647" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="text-sm font-medium text-gray-800">
                {t('section3.browsers.chrome')}
              </div>
            </a>
            
            <a 
              href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="text-sm font-medium text-gray-800">
                {t('section3.browsers.firefox')}
              </div>
            </a>
            
            <a 
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="text-sm font-medium text-gray-800">
                {t('section3.browsers.safari')}
              </div>
            </a>
            
            <a 
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="text-sm font-medium text-gray-800">
                {t('section3.browsers.edge')}
              </div>
            </a>
          </div>
        </section>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-l-4 border-orange-500 mt-8">
          <p className="text-gray-700 text-center">
            Pour toute question concernant notre politique de cookies, contactez-nous à :
            <a href="mailto:reservation@dakhlaclub.com" className="text-orange-600 hover:underline ml-1">
            reservation@dakhlaclub.com
            </a>
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}