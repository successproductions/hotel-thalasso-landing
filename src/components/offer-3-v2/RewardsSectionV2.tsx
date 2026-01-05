import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
const logos = [
  { id: 'tripadvisor', src: '/images/TripAdvisor.jpeg', alt: 'TripAdvisor' },
  { id: 'tripdotcom', src: '/images/trip.jpg', alt: 'Trip.com' },
  { id: 'spaAward', src: '/images/AWARDS.png', alt: 'SpaAward' },
  { id: 'kayakBadge', src: '/images/kayak-badge.png', alt: 'Kayak' },
];

export function RewardsSectionV2() {
    const t = useTranslations('rewards');
  return (
    <section id="rewards" className="bg-[#faf9f5] py-1 md:py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title - centered on desktop, shown at top */}
        <h2 className="pb-4 px-1 md:px-4 md:text-center text-[27px] font-normal uppercase md:text-4xl text-gray-800 md:pb-8">{t('title2')}</h2>

        {/* Images - 2x2 grid on mobile, single row on desktop */}
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:items-center md:justify-center md:gap-8">
          {logos.map((logo) => (
            <div key={logo.id} className="relative h-36 w-full md:h-36 md:w-72">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
        <p className="px-1 md:px-4 md:text-center text-[18px] mt-4 text-gray-800">{t('description')}</p>
      </div>
    </section>
  );
}
