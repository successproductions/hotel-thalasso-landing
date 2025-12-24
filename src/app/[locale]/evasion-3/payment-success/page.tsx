import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { CheckCircle2, Mail, ExternalLink, ArrowRight, Calendar, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import '../styles.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    fr: {
      title: 'Paiement Réussi - Confirmation SPA - Dakhla Club',
      description: 'Votre paiement a été effectué avec succès. Vous allez recevoir un email de confirmation.',
    },
    en: {
      title: 'Payment Successful - SPA Confirmation - Dakhla Club',
      description: 'Your payment has been processed successfully. You will receive a confirmation email.',
    },
  };

  const currentMeta = metadata[locale];

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}) {
  const { locale } = await params;

  const content = {
    fr: {
      title: 'Réservation Confirmée',
      subtitle: 'Merci pour votre confiance',
      emailTitle: 'Confirmation envoyée',
      emailDesc: 'Vous recevrez un email avec tous les détails de votre réservation spa',
      nextStepTitle: 'Prochaine étape',
      lastStep: 'Réservez votre hébergement',
      lastStepDesc: 'Complétez votre expérience en réservant votre bungalow au Dakhla Club',
      bookButton: 'Réserver maintenant',
      helpTitle: 'Besoin d\'aide ?',
      helpDesc: 'Notre équipe est à votre disposition',
      backHome: "Retour à l'accueil",
    },
    en: {
      title: 'Reservation Confirmed',
      subtitle: 'Thank you for your trust',
      emailTitle: 'Confirmation sent',
      emailDesc: 'You will receive an email with all your reservation details',
      nextStepTitle: 'Next step',
      lastStep: 'Book your accommodation',
      lastStepDesc: 'Complete your experience by booking your bungalow at Dakhla Club',
      bookButton: 'Book now',
      helpTitle: 'Need help?',
      helpDesc: 'Our team is at your disposal',
      backHome: 'Back to home',
    },
  };

  const text = content[locale];
  const bookingUrl = 'https://direct-book.com/properties/DakhlaClubDIRECT';

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl  md:px-6 py-16">
        {/* Success Section */}
        <div className="mb-6 text-center">
          {/* Success Icon */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-50 p-8">
              <CheckCircle2 className="h-24 w-24 text-green-600" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl text-3xl font-normal text-gray-900 md:text-4xl">
            {text.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-500">{text.subtitle}</p>
        </div>

        {/* Main Content Grid */}
        <div className="mb-6 grid gap-8 md:grid-cols-2 px-4">
          {/* Left Card - Email Confirmation */}
          <div className="rounded-none border-l-4 border-teal-600 bg-gray-50 p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-teal-100 p-2">
                <Mail className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-900">{text.emailTitle}</h2>
            </div>
            <p className="text-gray-600">{text.emailDesc}</p>
          </div>

          {/* Right Card - Contact */}
          <div className="rounded-none border-l-4 border-gray-300 bg-gray-50 p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-gray-200 p-2">
                <Phone className="h-5 w-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-medium text-gray-900">{text.helpTitle}</h2>
            </div>
            <p className="mb-3 text-gray-600">{text.helpDesc}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>+212 652-881921</p>
              <p>reservation@dakhlaclub.com</p>
            </div>
          </div>
        </div>

        {/* Next Step - Large Image Section */}
        <div className="mb-6">
          <div className="mb-6 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-teal-600">
              {text.nextStepTitle}
            </p>
            <h2 className="text-2xl md:text-3xl font-normal text-gray-900">{text.lastStep}</h2>
          </div>

          {/* Large Image with Overlay */}
          <div className="group relative h-96 overflow-hidden">
            <Image
              src="/images/0070.png"
              alt="Dakhla Club Accommodation"
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {/* Overlay with CTA */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="mb-6 max-w-2xl text-lg font-light">
                  {text.lastStepDesc}
                </p>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition hover:bg-white hover:text-gray-900"
                >
                  {text.bookButton}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Three Images */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <div className="group relative h-64 overflow-hidden">
            <Image
              src="/images/Piscine_thermale.png"
              alt="Thermal Pool"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0"></div>
          </div>
          <div className="group relative h-64 overflow-hidden">
            <Image
              src="/images/offer-3/dji7.jpg"
              alt="Hydro Bath"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0"></div>
          </div>
          <div className="group relative h-64 overflow-hidden">
            <Image
              src="/images/Salle-de-massage.png"
              alt="Massage Room"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0"></div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            {text.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
