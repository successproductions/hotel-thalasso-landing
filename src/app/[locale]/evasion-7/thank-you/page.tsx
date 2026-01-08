import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { CheckCircle2, Mail, Phone, Home } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    fr: {
      title: 'Merci pour votre réservation - Dakhla Club',
      description: 'Votre demande de réservation a été reçue. Notre équipe vous contactera bientôt.',
    },
    en: {
      title: 'Thank you for your reservation - Dakhla Club',
      description: 'Your reservation request has been received. Our team will contact you soon.',
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

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}) {
  const { locale } = await params;

  const content = {
    fr: {
      title: 'Merci pour votre réservation !',
      subtitle: 'Votre demande a été envoyée avec succès',
      message:
        'Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation et finaliser les détails de votre séjour.',
      emailSent: 'Un email de confirmation vous a été envoyé.',
      contactInfo: 'Informations de contact',
      phone: '+212 652 88 19 21',
      email: 'reservation@dakhlaclub.com',
      backHome: "Retour à l'accueil",
      whatNext: 'Et maintenant ?',
      step1: 'Consultez votre email de confirmation',
      step2: 'Notre équipe vous contactera sous 24h',
      step3: 'Préparez-vous pour une expérience inoubliable',
    },
    en: {
      title: 'Thank you for your reservation!',
      subtitle: 'Your request has been sent successfully',
      message:
        'Our team will contact you as soon as possible to confirm your reservation and finalize the details of your stay.',
      emailSent: 'A confirmation email has been sent to you.',
      contactInfo: 'Contact Information',
      phone: '+212 652 88 19 21',
      email: 'reservation@dakhlaclub.com',
      backHome: 'Back to home',
      whatNext: "What's next?",
      step1: 'Check your confirmation email',
      step2: 'Our team will contact you within 24h',
      step3: 'Get ready for an unforgettable experience',
    },
  };

  const text = content[locale];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle2 className="h-16 w-16 text-green-600 md:h-20 md:w-20" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-center font-serif text-3xl font-medium text-gray-800 md:text-5xl">
          {text.title}
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-center text-lg text-gray-600 md:text-xl">{text.subtitle}</p>

        {/* Main Card */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-xl md:p-10">
          {/* Message */}
          <p className="mb-6 text-center text-gray-700 md:text-lg">{text.message}</p>

          {/* Email confirmation notice */}
          <div className="mb-8 flex items-center justify-center gap-3 rounded-lg bg-blue-50 p-4">
            <Mail className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-blue-800 md:text-base">{text.emailSent}</p>
          </div>

          {/* What's Next Section */}
          <div className="mb-8">
            <h2 className="mb-6 text-center text-2xl font-medium text-gray-800">
              {text.whatNext}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border-2 border-teal-200 bg-teal-50 p-4 text-center">
                <div className="mb-2 text-3xl font-medium text-teal-600">1</div>
                <p className="text-sm text-gray-700">{text.step1}</p>
              </div>
              <div className="rounded-lg border-2 border-teal-200 bg-teal-50 p-4 text-center">
                <div className="mb-2 text-3xl font-medium text-teal-600">2</div>
                <p className="text-sm text-gray-700">{text.step2}</p>
              </div>
              <div className="rounded-lg border-2 border-teal-200 bg-teal-50 p-4 text-center">
                <div className="mb-2 text-3xl font-medium text-teal-600">3</div>
                <p className="text-sm text-gray-700">{text.step3}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-center text-xl font-medium text-gray-800">
              {text.contactInfo}
            </h3>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
              <a
                href={`tel:${text.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-gray-700 transition hover:text-teal-600"
              >
                <Phone className="h-5 w-5" />
                <span>{text.phone}</span>
              </a>
              <a
                href={`mailto:${text.email}`}
                className="flex items-center gap-2 text-gray-700 transition hover:text-teal-600"
              >
                <Mail className="h-5 w-5" />
                <span>{text.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#139584] px-8 py-3 text-white transition hover:bg-[#0d9488] hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            {text.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
