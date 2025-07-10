


'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ObjectivesSection() {
  const t = useTranslations('ProgrammeFonctionne');

  const images = [
    {
      image: "/images/cure-détox-Maroc.jpeg",
      alt: "spa entre désert et océan",
    },
    {
      image: "/images/séjour-bien-être Dakhla.jpeg", 
      alt: "retraite spirituelle Maroc",
    },
  ]
  // pull in your two arrays of points
  const card1 = t.raw('points1') as string[];
  const card2 = t.raw('points2') as string[];

  return (
    <section id="fonctionnement" className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl text-gray-800 font-medium mb-12">
          {t('title')}
        </h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[card1, card2].map((points, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* replace these with your actual images or remove entirely */}
              <div className="h-48 w-full relative">
                <Image
                  src={images[idx].image}
                  alt={images[idx].alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                {points.map((text, i) => (
                  <p key={i} className="text-gray-700 p-0">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
