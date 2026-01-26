'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import ReservationPopup from './ReservationPopup';

export function NewsletterSectionV2() {
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
          <h2 className="font-serif text-[23px] text-white md:text-4xl">{t('title')}</h2>

          {/* Description */}
          <p className="text-sm uppercase tracking-wide text-white/80 md:text-base">
            {t('description')}
          </p>

          {/* Just the button, opens popup */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
            className="rounded-sm md:text-[18px] text-[16px] bg-white border border-black font-medium hover:bg-gray-50 px-4 py-3  text-black hover:text-gray-900 transition cursor-pointer hover:shadow-lg"
              onClick={() => setIsPopupOpen(true)}
              style={{
                padding: '12px 15px',
                
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(20,184,166,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
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
