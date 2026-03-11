'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import '../evasion/styles.css';

interface BookingInfo {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  countryCode?: string;
  arrivalDate: string;
  numberOfPeople?: string;
  selectedOffer?: string;
  pageSlug?: string;
}

export default function PanierPage() {
  const locale = useLocale();
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get booking info from sessionStorage
    const storedInfo = sessionStorage.getItem('bookingFormData');
    if (storedInfo) {
      setBookingInfo(JSON.parse(storedInfo));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !bookingInfo) {
      router.push(`/${locale}`);
    }
  }, [isLoading, bookingInfo, locale, router]);

  const handlePayment = async () => {
    if (!bookingInfo) return;

    setIsLoading(true);
    setError(null);

    try {
      // Determine full name
      const fullName = bookingInfo.fullName || `${bookingInfo.firstName || ''} ${bookingInfo.lastName || ''}`.trim() || 'Client';
      const phone = bookingInfo.countryCode ? `${bookingInfo.countryCode} ${bookingInfo.phone}` : bookingInfo.phone;

      // Call the CMI payment initiation API
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email: bookingInfo.email,
          phone,
          numberOfPeople: bookingInfo.numberOfPeople || '1',
          arrivalDate: bookingInfo.arrivalDate,
          selectedOffer: bookingInfo.selectedOffer || '3',
          pageSlug: bookingInfo.pageSlug || 'evasion',
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      const paymentData = await response.json();

      if (paymentData.success) {
        // Store booking info
        sessionStorage.setItem('bookingInfo', JSON.stringify(paymentData.bookingInfo));
        // Clear the initial form data so user can't duplicate
        sessionStorage.removeItem('bookingFormData');

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
    } catch (err) {
      console.error('Payment error:', err);
      setError(locale === 'fr' 
        ? 'Une erreur est survenue. Veuillez réessayer.' 
        : 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const content = {
    fr: {
      title: 'Redirection vers le paiement',
      subtitle: 'Vous allez être redirigé vers notre partenaire de paiement sécurisé',
      loading: 'Préparation du paiement...',
      button: 'Procéder au paiement',
      secure: 'Paiement 100% sécurisé',
    },
    en: {
      title: 'Redirecting to payment',
      subtitle: 'You will be redirected to our secure payment partner',
      loading: 'Preparing payment...',
      button: 'Proceed to payment',
      secure: '100% secure payment',
    },
  };

  const text = content[locale as 'fr' | 'en'] || content.fr;

  if (isLoading && !bookingInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#139584]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-900">
          {text.title}
        </h1>
        <p className="mb-6 text-center text-gray-600">
          {text.subtitle}
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-center text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full rounded-lg bg-[#d6bb8e] px-6 py-3 font-medium text-white transition hover:bg-[#139584] disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              {text.loading}
            </span>
          ) : (
            text.button
          )}
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          🔒 {text.secure}
        </p>
      </div>
    </div>
  );
}
