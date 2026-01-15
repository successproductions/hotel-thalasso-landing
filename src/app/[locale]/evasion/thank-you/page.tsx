import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { CheckCircle2, Mail, Phone, Home } from 'lucide-react';
import '../styles.css';

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
    <main className="min-h-screen bg-white">
      {/* Hero Banner Image */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
        <Image
          src="/images/offer-3/dji2.jpg"
          alt="Dakhla Club - Thalasso & Wellness"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        
        {/* Logo */}
        <div className="absolute left-6 top-6 z-10 md:left-10 md:top-10">
          <Link href="/">
            <Image
              src="/images/LogoDakhla.png"
              alt="Dakhla Club"
              width={100}
              height={50}
              className="object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* Success message on banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <div className="mb-6 rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <CheckCircle2 className="h-16 w-16 text-white md:h-20 md:w-20" />
          </div>
          <h1 className="mb-2 px-4 text-3xl font-light tracking-wide md:text-5xl">
            {text.title}
          </h1>
          <p className="text-lg text-white/90 md:text-xl">{text.subtitle}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 py-6 md:py-5">
        {/* Message */}
        <p className="mb-8 text-center text-lg text-gray-700 md:text-xl">{text.message}</p>

        {/* Email confirmation notice */}
        <div className="mb-10 flex items-center justify-center gap-3 bg-[#139584]/10 p-4">
          <Mail className="h-5 w-5 text-[#139584]" />
          <p className="text-[#139584] md:text-lg">{text.emailSent}</p>
        </div>

        {/* What's Next Section */}
        <div className="mb-12 bg-[#faf9f5] py-12 -mx-4 px-4 md:-mx-0 md:px-8">
          <h2 className="mb-10 text-center text-2xl font-light text-gray-800 md:text-3xl">
            {text.whatNext}
          </h2>
          
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-[#139584] text-white">
                <Mail className="h-7 w-7" />
              </div>
              <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-[#d6bb8e]">Étape 1</span>
              <p className="text-gray-700">{text.step1}</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-[#139584] text-white">
                <Phone className="h-7 w-7" />
              </div>
              <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-[#d6bb8e]">Étape 2</span>
              <p className="text-gray-700">{text.step2}</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-[#139584] text-white">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-[#d6bb8e]">Étape 3</span>
              <p className="text-gray-700">{text.step3}</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-12 rounded-lg bg-gray-50 p-8">
          <h3 className="mb-6 text-center text-xl font-light text-gray-800">
            {text.contactInfo}
          </h3>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-10">
            <a
              href={`tel:${text.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-gray-700 transition hover:text-[#139584]"
            >
              <Phone className="h-5 w-5" />
              <span className="text-lg">{text.phone}</span>
            </a>
            <a
              href={`mailto:${text.email}`}
              className="flex items-center gap-3 text-gray-700 transition hover:text-[#139584]"
            >
              <Mail className="h-5 w-5" />
              <span className="text-lg">{text.email}</span>
            </a>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-[#d6bb8e] px-8 py-3 text-white transition-all hover:bg-[#139584]"
          >
            <Home className="h-5 w-5" />
            {text.backHome}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>© 2026 Dakhla Club - DC Thermes | Séjours Thalasso & Bien-Être Premium</p>
      </footer>
    </main>
  );
}
