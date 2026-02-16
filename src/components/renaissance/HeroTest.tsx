'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BookingFormPopup from './BookingFormPopup';

export default function HeroTest() {
  const t = useTranslations('home');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section id="accueil" className="relative h-[65vh] w-screen overflow-hidden md:h-screen">
        {/* Background Video */}
        <video
          className="absolute inset-0 h-[58vh] w-full object-cover lg:h-[80vh] xl:h-[92vh]"
          src="/videos/VIDEO_LANDING_PAGE_5.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0" />

        {/* animated two-line headline */}
        {/* <div className="relative z-20 flex h-full flex-col items-center justify-center space-y-4 md:px-4 pb-0 text-center text-white md:pb-0">
          <h1 className="text-[26px] font-normal md:text-4xl lg:text-5xl xl:text-[52px]">
            <span className="hidden md:block">
              <WavyText text={t('title')} />
            </span>
            <span className="block md:hidden">
              <WavyText text={t('title2')} />
            </span>
          </h1>

          <h2 className="w-full max-w-full overflow-hidden  whitespace-normal break-words text-sm  tracking-wide md:px-0 md:tracking-widest md:text-lg">
            <WavyText text={t('description')} />
          </h2>
        </div> */}

        {/* Bottom Info Panel - Just Button */}
        <div className="absolute bottom-1 left-1/2 z-20 w-[93%] -translate-x-1/2 transform md:w-auto lg:bottom-9 xl:bottom-8">
          <div className="py-4 px-7 md:px-12 md:py-6">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="w-full bg-white border border-black px-1.5 py-3 text-center font-medium text-black transition hover:bg-gray-50 hover:text-gray-900 cursor-pointer hover:shadow-lg md:w-auto md:px-6 md:py-4 md:text-lg"
            >
           {t('ctaText')}
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Popup */}
      <BookingFormPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
