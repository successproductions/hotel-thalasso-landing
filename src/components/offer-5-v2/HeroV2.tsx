'use client';

import React, { useState } from 'react';
import WavyText from '../ui/WavyText';
import { useTranslations } from 'next-intl';
import ReservationPopupV5 from './ReservationPopupV5';

export default function HeroV2() {
  const t = useTranslations('offer5.home');
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
        <div className="relative z-20 flex h-full flex-col items-center justify-center space-y-4 px-4 pb-12 text-center text-white md:pb-0">
          {/* Line 1: big italic serif */}
          <h1 className="text-2xl font-normal md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="hidden md:block">
              <WavyText text={t('title')} />
            </span>
            <span className="block md:hidden">
              <WavyText text={t('title2')} />
            </span>
          </h1>

          {/* Line 2: uppercase tracking-wide */}
          <h2 className="text-xs uppercase tracking-widest md:text-lg">
            <span className="hidden md:block">
              <WavyText text={t('description')} />
            </span>
            <span className="block md:hidden">
              <WavyText text={t('description2')} />
            </span>
          </h2>
        </div>

        {/* Bottom Info Panel - Just Button */}
        <div className="absolute bottom-1 left-1/2 z-20 w-[90%] -translate-x-1/2 transform md:w-auto lg:bottom-9 xl:bottom-8">
          <div className="py-4 md:px-12 md:py-6">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="w-full rounded-sm bg-[#d6bb8e] px-4 py-3 text-center font-medium text-white transition hover:bg-[#139584] cursor-pointer hover:shadow-lg md:w-auto md:px-12 md:py-4 md:text-lg"
            >
              {t('callButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Popup */}
      <ReservationPopupV5 isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
