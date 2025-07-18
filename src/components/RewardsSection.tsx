// components/RewardsSection.tsx
import Image from "next/image";
import React from "react";

const logos = [
  { id: "tripadvisor", src: "/images/TripAdvisor.jpeg", alt: "TripAdvisor" },
  { id: "tripdotcom",  src: "/images/trip.jpg",           alt: "Trip.com"   },
  { id: "spaAward",    src: "/images/AWARDS.png",         alt: "SpaAward"   },
  { id: "kayakBadge",  src: "/images/kayak-badge.png",    alt: "Kayak"      },
];

export function RewardsSection() {
  const topLogos = logos.slice(0, 2);
  const bottomLogos = logos.slice(2);

  return (
    <section id="rewards" className="md:py-12 py-1 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">

          <h2 className=" block md:hidden text-4xl text-center pb-4 text-gray-800">Latest Awards</h2>

        {/* Top row (2 logos) */}
        <div className="flex justify-center items-center gap-4 md:gap-20 flex-wrap">
          {topLogos.map((logo) => (
            <div key={logo.id} className="w-72 h-36 relative">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Heading + divider */}
        <div className="hidden md:flex items-center ">
          <h2 className="text-3xl font-serif text-gray-800">Latest Awards</h2>
          <div className="flex-grow h-px bg-gray-300 ml-4" />
        </div>

        {/* Bottom row (2 logos) */}
        <div className="flex justify-center pt-4 md:pt-0 items-center gap-4 md:gap-20 flex-wrap">
          {bottomLogos.map((logo) => (
            <div key={logo.id} className="w-72 h-36 relative">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
