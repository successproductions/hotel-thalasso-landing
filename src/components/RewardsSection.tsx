"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const logos = [
  { src: "/images/TripAdvisor.jpeg", alt: "TripAdvisor" },
  { src: "/images/trip.jpg", alt: "Trip.com" },
  { src: "/images/AWARDS.png", alt: "Spa Award" },
  { src: "/images/kayak-badge.png", alt: "Kayak badge" },
];

export default function RewardsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className=" dark:bg-[#090b11] py-20 pb-32">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          className={`text-3xl md:text-4xl font-serif mb-12 transition-opacity duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } text-gray-900 dark:text-white`}
        >
          ​NOUS AVONS ÉTÉ PRIMÉS PAR
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
                alt={logo.alt}
                width={140}
                height={70}
                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700 drop-shadow-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
