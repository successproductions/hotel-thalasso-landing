'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenReservation() {
  const t = useTranslations('halloween');
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: 'MA',
    phoneNumber: '',
    checkIn: '2025-10-30',
    checkOut: '2025-11-02',
    guests: '2',
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/halloween-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert(t('reservation.successMessage') || 'Merci pour votre réservation Halloween ! Nous vous contactons sous peu.');
        setFormData({
          name: '',
          email: '',
          countryCode: 'MA',
          phoneNumber: '',
          checkIn: '2025-10-30',
          checkOut: '2025-11-02',
          guests: '2',
        });
      } else {
        alert('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="reservation-form"
      className="py-6 bg-white relative overflow-hidden"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-transparent bg-clip-text"
                style={{
                  fontFamily: 'var(--font-creepster)',
                  background: 'linear-gradient(to right, #5ea7aa, #a0d2de, #5ea7aa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              {t('reservation.title')}
            </h2>
            <p className="text-xl text-gray-700" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
              {t('reservation.subtitle')}
            </p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="border-2 rounded-3xl p-8 md:p-12 shadow-xl"
            style={{
              backgroundColor: 'rgba(132, 187, 202, 0.05)',
              borderColor: '#5ea7aa'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-800  mb-2" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
                  {t('reservation.form.fullName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border text-gray-800 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: 'rgba(132, 187, 202, 0.3)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#5ea7aa';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(132, 187, 202, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  placeholder={t('reservation.form.namePlaceholder')}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-800  mb-2" style={{ fontFamily: 'Futura' }}>
                  {t('reservation.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border text-gray-800 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: 'rgba(132, 187, 202, 0.3)' }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = '#5ea7aa';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(132, 187, 202, 0.2)';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  placeholder={t('reservation.form.emailPlaceholder')}
                />
              </div>

              {/* Phone - Split into two inputs */}
              <div >
                <label className="block text-gray-800  mb-2" style={{ fontFamily: 'Futura' }}>
                  {t('reservation.form.phone')}
                </label>
                <div className="flex gap-3">
                  {/* Country Code Dropdown */}
                  <div className="w-32 flex-shrink-0">
                    <select
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 rounded-xl bg-white border text-gray-800 focus:outline-none focus:ring-2 transition-all appearance-none"
                      style={{ borderColor: 'rgba(132, 187, 202, 0.3)', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                      onFocus={(e: React.FocusEvent<HTMLSelectElement>) => {
                        e.currentTarget.style.borderColor = '#5ea7aa';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(132, 187, 202, 0.2)';
                      }}
                      onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {
                        e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
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
                  {/* Phone Number */}
                  <div className="flex-1">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border text-gray-800 focus:outline-none focus:ring-2 transition-all"
                      style={{ borderColor: 'rgba(132, 187, 202, 0.3)' }}
                      onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.currentTarget.style.borderColor = '#5ea7aa';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(132, 187, 202, 0.2)';
                      }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder={t('reservation.form.phoneNumberPlaceholder')}
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-gray-800  mb-2" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
                  {t('reservation.form.guests')}
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border text-gray-800 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: 'rgba(132, 187, 202, 0.3)' }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = '#5ea7aa';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(132, 187, 202, 0.2)';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? t('reservation.form.person') : t('reservation.form.people')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in */}
              <div>
                <label htmlFor="checkIn" className="block text-gray-800  mb-2" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
                  {t('reservation.form.checkIn')}
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min="2025-10-30"
                  max="2025-10-31"
                  className="w-full px-4 py-3 rounded-xl bg-white border text-gray-800 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: 'rgba(132, 187, 202, 0.3)' }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = '#5ea7aa';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(132, 187, 202, 0.2)';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Check-out */}
              <div>
                <label htmlFor="checkOut" className="block text-gray-800  mb-2" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
                  {t('reservation.form.checkOut')}
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min="2025-11-01"
                  max="2025-11-02"
                  className="w-full px-4 py-3 rounded-xl bg-white border text-gray-800 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: 'rgba(132, 187, 202, 0.3)' }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = '#5ea7aa';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(132, 187, 202, 0.2)';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
                    e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white font-normal text-xl py-4 rounded-xl shadow-2xl transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2"
              style={{
                fontFamily: 'var(--font-creepster)',
                background: 'linear-gradient(to right, #5ea7aa, #a0d2de)',
                borderColor: '#a0d2de'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.background = 'linear-gradient(to right, #6ba3b3, #5ea7aa)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(to right, #5ea7aa, #a0d2de)';
              }}
            >
              {isSubmitting ? t('reservation.buttonSending') : t('reservation.button')}
            </button>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#5ea7aa' }}>✓</div>
                <span>{t('reservation.trust.secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#5ea7aa' }}>☎</div>
                <span>{t('reservation.trust.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#5ea7aa' }}>✓</div>
                <span>{t('reservation.trust.instant')}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
