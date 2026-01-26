'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, Home } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import '../styles.css';

export default function ThankYouContent({
  params,
}: {
  params: { locale: string };
}) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const [dataProcessed, setDataProcessed] = useState(false);
  
  const locale = (params.locale === 'en' || params.locale === 'fr') ? params.locale : 'fr';

  // Process reservation data when page loads
  useEffect(() => {
    const processReservation = async () => {
      if (dataProcessed || !orderId) return;

      try {
        // Get booking info from sessionStorage
        const bookingInfoStr = sessionStorage.getItem('bookingInfo');
        if (!bookingInfoStr) {
          console.warn('No booking info found in sessionStorage');
          return;
        }

        const bookingInfo = JSON.parse(bookingInfoStr);

        // Send to backend to save in Google Sheets and send email
        const response = await fetch('/api/reservations/evasion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...bookingInfo,
            orderId: orderId,
          }),
        });

        if (response.ok) {
          console.log('Reservation processed successfully');
          // Clear sessionStorage after successful processing
          sessionStorage.removeItem('bookingInfo');
        } else {
          console.error('Failed to process reservation');
        }
      } catch (error) {
        console.error('Error processing reservation:', error);
      } finally {
        setDataProcessed(true);
      }
    };

    processReservation();
  }, [orderId, dataProcessed]);

  const content = {
    fr: {
      title: 'Nous vous remercions pour votre achat.',
      subtitle: 'Votre demande a été envoyée avec succès',
      message:
        'Merci pour votre confiance votre séjour Thalasso a bien été payé et enregistré.',
      message2: ' Notre équipe vous contactera très prochainement afin de préparer votre arrivée et personnaliser votre expérience',
      emailSent: 'Un email de confirmation vous a été envoyé.',
      contactInfo: 'Informations de contact',
      phone: '+212 652 88 19 21',
      email: 'reservation@dakhlaclub.com',
      backHome: "Retour à l'accueil",
      whatNext: 'Et maintenant ?',
      step1: 'Consultez votre email de confirmation',
      step2: 'Notre équipe vous contactera sous 24h',
      step3: 'Préparez-vous pour une expérience inoubliable',
      titleHotel: "je réserve mon mon séjour à l'hôtel Dakhla Club",
      orderNumber: 'Numéro de commande',
    },
    en: {
      title: 'Thank you for your reservation!',
      subtitle: 'Your request has been sent successfully',
      message:
        'Our team will contact you as soon as possible to confirm your reservation and finalize the details of your stay.',
        message2: 'Our team will contact you shortly to prepare your arrival and personalize your experience.',
      emailSent: 'A confirmation email has been sent to you.',
      contactInfo: 'Contact Information',
      phone: '+212 652 88 19 21',
      email: 'reservation@dakhlaclub.com',
      backHome: 'Back to home',
      whatNext: "What's next?",
      step1: 'Check your confirmation email',
      step2: 'Our team will contact you within 24h',
      step3: 'Get ready for an unforgettable experience',
      titleHotel: 'I book my stay at Dakhla Club hotel',
      orderNumber: 'Order number',
    },
  };

  const text = content[locale];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner Image */}
      <div className="relative min-h-[65vh]  overflow-hidden md:min-h-[60vh]">
        <Image
          src="/images/offer-3/dji19.JPG"
          alt="Dakhla Club - Thalasso & Wellness"
          fill
          className="object-cover "
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
        
        {/* Success message on banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 py-16">
          
          {/* <h1 className="mb-2 px-1 text-[24px] font-light uppercase tracking-wide md:text-4xl leading-tight">
            {text.title}
          </h1> */}
          {orderId && (
            <p className="text-sm md:text-base text-white/90 mt-2">
              {text.orderNumber}: <span className="font-medium">{orderId}</span>
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 pt-4 md:pt-5">
        {/* Message */}
        <p className="text-center font-extralight text-lg text-gray-700 md:text-xl">{text.message}</p>
        <p className="mb-4 md:mb-8 text-center font-extralight text-lg text-gray-700 md:text-xl">{text.message2}</p>

        {/* Hotel Booking Section */}
        <div className="mb-3 md:mb-4 bg-[#faf9f5] py-6 -mx-4 px-0.5 md:-mx-0 md:px-8 text-center">
          <h2 className="mb-2 text-2xl font-light uppercase text-gray-800 md:text-3xl">
            {locale === 'fr' ? "Prochaine étape" : "Next step"}
          </h2>
          <p className="mb-1 text-gray-600 font-extralight max-w-2xl mx-auto">
            {locale === 'fr' 
              ? "Pour profiter pleinement de votre séjour, il vous reste à réserver votre hébergement au Dakhla Club"
              : "To fully enjoy your stay, you just need to book your accommodation at Dakhla Club"}
          </p>
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
      <div className="relative min-h-[65vh]  overflow-hidden md:min-h-[60vh]">
        <Image
          src="/images/offer-3/dji2.jpg"
          alt="Dakhla Club - Thalasso & Wellness"
          fill
          className="object-cover "
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
        
        {/* Success message on banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center  px-4 py-16">
          
          <h1 className="mb-2 px-1 text-[24px] font-light uppercase tracking-wide md:text-4xl text-white leading-tight">
            {text.titleHotel}
          </h1>
          <a
            href="https://direct-book.com/properties/DakhlaClubDIRECT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 rounded-md bg-white border border-black px-10 py-4 text-lg !text-black font-medium transition-all hover:bg-black hover:!text-white hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            {locale === 'fr' ? "Réserver l'hôtel" : "Book the hotel"}
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 font-extralight py-8 text-center text-sm text-gray-500">
        <p>© 2026 Dakhla Club - DC Thermes | Séjours Thalasso & Bien-Être Premium</p>
      </footer>
    </main>
  );
}
