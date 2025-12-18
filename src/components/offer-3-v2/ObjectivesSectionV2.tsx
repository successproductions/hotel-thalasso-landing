'use client';

import { useTranslations } from 'next-intl';

export function ObjectivesSectionV2() {
  const t = useTranslations('ProgrammeFonctionne');

  // pull in your two arrays of points
  const card1 = t.raw('points1') as string[];
  const card2 = t.raw('points2') as string[];

  return (
    <section id="fonctionnement" className="bg-white py-6 md:py-6">
      <div className="mx-auto max-w-4xl px-0.5 md:px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl font-normal text-gray-800 md:text-4xl">
          {t('title').toUpperCase()}
        </h2>

        {/* Points from card1 */}
        <div className="md:mt-6 mt-3 space-y-1">
          {card1.map((text, i) => (
            <p key={i} className="text-base font-light leading-relaxed text-gray-600 md:text-lg">
              {text}
            </p>
          ))}
        </div>

        {/* Points from card2 */}
        <div className="mt-1 space-y-1">
          {card2.map((text, i) => (
            <p key={i} className="text-base font-light leading-relaxed text-gray-600 md:text-lg">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
