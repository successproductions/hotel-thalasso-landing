'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import BlackFridayReservationModal from './BlackFridayReservationModal';

gsap.registerPlugin(ScrollTrigger);

export default function BlackFridayUrgency() {
  const t = useTranslations('blackFriday.urgency');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="reservation"
        ref={sectionRef}
        className="relative py-8 md:py-18 bg-white"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #5ba6a9 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#5ba6a9]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d7c9ad]/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Content */}
            <div ref={contentRef} className="space-y-2 text-center md:space-y-8">
              {/* Badge */}
              {/* <div className="inline-block">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full
                              font-bold text-sm md:text-base shadow-2xl border-2 border-red-400 animate-pulse">
                  {t('badge')}
                </div>
              </div> */}

              {/* Title */}
              <h2 className="text-2xl md:text-4xl uppercase lg:text-5xl font-normal text-[#5ba6a9] leading-tight">
                {t('title')}
              </h2>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl  text-[#d7c9ad] font-normal">
                {t('subtitle')}
              </p>

              {/* Warning */}
              <p className="text-sm md:text-xl text-gray-600 leading-relaxed">
                {t('warning')}
              </p>



              {/* CTA Buttons */}
              <div className="flex flex-col  gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex-1 px-4 py-4 bg-[#5ba6a9] uppercase text-white text-xl font-medium
                          transition-all duration-300 transform hover:scale-105
                           shadow-2xl hover:bg-[#d7c9ad] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t('cta1')}</span>
                </button>

                <a
                  href="https://direct-book.com/properties/DakhlaClubDIRECT?locale=fr&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&items[0][rateId]=694496&_gl=1*cvqln3*_ga*ODc5NTg4MDQwLjE3NjQyNTcyMzE.*_ga_WJT53Y3H61*czE3NjQyNTcyMzEkbzEkZzAkdDE3NjQyNTcyMzEkajYwJGwwJGgw*_ga_6WNV2FHXCM*czE3NjQyNTcyMzEkbzEkZzAkdDE3NjQyNTcyMzEkajYwJGwwJGgw&currency=MAD&checkInDate=2025-11-27&checkOutDate=2025-11-29&trackPage=yes&selected=0&promocode=BLACKFRIDAYDC2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 px-4 py-4 bg-[#d7c9ad] uppercase text-white text-xl font-medium
                          transition-all duration-300 transform hover:scale-105
                           shadow-2xl hover:bg-[#5ba6a9] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t('cta2')}</span>
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div ref={imageRef} className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto lg:max-w-none">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#5ba6a9] to-[#d7c9ad] rounded-3xl opacity-20 blur-xl" />

                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/8.jpg"
                    alt="Black Friday Dakhla Club"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Corner Accents */}
                <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-[#5ba6a9] rounded-tl-3xl" />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-[#d7c9ad] rounded-br-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      <BlackFridayReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
