'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ObjectivesSection() {
  const t = useTranslations('ProgrammeFonctionne');

  const images = [
    {
      image: "/images/cure-detox-maroc.jpg",
      alt: "spa entre désert et océan",
    },
    {
      image: "/images/sejour-bien-etre-dakhla.jpg", 
      alt: "retraite spirituelle Maroc",
    },
  ]
  
  // pull in your two arrays of points
  const card1 = t.raw('points1') as string[];
  const card2 = t.raw('points2') as string[];

  return (
    <section id="fonctionnement" className="md:py-6 py-2 bg-white">
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
                {/* Fallback content in case image fails */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-2 bg-teal-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-teal-700 font-medium">{images[idx].alt}</p>
                  </div>
                </div>
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