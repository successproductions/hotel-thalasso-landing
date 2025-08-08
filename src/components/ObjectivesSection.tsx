'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ObjectivesSection() {
  const t = useTranslations('ProgrammeFonctionne');

  const images = [
    {
      image: '/images/sejour-bien-etre-dakhla5.jpg',
      alt: 'spa entre désert et océan',
    },
    {
      image: '/images/sejour-bien-etre-dakhla.jpg',
      alt: 'retraite spirituelle Maroc',
    },
  ];

  // pull in your two arrays of points
  const card1 = t.raw('points1') as string[];
  const card2 = t.raw('points2') as string[];

  return (
    <section id="fonctionnement" className="bg-white py-2 pb-4 md:pt-6">
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Section title */}
        <h2 className="my-6 text-3xl font-medium text-gray-800 md:mb-8 md:text-4xl">
          {t('title').toUpperCase()}
        </h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[card1, card2].map((points, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg bg-white shadow-lg">
              {/* Image with error handling and fallback */}
              <div className="relative h-48 w-full bg-gray-200">
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

              <div className="space-y-3 p-6">
                {points.map((text, i) => (
                  <p key={i} className="p-0 text-gray-700">
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
