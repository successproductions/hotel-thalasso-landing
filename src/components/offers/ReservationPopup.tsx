'use client';

import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ReservationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  numberOfPeople: string;
  arrivalDate: string;
  selectedOffer: string;
}

// Offer data with images and info
const offerData: Record<string, { image: string; title: string; subtitle: string; price: number; includes: string[] }> = {
  '3': {
    image: '/images/offer-3/dji1.jpg',
    title: 'Thalasso VITALITÉ 3 jours',
    subtitle: '14 soins inclus',
    price: 4560, 
    includes: [
      'Vous êtes sur le point de réserver le séjour Thalasso Vitalité au Dakhla Club.',
      'Un programme court et intensif, conçu pour relancer l\'énergie et alléger le corps.',
      '8 soins d\'activation & régénération stimulation, circulation, libération des tensions',
      '6 soins de relâchement & intégration détente profonde, apaisement, récupération',
      'Un séjour structuré pour produire un résultat, pas une simple détente',
    ],
  },
  '5': {
    image: '/images/5.jpg',
    title: 'Thalasso RÉGÉNÉRATION 5 jours',
    subtitle: '27 soins inclus',
    price: 9200, 
    includes: [
      'Vous êtes sur le point de réserver le séjour Thalasso Régénération au Dakhla Club.',
      'Un protocole complet pensé pour récupérer, rééquilibrer et recharger durablement le corps.',
      '14 soins d\'activation & régénération détox, récupération physique, relance des fonctions',
      '13 soins de relâchement & intégration apaisement du système nerveux, slow-care, récupération profonde',
      'Chaque soin a une intention. Chaque journée suit une logique',
    ],
  },
  '7': {
    image: '/images/centrethalassoDakhla.jpg',
    title: 'Thalasso RENAISSANCE 7 jours',
    subtitle: '37 soins inclus',
    price: 11250, 
    includes: [
      'Vous êtes sur le point de réserver le séjour Thalasso Renaissance, l\'expérience la plus complète du Dakhla Club.',
      'Un parcours holistique conçu pour une transformation profonde du corps et de l\'esprit.',
      '18 soins d\'activation & régénération purification, stimulation, revitalisation progressive',
      '19 soins de relâchement & intégration ralentissement, réparation, ancrage des bénéfits',
      'Ce programme n\'est pas un séjour bien-être classique. C\'est un protocole structuré de renaissance',
    ],
  },
};

// Offer options with prices
const offerOptions = [
  { value: '3', label: 'Thalasso VITALITÉ 3 jours - 4 560 MAD' },
  { value: '5', label: 'Thalasso RÉGÉNÉRATION 5 jours - 9 200 MAD' },
  { value: '7', label: 'Thalasso RENAISSANCE 7 jours - 11 250 MAD' },
];

// Banner images for mobile slider
const bannerImages = [
  '/images/offer-3/dji2.jpg',
  '/images/offer-3/dji3.jpg',
  '/images/offer-3/dji4.jpg',
  '/images/offer-3/dji7.jpg',
];

