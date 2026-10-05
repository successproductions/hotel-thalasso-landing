'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useLocale, useTranslations } from 'next-intl';
import { captureAttribution, getAttribution } from '@/lib/metaTracking';

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
  selectedPack: string;
}

export default function ReservationPopup({ isOpen, onClose }: ReservationPopupProps) {
  const locale = useLocale();
  const t = useTranslations('contactForm');
  const packs = [
    {
      value: '3',
      label: locale === 'fr' ? 'Programme 3 jours — 495 € / 4 950 MAD' : '3-Day Program — 495 € / 4,950 MAD',
      sheetLabel: locale === 'fr' ? 'Programme 3 jours' : '3-Day Program',
    },
    {
      value: '5',
      label: locale === 'fr' ? 'Programme 5 jours — 927 € / 9 270 MAD' : '5-Day Program — 927 € / 9,270 MAD',
      sheetLabel: locale === 'fr' ? 'Programme 5 jours' : '5-Day Program',
    },
    {
      value: '7',
      label: locale === 'fr' ? 'Programme 7 jours — 1 062 € / 10 620 MAD' : '7-Day Program — 1,062 € / 10,620 MAD',
      sheetLabel: locale === 'fr' ? 'Programme 7 jours' : '7-Day Program',
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    countryCode: '+212',
    phone: '',
    numberOfPeople: '1',
    arrivalDate: '',
    selectedPack: '3',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  // Set as soon as the visitor picks an indicative themselves, so the async
  // IP detection can never overwrite their choice.
  const countryTouchedRef = useRef(false);

  // min/max = number of digits of the national number, trunk "0" excluded.
  const countryCodes = [
    { code: '+212', flag: '🇲🇦', country: 'MA', min: 9, max: 9 },
    { code: '+33', flag: '🇫🇷', country: 'FR', min: 9, max: 9 },
    { code: '+34', flag: '🇪🇸', country: 'ES', min: 9, max: 9 },
    { code: '+1', flag: '🇺🇸', country: 'US', min: 10, max: 10 },
    { code: '+44', flag: '🇬🇧', country: 'GB', min: 9, max: 10 },
    { code: '+49', flag: '🇩🇪', country: 'DE', min: 10, max: 11 },
    { code: '+39', flag: '🇮🇹', country: 'IT', min: 9, max: 10 },
    { code: '+32', flag: '🇧🇪', country: 'BE', min: 9, max: 9 },
    { code: '+31', flag: '🇳🇱', country: 'NL', min: 9, max: 9 },
    { code: '+966', flag: '🇸🇦', country: 'SA', min: 9, max: 9 },
    { code: '+971', flag: '🇦🇪', country: 'AE', min: 9, max: 9 },
  ];

  const currentCountry =
    countryCodes.find((c) => c.code === formData.countryCode) ?? countryCodes[0];

  // Country code pre-selected from the visitor's IP. Cloudflare already fronts
  // the site, so /cdn-cgi/trace gives the country same-origin: no third-party
  // call, no API key, no rate limit. Never overrides a manual choice.
  useEffect(() => {
    let cancelled = false;

    fetch('/cdn-cgi/trace')
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then((text) => {
        const loc = text.match(/^loc=([A-Z]{2})$/m)?.[1];
        const match = countryCodes.find((c) => c.country === loc);
        if (cancelled || !match || countryTouchedRef.current) return;
        setFormData((prev) => ({ ...prev, countryCode: match.code }));
      })
      .catch(() => {
        // Visitor keeps the default indicative. Detection is a convenience,
        // never a requirement.
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const digits = formData.phone;

  // Shown as soon as it happens: a leading 0 is an unambiguous mistake and the
  // visitor can act on it straight away.
  const phoneZeroError = digits.startsWith('0')
    ? locale === 'fr'
      ? 'Vérifiez votre indicatif pays, puis tapez votre numéro sans le 0'
      : 'Check your country code, then type your number without the leading 0'
    : '';

  // Held back until the field loses focus: an incomplete number is the normal
  // state while typing, and flagging it on the first keystroke is just noise.
  const phoneLengthError =
    digits && (digits.length < currentCountry.min || digits.length > currentCountry.max)
      ? locale === 'fr'
        ? `Le numéro doit contenir ${
            currentCountry.min === currentCountry.max
              ? currentCountry.min
              : `${currentCountry.min} à ${currentCountry.max}`
          } chiffres`
        : `The number must contain ${
            currentCountry.min === currentCountry.max
              ? currentCountry.min
              : `${currentCountry.min} to ${currentCountry.max}`
          } digits`
      : '';

  // What the user sees now…
  const phoneError = phoneZeroError || (phoneBlurred ? phoneLengthError : '');
  // …and what actually blocks the submit.
  const phoneInvalid = Boolean(phoneZeroError || phoneLengthError);

  // Capture Meta ad attribution (fbclid / utm_*) from the landing URL on mount,
  // before the visitor navigates away from it. Fail-soft, never throws.
  useEffect(() => {
    captureAttribution();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // The field is `required`, so the browser already blocks an empty value;
    // this stops a filled but malformed number from reaching the API. Reveal
    // the length error too, in case the visitor never left the field.
    if (phoneInvalid) {
      setPhoneBlurred(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data to send
      const fullPhone = `${formData.countryCode} ${formData.phone}`;
      const selectedPackObj = packs.find(p => p.value === formData.selectedPack);
      // ISO country from the already-selected dial code (no geolocation).
      const selectedCountry = countryCodes.find(c => c.code === formData.countryCode);
      // 8 Meta attribution fields; every one degrades to '' when unavailable.
      const attribution = getAttribution(selectedCountry?.country ?? '');
      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: fullPhone,
        numberOfPeople: formData.numberOfPeople,
        arrivalDate: formData.arrivalDate,
        selectedPack: selectedPackObj?.sheetLabel ?? formData.selectedPack,
        timestamp: new Date().toISOString(),
        ...attribution,
      };

      // Send to API endpoint (handles emails and Google Sheets)
      const response = await fetch('/api/reservations/offer3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      // Redirect to thank you page
      window.location.href = `/${locale}/evasion-3/thank-you`;
    } catch (error) {
      console.error('Submission error:', error);

      // Show error message
      await Swal.fire({
        icon: 'error',
        title: t('errors.server'),
        text: t('errors.unknown'),
        confirmButtonText: t('submit'),
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'countryCode') countryTouchedRef.current = true;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /** Keeps digits only and caps the length for the selected country. */
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, currentCountry.max);
    setFormData((prev) => ({ ...prev, phone: digits }));
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">{t('header.title')}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
              {t('fields.name.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('fields.name.placeholder')}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              {t('fields.email.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('fields.email.placeholder')}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              {t('fields.phone.label')} <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <select
                value={formData.countryCode}
                onChange={(e) => handleInputChange('countryCode', e.target.value)}
                className="rounded-lg border border-gray-300 pr-6 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={currentCountry.max}
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onBlur={() => setPhoneBlurred(true)}
                aria-invalid={phoneError ? true : undefined}
                aria-describedby={phoneError ? 'phone-error' : undefined}
                className={`flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                  phoneError
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder={'X'.repeat(currentCountry.max)}
              />
            </div>
            {phoneError && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {phoneError}
              </p>
            )}
          </div>

          {/* Number of People */}
          <div>
            <label htmlFor="numberOfPeople" className="mb-1 block text-sm font-medium text-gray-700">
              {t('fields.numberOfPeople.label')} <span className="text-red-500">*</span>
            </label>
            <select
              id="numberOfPeople"
              required
              value={formData.numberOfPeople}
              onChange={(e) => handleInputChange('numberOfPeople', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {t(`fields.numberOfPeople.${num === 1 ? 'singular' : 'plural'}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Programme / Pack */}
          <div>
            <label htmlFor="selectedPack" className="mb-1 block text-sm font-medium text-gray-700">
              {locale === 'fr' ? 'Programme' : 'Program'} <span className="text-red-500">*</span>
            </label>
            <select
              id="selectedPack"
              required
              value={formData.selectedPack}
              onChange={(e) => handleInputChange('selectedPack', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {packs.map((pack) => (
                <option key={pack.value} value={pack.value}>
                  {pack.label}
                </option>
              ))}
            </select>
          </div>

          {/* Arrival Date */}
          <div>
            <label htmlFor="arrivalDate" className="mb-1 block text-sm font-medium text-gray-700">
              {t('fields.date.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="arrivalDate"
              required
              min={today}
              value={formData.arrivalDate}
              onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#d6bb8e] px-6 py-3 font-medium text-white transition hover:bg-[#139584] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              t('submit')
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
