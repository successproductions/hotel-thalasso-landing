// components/RewardsSection.tsx
import Image from 'next/image';
import React from 'react';

const logos = [
  { id: 'tripadvisor', src: '/images/TripAdvisor.jpeg', alt: 'TripAdvisor' },
  { id: 'tripdotcom', src: '/images/trip.jpg', alt: 'Trip.com' },
  { id: 'spaAward', src: '/images/AWARDS.png', alt: 'SpaAward' },
  { id: 'kayakBadge', src: '/images/kayak-badge.png', alt: 'Kayak' },
];

export function RewardsSection() {
  const topLogos = logos.slice(0, 2);
  const bottomLogos = logos.slice(2);

  return (
    <section id="rewards" className="bg-gray-50 py-1 md:py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="block pb-4 text-center text-4xl text-gray-800 md:hidden">Latest Awards</h2>

        {/* Top row (2 logos) */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-20">
          {topLogos.map((logo) => (
            <div key={logo.id} className="relative h-36 w-72">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>

        {/* Heading + divider */}
        <div className="hidden items-center md:flex">
          <h2 className="font-serif text-3xl text-gray-800">Latest Awards</h2>
          <div className="ml-4 h-px flex-grow bg-gray-300" />
        </div>

        {/* Bottom row (2 logos) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 md:gap-20 md:pt-0">
          {bottomLogos.map((logo) => (
            <div key={logo.id} className="relative h-36 w-72">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
