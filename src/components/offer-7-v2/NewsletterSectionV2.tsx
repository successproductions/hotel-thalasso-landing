'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ReservationPopupV7 from './ReservationPopupV7';

export function NewsletterSectionV2() {
  const t = useTranslations('offer7.exclusiveOffer');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="relative h-[400px] bg-cover bg-center md:h-[500px]"
        style={{ backgroundImage: `url("/images/IMG_2150 (1).png")` }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-4 text-center">
          {/* Title */}
          <h2 className="font-serif text-[27px] text-white md:text-4xl">{t('title').toUpperCase()}</h2>

          {/* Description */}
          <p className="font-trajan text-sm uppercase tracking-wide text-white/80 md:text-base">
            {t('description')}
          </p>

          {/* Button opens popup */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              className="rounded-sm"
              onClick={() => setIsPopupOpen(true)}
              style={{
                padding: '12px 15px',
                background: '#14b8a6',
                color: '#fff',
                fontSize: '1.325rem',
                fontWeight: 400,
                borderRadius: '2px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(20,184,166,0.15)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {t('callButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Popup */}
      <ReservationPopupV7 isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
