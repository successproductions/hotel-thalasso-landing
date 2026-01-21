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
      title: 'Nous vous remercions pour votre achat.',
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
      <div className="relative min-h-[65vh] w-full overflow-hidden md:min-h-[60vh]">
        <Image
          src="/images/offer-3/dji2.jpg"
          alt="Dakhla Club - Thalasso & Wellness"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
        
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 py-16">
          <div className="mb-4 md:mb-6 rounded-full bg-white/20 p-3 md:p-4 backdrop-blur-sm">
            <CheckCircle2 className="h-12 w-12 text-white md:h-20 md:w-20" />
          </div>
          <h1 className="mb-2 px-1 text-[24px] font-light uppercase tracking-wide md:text-4xl leading-tight">
            {text.title}
          </h1>
          {/* Thank you message banner */}
          <div className="mt-4 md:mt-6 mx-1 bg-white/20 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-sm max-w-2xl">
            <p className="text-white/95 font-extralight text-lg md:text-xl leading-relaxed">
              {locale === 'fr' 
                ? "Merci de vérifier votre mail. Nous serons ravis de vous accueillir bientôt."
                : "Thank you for your purchase. Please check your email. We look forward to welcoming you soon."}
            </p>
            <p className="mt-2 text-[#d6bb8e] font-extralight text-lg md:text-xl">
              {locale === 'fr' ? "Next step : réserver l'hôtel" : "Next step: book the hotel"}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 py-4 md:py-5">
        {/* Message */}
        <p className="mb-4 md:mb-8 text-center font-extralight text-lg text-gray-700 md:text-xl">{text.message}</p>

        {/* Email confirmation notice */}
        <div className="mb-6 flex items-center justify-center gap-3 bg-[#139584]/10 p-4">
          <Mail className="h-5 w-5 text-[#139584]" />
          <p className="text-[#139584] font-extralight text-lg">{text.emailSent}</p>
        </div>

        {/* Hotel Booking Section */}
        <div className="mb-5 md:mb-12 bg-[#faf9f5] py-12 -mx-4 px-0.5 md:-mx-0 md:px-8 text-center">
          <h2 className="mb-4 text-2xl font-light uppercase text-gray-800 md:text-3xl">
            {locale === 'fr' ? "Réservez votre hébergement" : "Book your accommodation"}
          </h2>
          <p className="mb-8 text-gray-600 font-extralight max-w-xl mx-auto">
            {locale === 'fr' 
              ? "Complétez votre expérience en réservant votre chambre au Dakhla Club."
              : "Complete your experience by booking your room at Dakhla Club."}
          </p>
          <a
            href="https://direct-book.com/properties/DakhlaClubDIRECT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#139584] px-10 py-4 text-lg text-white font-medium transition-all hover:bg-[#0f7a6d] hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            {locale === 'fr' ? "Réserver l'hôtel" : "Book the hotel"}
          </a>
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
              <span className="text-lg font-extralight">{text.phone}</span>
            </a>
            <a
              href={`mailto:${text.email}`}
              className="flex items-center gap-3 text-gray-700 transition hover:text-[#139584]"
            >
              <Mail className="h-5 w-5" />
              <span className="text-lg font-extralight">{text.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 font-extralight py-8 text-center text-sm text-gray-500">
        <p>© 2026 Dakhla Club - DC Thermes | Séjours Thalasso & Bien-Être Premium</p>
      </footer>
    </main>
  );
}
