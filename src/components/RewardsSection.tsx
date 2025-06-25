"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";


const logos = [
  { id: 'tripadvisor', src: "/images/TripAdvisor.jpeg" },
  { id: 'tripdotcom', src: "/images/trip.jpg" },
  { id: 'spaAward', src: "/images/AWARDS.png" },
  { id: 'kayakBadge', src: "/images/kayak-badge.png" },
];

export default function RewardsSection() {
  const t = useTranslations('rewards');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="dark:bg-[#090b11] py-6 md:py-20 pb-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className={`text-2xl md:text-3xl font-trajan mb-6 md:mb-12 transition-opacity duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } text-gray-900 dark:text-white`}
        >
          {t('title')}
        </h2>

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-center transition-opacity duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="relative group flex items-center justify-center transition-transform duration-500 hover:scale-110"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-green-200/20 to-white/0 blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
              <Image
                src={logo.src}
                alt={t(`logos.${logo.id}.alt`)}
                width={140}
                height={70}
                className="object-contain md:mb-10 grayscale group-hover:grayscale-0 transition-all duration-700 drop-shadow-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}