'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ObjectivesSection5() {
  const t = useTranslations('offer5.ProgrammeFonctionne');

  const images = [
    {
      image: "/images/cure-detox-maroc5.jpg",
      alt: "spa entre désert et océan",
    },
    {
      image: "/images/sejour-bien-etre-dakhla5.jpg", 
      alt: "retraite spirituelle Maroc",
    },
  ]
  
  // pull in your two arrays of points
  const card1 = t.raw('points1') as string[];
  const card2 = t.raw('points2') as string[];

  return (
    <section id="fonctionnement" className="md:pt-6 py-2 pb-4 bg-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl text-gray-800 font-medium my-6 md:mb-8">
          {t('title').toUpperCase()}
        </h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[card1, card2].map((points, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image with error handling and fallback */}
              <div className="h-48 w-full relative bg-gray-200">
                <Image
                  src={images[idx].image}
                  alt={images[idx].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  onError={(e) => {
                    console.error('Image failed to load:', images[idx].image);
                    // Fallback to a placeholder or hide the image
                    e.currentTarget.style.display = 'none';
                  }}
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