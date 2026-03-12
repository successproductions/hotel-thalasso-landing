'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Swal from 'sweetalert2';

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  numberOfPeople: string;
  arrivalDate: string;
  optIn: boolean;
}

export default function RenaissancePanierPage() {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    countryCode: '+212',
    phone: '',
    numberOfPeople: '1',
    arrivalDate: '',
    optIn: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const currentOffer = {
    title: locale === 'fr' ? "THALASSO RENAISSANCE 7 JOURS" : "THALASSO RENAISSANCE 7 DAYS",
    subtitle: locale === 'fr' ? "Cure Holistique" : "Holistic Cure",
    includes: locale === 'fr'
      ? ["33 soins thalasso","1270 minutes de soins","16 soins softs et 17 hards","Accès spa et piscine"]
      : ["33 thalasso treatments","1270 minutes of treatments","16 soft treatments and 17 hard treatments","Spa and pool access"],
    image: "/images/offer-7/dji3.jpg",
    basePriceMAD: 11700,
    accommodationDisclaimer: locale === 'fr' ? "* Ce pack n'inclut pas l'hébergement" : "* This pack does not include accommodation"
  };

  const currentPriceMAD = Math.floor(currentOffer.basePriceMAD * 1.027);
  const basePriceMAD = currentOffer.basePriceMAD;

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

  const validateNoSpecialChars = (value: string): string | null => {
    const validNamePattern = /^[a-zA-ZÀ-ÿ\s\-\.]+$/;
    if (!validNamePattern.test(value)) {
      return locale === 'fr'
        ? 'Seuls les lettres, espaces, tirets et points sont autorisés'
        : 'Only letters, spaces, hyphens and periods allowed';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nameError = validateNoSpecialChars(formData.fullName);
    if (nameError) {
      setValidationErrors({ fullName: nameError });
      await Swal.fire({
        icon: 'error',
        title: locale === 'fr' ? 'Erreur de validation' : 'Validation Error',
        text: locale === 'fr'
          ? 'Veuillez corriger les erreurs avant de continuer.'
          : 'Please correct the errors before continuing.',
        confirmButtonColor: '#d6bb8e',
        confirmButtonText: 'OK',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const emailResponse = await fetch('/api/reservations/evasion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          numberOfPeople: formData.numberOfPeople,
          arrivalDate: formData.arrivalDate,
          selectedOffer: '7',
          pageSlug: 'renaissance',
          optIn: formData.optIn,
        }),
      });

      if (!emailResponse.ok) console.error('Email API error:', await emailResponse.text());

      const paymentResponse = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          numberOfPeople: formData.numberOfPeople,
          arrivalDate: formData.arrivalDate,
          selectedOffer: '7',
          pageSlug: 'renaissance',
          optIn: formData.optIn,
        }),
      });

      if (!paymentResponse.ok) throw new Error('Payment initiation failed');

      const paymentData = await paymentResponse.json();

      if (paymentData.success) {
        sessionStorage.setItem('bookingInfo', JSON.stringify(paymentData.bookingInfo));

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
    } catch {
      setIsSubmitting(false);
      await Swal.fire({
        icon: 'error',
        title: locale === 'fr' ? 'Erreur' : 'Error',
        text: locale === 'fr'
          ? 'Une erreur est survenue. Veuillez réessayer.'
          : 'An error occurred. Please try again.',
        confirmButtonColor: '#d6bb8e',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    if (field === 'fullName') {
      const error = validateNoSpecialChars(value as string);
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[field] = error;
        } else {
          delete newErrors[field];
        }
        return newErrors;
      });
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const today = new Date().toISOString().split('T')[0];
  const totalPrice = currentPriceMAD * parseInt(formData.numberOfPeople || '1');

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white py-4 px-6 md:px-12 flex justify-between items-center z-10 sticky top-0">
        <a href={`/${locale}`} className="block relative w-32 h-10">
          <Image src="/images/LogoDakhla.png" alt="Dakhla Club" fill className="object-contain object-left" priority />
        </a>
        <a href={`/${locale}/${'renaissance'}`} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="hidden sm:inline">{locale === 'fr' ? 'Retour' : 'Back'}</span>
        </a>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT COLUMN - FORM */}
        <div className="flex-1 lg:w-3/5 xl:w-2/3 py-8 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col justify-start">
          <div className="max-w-xl w-full mx-auto lg:mx-0 pt-2 lg:pt-8">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
              {locale === 'fr' ? 'Finalisez votre réservation' : 'Complete your checkout'}
            </h1>
            <p className="text-gray-500 text-sm mb-10">
              {locale === 'fr' ? 'Remplissez vos coordonnées pour valider votre venue.' : 'Fill in your details to validate your booking.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">{t('fields.name.label')} <span className="text-red-500">*</span></label>
                  <input type="text" id="fullName" required value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className={`w-full rounded-lg border ${validationErrors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-[#d6bb8e] focus:ring-[#d6bb8e]/20'} px-4 py-3 shadow-sm focus:outline-none focus:ring-2 transition-all`} placeholder={t('fields.name.placeholder')} />
                  {validationErrors.fullName && <p className="mt-1.5 text-sm text-red-600 font-medium">{validationErrors.fullName}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">{t('fields.email.label')} <span className="text-red-500">*</span></label>
                  <input type="email" id="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/20 transition-all" placeholder={t('fields.email.placeholder')} />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">{t('fields.phone.label')} <span className="text-red-500">*</span></label>
                  <div className="flex shadow-sm rounded-lg">
                    <select value={formData.countryCode} onChange={(e) => handleInputChange('countryCode', e.target.value)} className="rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 pl-4 pr-8 py-3 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/20 transition-all text-gray-700">
                      {countryCodes.map((country) => (
                        <option key={country.country} value={country.code}>{country.flag} {country.code}</option>
                      ))}
                    </select>
                    <input type="tel" id="phone" required value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="flex-1 rounded-r-lg border border-gray-300 px-4 py-3 focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/20 transition-all" placeholder={t('fields.phone.placeholder')} />
                  </div>
                </div>

                <div>
                  <label htmlFor="arrivalDate" className="mb-1.5 block text-sm font-medium text-gray-700">{t('fields.date.label')} <span className="text-red-500">*</span></label>
                  <input type="date" id="arrivalDate" required min={today} value={formData.arrivalDate} onChange={(e) => handleInputChange('arrivalDate', e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/20 transition-all" />
                </div>

                <div>
                  <label htmlFor="numberOfPeople" className="mb-1.5 block text-sm font-medium text-gray-700">{t('fields.numberOfPeople.label')} <span className="text-red-500">*</span></label>
                  <select id="numberOfPeople" required value={formData.numberOfPeople} onChange={(e) => handleInputChange('numberOfPeople', e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-[#d6bb8e] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e]/20 transition-all">
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>{num} {t(`fields.numberOfPeople.${num === 1 ? 'singular' : 'plural'}`)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-1 pb-2">
                <div className="flex items-start space-x-3 bg-gray-50 border border-gray-100 p-4 rounded-xl mb-4">
                  <div className="flex items-center h-5 mt-0.5">
                    <input type="checkbox" id="acceptTerms" required className="h-5 w-5 rounded border-gray-300 text-[#139584] focus:ring-[#d6bb8e] transition-all" />
                  </div>
                  <label htmlFor="acceptTerms" className="text-sm text-gray-600 leading-relaxed">
                    {t('terms.agree')} <a href="/fr/legal/cgv" target="_blank" className="font-medium text-[#139584] hover:text-[#0f7668] underline transition-colors">{t('terms.link')}</a>
                  </label>
                </div>

                <div className="flex items-start space-x-3 bg-gray-50 border border-gray-100 p-4 rounded-xl">
                  <div className="flex items-center h-5 mt-0.5">
                    <input type="checkbox" id="optIn" checked={formData.optIn} onChange={(e) => handleInputChange('optIn', e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-[#139584] focus:ring-[#d6bb8e] transition-all" />
                  </div>
                  <label htmlFor="optIn" className="text-sm text-gray-600 leading-relaxed">
                    {locale === 'fr' 
                      ? "J'accepte de recevoir des offres exclusives et des communications personnalisées de la part de Dakhla Club." 
                      : "I agree to receive exclusive offers and personalized communications from Dakhla Club."}
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#d6bb8e] px-6 py-4 text-base font-medium text-white shadow-md transition-all duration-300 hover:bg-[#c2a67a] focus:outline-none focus:ring-2 focus:ring-[#d6bb8e] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 flex flex-col items-center justify-center gap-1 group">
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {t('submit')}
                  </span>
                ) : (
                  <>
                    <span className="text-lg">{locale === 'fr' ? 'Procéder au paiement' : 'Proceed to payment'}</span>
                    <span className="text-sm font-normal text-white/90 group-hover:text-white transition-colors">
                      {totalPrice.toLocaleString('fr-FR')} MAD <span className="opacity-75 font-light">({locale === 'fr' ? 'frais CMI inclus' : 'CMI fees included'})</span>
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN - SUMMARY */}
        <div className="lg:w-2/5 xl:w-1/3 bg-[#faf9f5] border-t lg:border-t-0 lg:border-l border-gray-200 py-8 px-4 sm:px-8 lg:px-12">
          <div className="max-w-xl mx-auto lg:max-w-none lg:sticky lg:top-28">
            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {locale === 'fr' ? 'Résumé de la commande' : 'Order Summary'}
            </h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={currentOffer.image} alt={currentOffer.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-[#d6bb8e]/10 text-[#d6bb8e] text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                  {currentOffer.subtitle}
                </span>
                <h3 className="text-xl font-light text-gray-900 leading-tight mb-4">{currentOffer.title}</h3>
                <ul className="space-y-3">
                  {currentOffer.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <div className="mt-0.5 rounded-full bg-[#139584]/10 p-0.5">
                        <svg className="w-3.5 h-3.5 text-[#139584]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{locale === 'fr' ? 'Prix par personne' : 'Price per person'}</span>
                <span className="font-medium text-gray-900">{basePriceMAD.toLocaleString('fr-FR')} MAD / 1170 €</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{locale === 'fr' ? 'Nombre de personnes' : 'Number of people'}</span>
                <span className="font-medium text-gray-900">x {formData.numberOfPeople}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{locale === 'fr' ? 'Frais de transaction CMI' : 'CMI Transaction Fees'} (2.7%)</span>
                <span className="text-[#139584] text-xs px-2 py-0.5 bg-[#139584]/10 rounded font-medium">{locale === 'fr' ? 'Inclus' : 'Included'}</span>
              </div>
              
              <div className="border-t border-dashed border-gray-200 pt-4 mt-2 flex justify-between items-end">
                <div>
                  <p className="text-base font-medium text-gray-900">{locale === 'fr' ? 'Total à payer' : 'Total to pay'}</p>
                  <p className="text-xs text-gray-500 mt-1">{currentOffer.accommodationDisclaimer}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-[#d6bb8e]">
                    {totalPrice.toLocaleString('fr-FR')} <span className="text-lg">MAD</span>
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">TTC</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-4 p-5 rounded-2xl bg-[#139584]/5 border border-[#139584]/20">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <svg className="w-5 h-5 text-[#139584]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0f7668] mb-1">
                  {locale === 'fr' ? 'Paiement 100% sécurisé' : '100% Secure Payment'}
                </p>
                <p className="text-xs text-[#0f7668]/80 leading-relaxed">
                  {locale === 'fr' ? 'Vos informations sont transmises de manière sécurisée via la plateforme officielle CMI.' : 'Your information is transmitted securely via the official CMI platform.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}