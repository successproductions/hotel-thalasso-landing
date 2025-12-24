'use client';

import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface BookingFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
}

export default function BookingFormPopup({ isOpen, onClose }: BookingFormPopupProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('bookingForm');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    arrivalDate: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Prénom requis';
    }

    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Nom requis';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    const phoneRegex = /^[0-9+\s()-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Téléphone invalide';
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = 'Date d\'arrivée requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Store form data in sessionStorage to pass to payment page
      sessionStorage.setItem('bookingFormData', JSON.stringify(formData));
      
      // Redirect to payment page
      router.push(`/${locale}/evasion-3/payment`);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

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

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Réservez votre séjour</h2>
          <p className="mt-1 text-sm text-gray-600">
            Complétez vos informations pour continuer vers le paiement
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
              Prénom <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                }`}
                placeholder="Votre prénom"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
              Nom <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                }`}
                placeholder="Votre nom"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                }`}
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                }`}
                placeholder="+212 6XX XXX XXX"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Arrival Date */}
          <div>
            <label htmlFor="arrivalDate" className="mb-1 block text-sm font-medium text-gray-700">
              Date d&apos;arrivée <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                id="arrivalDate"
                required
                value={formData.arrivalDate}
                onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                  errors.arrivalDate
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                }`}
              />
            </div>
            {errors.arrivalDate && (
              <p className="mt-1 text-xs text-red-500">{errors.arrivalDate}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                Traitement...
              </span>
            ) : (
              'Continuer vers le paiement'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
