'use client';

import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

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
const offerData: Record<string, { image: string; title: string; subtitle: string; includes: string[] }> = {
  '3': {
    image: '/images/THERMALE.png',
    title: 'Évasion 3 Nuits',
    subtitle: 'Escapade Bien-être',
    includes: [
      '3 nuits en chambre vue mer',
      '4 soins thalasso',
      'Pension complète',
      'Accès spa & piscine',
      'Cours de yoga quotidien',
    ],
  },
  '5': {
    image: '/images/5.jpg',
    title: 'Évasion 5 Nuits',
    subtitle: 'Retraite Revitalisante',
    includes: [
      '5 nuits en chambre vue mer',
      '6 soins thalasso',
      'Pension complète',
      'Accès spa & piscine',
      'Cours de yoga quotidien',
      'Excursion en bateau',
    ],
  },
  '7': {
    image: '/images/centrethalassoDakhla.jpg',
    title: 'Évasion 7 Nuits',
    subtitle: 'Cure Holistique',
    includes: [
      '7 nuits en chambre vue mer',
      '10 soins thalasso',
      'Pension complète',
      'Accès spa & piscine',
      'Cours de yoga quotidien',
      'Excursion en bateau',
      'Massage signature offert',
    ],
  },
};

// Offer options
const offerOptions = [
  { value: '3', label: 'Évasion 3 Nuits' },
  { value: '5', label: 'Évasion 5 Nuits' },
  { value: '7', label: 'Évasion 7 Nuits' },
];

// Banner images for mobile slider
const bannerImages = [
  '/images/offer-3/dji2.jpg',
  '/images/offer-3/dji3.jpg',
  '/images/offer-3/dji4.jpg',
  '/images/offer-3/dji7.jpg',
];

export default function ReservationPopup({ isOpen, onClose }: ReservationPopupProps) {
  const locale = useLocale();
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
      // Send confirmation email via API (single endpoint for all offers)
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

      // Redirect to thank you page (no payment)
      window.location.href = `/${locale}/evasion/thank-you`;
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
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
        className="relative w-full max-w-lg lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
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
        <div className="lg:grid lg:grid-cols-2">
          
          {/* LEFT COLUMN - Image + Offer Info (Desktop only) */}
          <div className="hidden lg:flex lg:flex-col">
            {/* Top: Image */}
            <div className="relative h-[280px] w-full overflow-hidden">
              <Image
                src={currentOffer.image}
                alt={currentOffer.title}
                fill
                className="object-cover transition-all duration-500"
                priority
              />
              <div className="absolute" />
            </div>
            
            {/* Bottom: Offer Info */}
            <div className="flex-1 bg-[#faf9f5] p-6 flex flex-col justify-center">
              <span className="text-sm uppercase tracking-wider text-[#d6bb8e] font-medium">
                {currentOffer.subtitle}
              </span>
              <h3 className="mt-2 text-2xl font-light text-gray-900">
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

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Dakhla Club - Wellness & Thalasso</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Form Section */}
          <div className="p-3 lg:p-6">
            {/* Mobile Banner Slider */}
            <div className="lg:hidden relative h-36 w-full overflow-hidden mb-4 -mx-5 -mt-5" style={{ width: 'calc(100% + 2.5rem)' }}>
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
            <div className="hidden lg:block mb-6">
              <h2 className="text-2xl font-light text-gray-900">Réservez votre séjour</h2>
              <p className="text-sm text-gray-500 mt-1">Remplissez le formulaire ci-dessous</p>
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
                  'Continuer'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
