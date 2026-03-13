'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
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
}

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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Prepare the data to send
      const fullPhone = `${formData.countryCode} ${formData.phone}`;
      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: fullPhone,
        numberOfPeople: formData.numberOfPeople,
        arrivalDate: formData.arrivalDate,
        timestamp: new Date().toISOString(),
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('fields.phone.placeholder')}
              />
            </div>
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
