'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export function ProgrammeFonctionne() {
  const t = useTranslations('ProgrammeFonctionne.points');
  const te = useTranslations('ProgrammeFonctionne');

  return (
    <section id="pourquoi" className="bg-white md:py-12">
      <div className="max-w-8xl mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-44">
        {/* Image Column */}
        <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-lg md:h-[30rem] xl:h-[38rem]">
          <Image
            src="/images/DJI_0070.png"
            alt="Pourquoi ce programme fonctionne"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Column */}
        <div className="space-y-6">
          <h2 className="block pt-6 text-center text-3xl font-medium text-gray-800 md:hidden md:pt-14 md:text-4xl">
            {te('title2')}
          </h2>
          <h2 className="hidden pt-6 text-3xl font-medium text-gray-800 md:block md:pt-14 md:text-4xl">
            {te('title2').toUpperCase()}
          </h2>
          <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-gray-600 md:text-lg">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const point = t(`${i}`);
              return <li key={i}>{point}</li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
