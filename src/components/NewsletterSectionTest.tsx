'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PaymentPopupV3 from './offer-3-v2/PaymentPopupV3';
import ReservationPopup from './ReservationPopup';

export function NewsletterSectionTest() {
  const t = useTranslations('exclusiveOffer');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="relative h-[400px] bg-cover bg-center md:h-[500px]"
        style={{ backgroundImage: `url("/images/Piscine_thermale.png")` }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-4 text-center">
          {/* Title */}
          <h2 className="font-serif text-3xl text-white md:text-4xl">{t('title')}</h2>

          {/* Description */}
          <p className="text-sm uppercase tracking-wide text-white/80 md:text-base">
            {t('description')}
          </p>

          {/* Just the button, opens popup */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => setIsPopupOpen(true)}
              style={{
                padding: '12px 32px',
                background: '#14b8a6',
                color: '#fff',
                fontSize: '1.325rem',
                fontWeight: 400,
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(20,184,166,0.15)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0d9488';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#14b8a6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {t('callButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Popup */}
      <ReservationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
