import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import LegalLayout from './components/LegalLayout';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'fr' ? 'Mentions Légales - Dakhla Club' : 'Legal Information - Dakhla Club',
    description:
      locale === 'fr'
        ? 'Toutes les informations légales de Dakhla Club - CGU, CGV, Politique de confidentialité'
        : 'All legal information for Dakhla Club - Terms of Use, Terms of Sale, Privacy Policy',
  };
}

export default function LegalIndexPage() {
  const t = useTranslations('legal.index');

  return (
    <LegalLayout>
      <div className="mb-12 text-center">
        <h1 className="playfair mb-4 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">{t('subtitle')}</p>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {/* <Link href="/legal/cgu" className="group">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-teal-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors">
              {t('cgu.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('cgu.description')}
            </p>
          </div>
        </Link> */}

        <Link href="/legal/cgv" className="group">
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0v6a2 2 0 11-4 0v-6m6 0a2 2 0 11-4 0"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors group-hover:text-blue-700">
              {t('cgv.title')}
            </h3>
            <p className="text-sm text-gray-600">{t('cgv.description')}</p>
          </div>
        </Link>

        <Link href="/legal/privacy" className="group">
          <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 transition-all duration-300 hover:border-purple-300 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors group-hover:text-purple-700">
              {t('privacy.title')}
            </h3>
            <p className="text-sm text-gray-600">{t('privacy.description')}</p>
          </div>
        </Link>

        <Link href="/legal/cookies" className="group">
          <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6 transition-all duration-300 hover:border-orange-300 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors group-hover:text-orange-700">
              {t('cookies.title')}
            </h3>
            <p className="text-sm text-gray-600">{t('cookies.description')}</p>
          </div>
        </Link>
      </div>
    </LegalLayout>
  );
}
