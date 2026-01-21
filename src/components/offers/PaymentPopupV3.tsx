'use client';

import React, { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface PaymentPopupV3Props {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
}

export default function PaymentPopupV3({ isOpen, onClose }: PaymentPopupV3Props) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('paymentForm');
  
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    // Card number validation (simple check for 16 digits)
    const cardDigits = formData.cardNumber.replace(/\s/g, '');
    if (cardDigits.length !== 16) {
      newErrors.cardNumber = t('errors.invalidCard');
    }

    // Expiry date validation
    const expiryParts = formData.expiryDate.split('/');
    if (expiryParts.length !== 2) {
      newErrors.expiryDate = t('errors.invalidExpiry');
    } else {
      const month = parseInt(expiryParts[0]);
      const year = parseInt(expiryParts[1]);
      if (month < 1 || month > 12) {
        newErrors.expiryDate = t('errors.invalidExpiry');
      }
      // Check if card is expired
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = t('errors.cardExpired');
      }
    }

    // CVV validation
    if (formData.cvv.length !== 3 && formData.cvv.length !== 4) {
      newErrors.cvv = t('errors.invalidCvv');
    }

    // Cardholder name validation
    if (formData.cardholderName.trim().length < 3) {
      newErrors.cardholderName = t('errors.invalidName');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('errors.invalidEmail');
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
      // TODO: Integrate with CMI payment gateway
      // For now, simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate payment result
      // In production, this will be based on CMI response
      const paymentSuccess = Math.random() > 0.1; // 90% success rate for testing

      if (paymentSuccess) {
        // Redirect to success page
        router.push(`/${locale}/evasion-3/payment-success`);
      } else {
        // Redirect to error page
        router.push(`/${locale}/evasion-3/payment-error`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      router.push(`/${locale}/evasion-3/payment-error`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/gi, '').substring(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
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
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-teal-100 p-2">
            <CreditCard className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{t('title')}</h2>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Lock className="h-3 w-3" />
              <span>{t('securePayment')}</span>
            </div>
          </div>
        </div>

        {/* CMI Integration Notice */}
        <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          <p className="font-medium">{t('cmiNotice')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium text-gray-700">
              {t('fields.cardNumber.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardNumber"
              required
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.cardNumber
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="mb-1 block text-sm font-medium text-gray-700">
                {t('fields.expiryDate.label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="expiryDate"
                required
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.expiryDate
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="mb-1 block text-sm font-medium text-gray-700">
                {t('fields.cvv.label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cvv"
                required
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.cvv
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                }`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label htmlFor="cardholderName" className="mb-1 block text-sm font-medium text-gray-700">
              {t('fields.cardholderName.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardholderName"
              required
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.cardholderName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
              }`}
              placeholder={t('fields.cardholderName.placeholder')}
            />
            {errors.cardholderName && (
              <p className="mt-1 text-xs text-red-500">{errors.cardholderName}</p>
            )}
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
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
              }`}
              placeholder={t('fields.email.placeholder')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
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
                {t('processing')}
              </span>
            ) : (
              t('submit')
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>{t('securityNotice')}</p>
        </div>
      </div>
    </div>
  );
}
