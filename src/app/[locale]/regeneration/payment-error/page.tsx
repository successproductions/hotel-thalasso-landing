import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { XCircle, AlertTriangle, Phone, Mail, RefreshCw } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'en' || rawLocale === 'fr') ? rawLocale : 'fr';
  return {
    title: locale === 'fr' ? 'Paiement Échoué - Dakhla Club' : 'Payment Failed - Dakhla Club',
    description: locale === 'fr' ? 'Une erreur est survenue lors du traitement de votre paiement.' : 'An error occurred while processing your payment.',
    robots: { index: false, follow: false },
  };
}

export default async function RegenerationPaymentErrorPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ order?: string; code?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'en' || rawLocale === 'fr') ? rawLocale : 'fr';
  const { order: orderId, code: errorCode } = await searchParams;

  const content = {
    fr: {
      title: 'Paiement Échoué',
      subtitle: 'Le paiement n\'a pas pu être traité',
      message: 'Nous sommes désolés, mais votre paiement n\'a pas abouti. Veuillez réessayer ou nous contacter pour obtenir de l\'aide.',
      orderRef: 'Référence commande',
      errorCode: 'Code erreur',
      paymentStatus: 'Statut du paiement',
      statusFailed: 'Échoué',
      possibleReasons: 'Raisons Possibles',
      reason1: 'Informations de carte incorrectes ou incomplètes',
      reason2: 'Fonds insuffisants',
      reason3: 'Problème de connexion',
      reason4: 'Carte expirée ou bloquée',
      whatToDo: 'Que Faire ?',
      action1: 'Vérifier vos informations de paiement',
      action1Desc: 'Assurez-vous que toutes les informations sont correctes',
      action2: 'Réessayer le paiement',
      action2Desc: 'Cliquez sur le bouton ci-dessous pour réessayer',
      action3: 'Nous contacter',
      action3Desc: 'Notre équipe est là pour vous aider',
      retryButton: 'Réessayer le Paiement',
      contactInfo: 'Informations de Contact',
      phone: '+212 652 88 19 21',
      email: 'reservation@dakhlaclub.com',
      backHome: 'Retour à l\'accueil',
    },
    en: {
      title: 'Payment Failed',
      subtitle: 'The payment could not be processed',
      message: 'We apologize, but your payment was not successful. Please try again or contact us for assistance.',
      orderRef: 'Order reference',
      errorCode: 'Error code',
      paymentStatus: 'Payment status',
      statusFailed: 'Failed',
      possibleReasons: 'Possible Reasons',
      reason1: 'Incorrect or incomplete card information',
      reason2: 'Insufficient funds',
      reason3: 'Connection problem',
      reason4: 'Expired or blocked card',
      whatToDo: 'What to Do?',
      action1: 'Check your payment information',
      action1Desc: 'Make sure all information is correct',
      action2: 'Retry payment',
      action2Desc: 'Click the button below to try again',
      action3: 'Contact us',
      action3Desc: 'Our team is here to help',
      retryButton: 'Retry Payment',
      contactInfo: 'Contact Information',
      phone: '+212 652 88 19 21',
      email: 'reservation@dakhlaclub.com',
      backHome: 'Back to home',
    },
  };

  const text = content[locale];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <XCircle className="h-16 w-16 text-red-600 md:h-20 md:w-20" />
          </div>
        </div>
        <h1 className="mb-4 text-center font-serif text-3xl font-medium text-gray-800 md:text-5xl">{text.title}</h1>
        <p className="mb-8 text-center text-lg text-red-600 md:text-xl">{text.subtitle}</p>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-xl md:p-10">
          <div className="mb-8 flex items-start gap-3 rounded-lg bg-red-50 p-4">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
            <p className="text-sm text-red-800 md:text-base">{text.message}</p>
          </div>

          <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-gray-700">{text.paymentStatus}</h2>
            <div className="space-y-3">
              {orderId && (
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-500">{text.orderRef}</span>
                  <span className="font-mono text-sm font-medium text-gray-800">{orderId}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-sm text-gray-500">{text.paymentStatus}</span>
                <span className="font-medium text-red-600">{text.statusFailed}</span>
              </div>
              {errorCode && errorCode !== 'unknown' && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{text.errorCode}</span>
                  <span className="font-mono text-sm text-gray-700">{errorCode}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-medium text-gray-800">{text.possibleReasons}</h2>
            <ul className="space-y-2">
              {[text.reason1, text.reason2, text.reason3, text.reason4].map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="mb-6 text-center text-2xl font-medium text-gray-800">{text.whatToDo}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { num: 1, title: text.action1, desc: text.action1Desc },
                { num: 2, title: text.action2, desc: text.action2Desc },
                { num: 3, title: text.action3, desc: text.action3Desc },
              ].map(({ num, title, desc }) => (
                <div key={num} className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                  <div className="mb-2 text-3xl font-medium text-gray-700">{num}</div>
                  <h3 className="mb-2 font-medium text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 flex justify-center">
            <a
              href={`/${locale}/regeneration`}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition hover:bg-teal-700 hover:shadow-xl"
            >
              <RefreshCw className="h-5 w-5" />
              {text.retryButton}
            </a>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-center text-xl font-medium text-gray-800">{text.contactInfo}</h3>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
              <a href={`tel:${text.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-gray-700 transition hover:text-teal-600">
                <Phone className="h-5 w-5" />
                <span>{text.phone}</span>
              </a>
              <a href={`mailto:${text.email}`} className="flex items-center gap-2 text-gray-700 transition hover:text-teal-600">
                <Mail className="h-5 w-5" />
                <span>{text.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border-2 border-gray-400 bg-white px-8 py-3 text-gray-700 transition hover:bg-gray-50">
            {text.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
