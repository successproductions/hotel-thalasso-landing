'use client';

import React, { useState } from 'react';
import WavyText from './ui/WavyText';
import { useTranslations } from 'next-intl';
import ReservationPopup from './ReservationPopup';

export default function HeroTest() {
  const t = useTranslations('home');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section id="accueil" className="relative h-[70vh] w-screen overflow-hidden md:h-screen">
        {/* Background Video */}
        <video
          className="absolute inset-0 h-[57vh] w-full object-cover lg:h-[80vh] xl:h-[92vh]"
          src="/videos/DC-Thermes.mov"
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
          <h2 className="text-sm uppercase tracking-widest md:text-lg">
            <WavyText text={t('description')} />
          </h2>
        </div>

        {/* Bottom Info Panel - Just Button */}
        <div className="absolute bottom-12 left-1/2 z-20 w-[90%] -translate-x-1/2 transform md:w-auto lg:bottom-9 xl:bottom-8">
          <div className="rounded-lg bg-white/50 px-6 py-4 shadow-lg backdrop-blur-sm md:px-12 md:py-6">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="rounded-full bg-[#139584] px-8 py-3 text-center font-medium text-white transition hover:bg-[#d6bb8e] cursor-pointer hover:shadow-lg md:px-12 md:py-4 md:text-lg"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Popup */}
      <ReservationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
