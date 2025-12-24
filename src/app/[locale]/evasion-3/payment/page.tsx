'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Lock, ArrowLeft, Check } from 'lucide-react';
import { Footer } from '@/components/Footer';
// @ts-expect-error - react-credit-cards doesn't have TypeScript types
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import '../styles.css';

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
}

interface BookingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  numberOfPeople?: string;
}

type FocusType = 'number' | 'name' | 'expiry' | 'cvc' | '';

export default function PaymentPage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('paymentForm');
  
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
  });

  const [focus, setFocus] = useState<FocusType>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  useEffect(() => {
    // Retrieve booking data from sessionStorage
    const storedData = sessionStorage.getItem('bookingFormData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setBookingInfo(data);
      // Pre-fill email from booking form
      setFormData(prev => ({ ...prev, email: data.email }));
    } else {
      // Redirect back if no booking data found
      router.push(`/${locale}/evasion-3`);
    }
  }, [locale, router]);

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
        // Clear sessionStorage
        sessionStorage.removeItem('bookingFormData');
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

  if (!bookingInfo) {
    return null;
  }

  return (
    <>
      {/* <HeaderTest /> */}
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-teal-600 transition hover:text-teal-700"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Retour</span>
          </button>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-[35%_65%]">
            {/* LEFT SIDEBAR */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="rounded-sm bg-white p-6 shadow-sm border border-gray-200">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Récapitulatif</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Nom complet</span>
                    <span className="font-medium text-gray-800">{bookingInfo.firstName} {bookingInfo.lastName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium text-gray-800">{bookingInfo.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Téléphone</span>
                    <span className="font-medium text-gray-800">{bookingInfo.phone}</span>
                  </div>
                  {bookingInfo.numberOfPeople && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Nombre de personnes</span>
                      <span className="font-medium text-gray-800">{bookingInfo.numberOfPeople}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Date d'arrivée</span>
                    <span className="font-medium text-gray-800">{new Date(bookingInfo.arrivalDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>

              {/* Package Info Box */}
              <div className="rounded-sm bg-teal-50 p-6 border border-teal-100">
                <h4 className="mb-3 font-semibold text-gray-800">Pack Évasion 3</h4>
                <p className="mb-4 text-sm text-gray-700 font-medium">
                  Ce paiement comprend uniquement le forfait soins :
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="mt-0.5 text-teal-600 flex-shrink-0" />
                    <span>Piscine thermale & Hammam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="mt-0.5 text-teal-600 flex-shrink-0" />
                    <span>Massages & Enveloppement algue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="mt-0.5 text-teal-600 flex-shrink-0" />
                    <span>Cupping thérapie & Bains bien-être</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="mt-0.5 text-teal-600 flex-shrink-0" />
                    <span>Bol d'Air Jacquier & ICE BATH/Sauna</span>
                  </li>
                </ul>
                
                {/* Important Note */}
                <div className="mt-4 pt-4 border-t border-teal-200">
                  <p className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-teal-600 font-bold">ℹ️</span>
                    <span>
                      <strong>Important :</strong> L&apos;hébergement se règle séparément à l&apos;hôtel.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - PAYMENT FORM */}
            <div className="space-y-6">
              {/* Payment Detail Card */}
              <div className="rounded-sm bg-white p-8 shadow-sm border border-gray-200">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">Détails de paiement</h2>

                {/* Credit Card Visual */}
                <div className="mb-8 flex justify-center">
                  <div className="w-full max-w-sm">
                    <Cards
                      number={formData.cardNumber.replace(/\s/g, '')}
                      name={formData.cardholderName}
                      expiry={formData.expiryDate.replace('/', '')}
                      cvc={formData.cvv}
                      focused={focus}
                    />
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-gray-700">
                      Numéro de carte
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="number"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        onFocus={() => setFocus('number')}
                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                          errors.cardNumber
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label htmlFor="cardholderName" className="mb-2 block text-sm font-medium text-gray-700">
                      Nom du titulaire
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="name"
                      required
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      onFocus={() => setFocus('name')}
                      className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                        errors.cardholderName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                      }`}
                      placeholder="VOTRE NOM"
                    />
                    {errors.cardholderName && (
                      <p className="mt-1 text-xs text-red-500">{errors.cardholderName}</p>
                    )}
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="mb-2 block text-sm font-medium text-gray-700">
                        Expiration
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiry"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        onFocus={() => setFocus('expiry')}
                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
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
                      <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvc"
                        required
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        onFocus={() => setFocus('cvc')}
                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
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

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                      Email de confirmation
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setFocus('')}
                      className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                      }`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-teal-600 px-6 py-4 text-lg font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                          Traitement en cours...
                        </span>
                      ) : (
                        'Confirmer le paiement'
                      )}
                    </button>
                  </div>
                </form>

                {/* Security Notice */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="h-3 w-3" />
                  <p>Vos données de paiement sont entièrement cryptées et traitées de manière sécurisée</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