export default function ReservationPopup({ isOpen, onClose }: ReservationPopupProps) {
  const t = useTranslations('contactForm');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    countryCode: '+212',
    phone: '',
    numberOfPeople: '1',
    arrivalDate: '',
    selectedOffer: '3',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  // Auto-slide effect for mobile banner
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Get current offer data based on selection
  const currentOffer = offerData[formData.selectedOffer] || offerData['3'];

  const countryCodes = [
    { code: '+212', flag: '🇲🇦', country: 'MA' },
    { code: '+33', flag: '🇫🇷', country: 'FR' },
    { code: '+34', flag: '🇪🇸', country: 'ES' },
    { code: '+1', flag: '🇺🇸', country: 'US' },
    { code: '+44', flag: '🇬🇧', country: 'GB' },
    { code: '+49', flag: '🇩🇪', country: 'DE' },
    { code: '+39', flag: '🇮🇹', country: 'IT' },
    { code: '+32', flag: '🇧🇪', country: 'BE' },
    { code: '+31', flag: '🇳🇱', country: 'NL' },
    { code: '+966', flag: '🇸🇦', country: 'SA' },
    { code: '+971', flag: '🇦🇪', country: 'AE' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, send reservation data to save it
      const emailResponse = await fetch('/api/reservations/evasion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          numberOfPeople: formData.numberOfPeople,
          arrivalDate: formData.arrivalDate,
          selectedOffer: formData.selectedOffer,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Email API error:', await emailResponse.text());
      }

      // Initiate CMI payment
      const paymentResponse = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          numberOfPeople: formData.numberOfPeople,
          arrivalDate: formData.arrivalDate,
          selectedOffer: formData.selectedOffer,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment initiation failed');
      }

      const paymentData = await paymentResponse.json();

      if (paymentData.success) {
        // Store booking info in sessionStorage
        sessionStorage.setItem('bookingInfo', JSON.stringify(paymentData.bookingInfo));

        // Create and submit hidden form to CMI
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentData.gatewayUrl;

        Object.entries(paymentData.params).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error('Payment data invalid');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      // Optionally show error to user
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg lg:max-w-4xl max-h-[90vh] overflow-y-auto lg:overflow-visible lg:max-h-none bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 text-gray-600 shadow-md transition hover:bg-white hover:text-gray-800"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Desktop: 2-column layout | Mobile: single column */}
        <div className="lg:grid lg:grid-cols-2 lg:items-stretch"> 
          
          {/* LEFT COLUMN - Image + Offer Info (Desktop only) */}
          <div className="hidden lg:flex lg:flex-col">
            {/* Top: Image */}
            <div className="relative h-[280px] w-full overflow-hidden flex-shrink-0">
              <Image
                src={currentOffer.image}
                alt={currentOffer.title}
                fill
                className="object-cover transition-all duration-500"
                priority
              />
              <div className="absolute" />
            </div>
            
            {/* Bottom: Offer Info - Scrollable */}
            <div className="flex-1 min-h-0 bg-[#faf9f5] flex flex-col">
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6">
                <span className="text-sm uppercase tracking-wider text-[#d6bb8e] font-medium">
                  {currentOffer.subtitle}
                </span>
                <h3 className="mt-2 text-2xl font-normal text-gray-900">
                  {currentOffer.title}
                </h3>
                
                {/* Includes List */}
                <ul className="mt-4 space-y-2">
                  {currentOffer.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-[#139584] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer - Always at bottom */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Dakhla Club - Wellness & Thalasso</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Form Section */}
          <div className="p-4 lg:p-6">
            {/* Mobile Banner Slider */}
            <div className="lg:hidden relative h-36 w-full overflow-hidden mb-4 -mx-4 -mt-4">
              {bannerImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Dakhla Club - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Title on banner */}
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <h2 className="text-2xl font-light tracking-wide">Réservez votre évasion</h2>
                <p className="mt-1 text-sm text-white/80">Dakhla Club - Wellness & Thalasso</p>
              </div>

              {/* Slide indicators */}
              <div className="absolute bottom-4 right-6 flex gap-1.5">
                {bannerImages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block mb-2">
              <h2 className="text-2xl font-normal text-gray-900">Complétez le formulaire ci-dessous pour réserver votre programme thalasso</h2>
              <p className="text-sm text-gray-500 mt-1">Notre équipe vous accompagnera ensuite pour finaliser votre séjour dans les meilleures conditions.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
              {/* Offer Selection */}
              <div>
                <label htmlFor="selectedOffer" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Choisir votre programme <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    id="selectedOffer"
                    required
                    value={formData.selectedOffer}
                    onChange={(e) => handleInputChange('selectedOffer', e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/30"
                  >
                    {offerOptions.map((offer) => (
                      <option key={offer.value} value={offer.value}>
                        {offer.label}
                      </option>
                    ))}
                  </select>
                  {/* Info icon for mobile */}
                  <button
                    type="button"
                    onClick={() => setShowMobileInfo(true)}
                    className="lg:hidden flex items-center justify-center w-10 h-12 rounded-md border border-gray-300 bg-gray-50 text-[#139584] hover:bg-[#139584] hover:text-white transition-colors"
                    aria-label="Voir les détails du programme"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Info Popup */}
              {showMobileInfo && (
                <div 
                  className="lg:hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
                  onClick={() => setShowMobileInfo(false)}
                >
                  <div 
                    className="relative bg-white rounded-lg shadow-xl max-w-sm w-full max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setShowMobileInfo(false)}
                      className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                    <div className="p-5">
                      <span className="text-sm uppercase tracking-wider text-[#d6bb8e] font-medium">
                        {currentOffer.subtitle}
                      </span>
                      <h3 className="mt-1 text-xl font-light text-gray-900">
                        {currentOffer.title}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {currentOffer.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <svg className="w-5 h-5 text-[#139584] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                        Dakhla Club - Wellness & Thalasso
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('fields.name.label')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/30"
                  placeholder={t('fields.name.placeholder')}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('fields.email.label')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/30"
                  placeholder={t('fields.email.placeholder')}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('fields.phone.label')} <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="rounded-md border border-gray-300 bg-gray-50 pl-3 py-2.5 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/30"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.country} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/30"
                    placeholder={t('fields.phone.placeholder')}
                  />
                </div>
              </div>

              {/* Number of People & Arrival Date - Side by side */}
              <div className="grid grid-cols-2 gap-3">
                {/* Number of People */}
                <div>
                  <label htmlFor="numberOfPeople" className="mb-1.5 block text-sm font-medium text-gray-700">
                    {t('fields.numberOfPeople.label')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="numberOfPeople"
                    required
                    value={formData.numberOfPeople}
                    onChange={(e) => handleInputChange('numberOfPeople', e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2.5 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/30"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {t(`fields.numberOfPeople.${num === 1 ? 'singular' : 'plural'}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Arrival Date */}
                <div>
                  <label htmlFor="arrivalDate" className="mb-1.5 block text-sm font-medium text-gray-700">
                    {t('fields.date.label')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="arrivalDate"
                    required
                    min={today}
                    value={formData.arrivalDate}
                    onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/30"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 my-2 px-2.5 ">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-[#139584] focus:ring-[#d6bb8e]"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  {t('terms.agree')} <a href="/fr/legal/cgv" target="_blank" className="underline font-medium text-[#139584] hover:text-[#d6bb8e]">{t('terms.link')}</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-md bg-[#d6bb8e] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#139584] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t('submit')}
                  </span>
                ) : (
                  'Continuer vers le paiement'
                )}
              </button>

              {/* Security and Availability Info */}
              <div className="mt-1 space-y-3 border-t border-gray-200 pt-1 ">
                <div className="flex items-start gap-1">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Places limitées pour garantir la qualité des soins.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Paiement 100% sécurisé.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
