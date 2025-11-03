'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';
import Image from 'next/image';
import Swal from 'sweetalert2';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BlackFridayReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const params = useParams();
  const locale = params?.locale || 'fr';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: 'MA',
    phoneNumber: '',
    guests: '2',
    checkIn: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map country codes to phone prefixes
      const countryCodeMap: Record<string, string> = {
        MA: '+212',
        FR: '+33',
        ES: '+34',
        US: '+1',
        GB: '+44',
        DE: '+49',
        IT: '+39',
        BE: '+32',
        NL: '+31',
        SA: '+966',
        AE: '+971',
      };

      const phonePrefix = countryCodeMap[formData.countryCode] || formData.countryCode;
      const fullPhone = `${phonePrefix} ${formData.phoneNumber}`;

      // Submit to Google Sheets
      await fetch(process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL_BLACK_FRIDAY || '', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          countryCode: formData.countryCode,
          phoneNumber: formData.phoneNumber,
          guests: formData.guests,
          checkIn: formData.checkIn,
          timestamp: new Date().toISOString(),
        }),
      });

      // Send emails
      await fetch('/api/black-friday-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          countryCode: formData.countryCode,
          phoneNumber: formData.phoneNumber,
          guests: formData.guests,
          checkIn: formData.checkIn,
        }),
      });

      // Redirect to thank you page with locale
      window.location.href = `/${locale}/merci`;
    } catch (error) {
      console.error('Error submitting reservation:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue. Veuillez réessayer.',
        confirmButtonColor: '#5ba6a9',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white  shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header - Banner Image */}
        <div className="relative w-full h-48 md:h-56">
          <Image
            src="/images/black-friday/banner-blackfriday.png"
            alt="Black Friday Banner"
            fill
            className="object-cover"
            priority
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors backdrop-blur-sm z-10"
            aria-label="Close"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-1 border-gray-200  focus:border-[#5ba6a9] focus:outline-none transition-colors"
              placeholder="Votre nom complet"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-1 border-gray-200  focus:border-[#5ba6a9] focus:outline-none transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          {/* Phone with Country Code */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <div className="flex gap-2">
              {/* Country Code Selector */}
              <div className="w-32 flex-shrink-0">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  required
                  className="w-full px-3 py-3  bg-white border-1 border-gray-200 text-gray-800
                           focus:border-[#5ba6a9] focus:outline-none focus:ring-2 focus:ring-[#5ba6a9]/20
                           transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="MA">🇲🇦 +212</option>
                  <option value="FR">🇫🇷 +33</option>
                  <option value="ES">🇪🇸 +34</option>
                  <option value="US">🇺🇸 +1</option>
                  <option value="GB">🇬🇧 +44</option>
                  <option value="DE">🇩🇪 +49</option>
                  <option value="IT">🇮🇹 +39</option>
                  <option value="BE">🇧🇪 +32</option>
                  <option value="NL">🇳🇱 +31</option>
                  <option value="SA">🇸🇦 +966</option>
                  <option value="AE">🇦🇪 +971</option>
                </select>
              </div>

              {/* Phone Number Input */}
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="flex-1 px-4 py-3 border-1 border-gray-200  focus:border-[#5ba6a9]
                         focus:outline-none focus:ring-2 focus:ring-[#5ba6a9]/20 transition-colors"
                placeholder="6 XX XX XX XX"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de personnes *
            </label>
            <select
              id="guests"
              required
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full px-4 py-3 border-1 border-gray-200  focus:border-[#5ba6a9] focus:outline-none transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'personne' : 'personnes'}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Date */}
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
              Date d&apos;arrivée *
            </label>
            <input
              type="date"
              id="checkIn"
              required
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              className="w-full px-4 py-3 border-1 border-gray-200  focus:border-[#5ba6a9] focus:outline-none transition-colors"
              min="2025-11-27"
              max="2025-12-30"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#5ba6a9] text-white font-medium text-lg 
                     hover:bg-[#c4b89a] disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isSubmitting ? '⏳ Envoi en cours...' : '✨ Réserver Maintenant -30%'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            * Champs obligatoires
          </p>
        </form>
      </div>
    </div>
  );
}
