import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Home, Mail, Phone } from 'lucide-react';

export default async function MerciPage({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}) {
  const { locale } = await params;

  const content = {
    fr: {
      title: 'Merci pour votre réservation !',
      subtitle: 'Votre demande a été reçue avec succès',
      message: 'Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation.',
      contact: {
        title: 'Besoin d\'aide ?',
        email: 'contact@dakhlaclub.com',
        phone: '+212 528 89 70 00',
      },
      backHome: 'Retour à l\'accueil',
      additionalInfo: 'Vous recevrez un email de confirmation sous peu.',
    },
    en: {
      title: 'Thank you for your reservation!',
      subtitle: 'Your request has been successfully received',
      message: 'Our team will contact you as soon as possible to confirm your reservation.',
      contact: {
        title: 'Need help?',
        email: 'contact@dakhlaclub.com',
        phone: '+212 528 89 70 00',
      },
      backHome: 'Back to home',
      additionalInfo: 'You will receive a confirmation email shortly.',
    },
  };

  const text = content[locale];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5ba6a9]/10 via-white to-[#c4b89a]/10">
      {/* Header with Logo */}
      <header className="py-6 px-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <Link href={`/${locale}`} className="inline-block">
            <Image
              src="/images/LogoDakhla.png"
              alt="Dakhla Club"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white  shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
            {text.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-[#5ba6a9] font-medium mb-6">
            {text.subtitle}
          </p>

          {/* Message */}
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            {text.message}
          </p>

          {/* Decorative Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#5ba6a9] to-[#c4b89a] mx-auto mb-10"></div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {text.contact.title}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`mailto:reservation@dakhlaclub.com`}
                className="flex items-center gap-2 text-[#5ba6a9] hover:text-[#c4b89a] transition-colors"
              >
                <Mail size={20} />
                <span>reservation@dakhlaclub.com</span>
              </a>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <a
                href={`tel:${text.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-[#5ba6a9] hover:text-[#c4b89a] transition-colors"
              >
                <Phone size={20} />
                <span>+212 661-807293</span>
              </a>
            </div>
          </div>

          {/* Back to Home Button */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#5ba6a9] text-white font-medium text-lg rounded-lg hover:bg-[#c4b89a] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            {text.backHome}
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>{text.additionalInfo}</p>
        </div>
      </main>
    </div>
  );
}
