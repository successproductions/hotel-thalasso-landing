'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

export function HealthProgramsV2() {
  const t = useTranslations('healthProgram');
  return (
    <section id="about" className="bg-white pb-12">
      <div className="mx-auto max-w-4xl px-4 md:px-4 md:text-center">
        {/* Title */}
        <h2 className="text-[23px] font-normal text-gray-800 md:text-4xl">
          {t('title2').toUpperCase()}
        </h2>
        <p className="mt-4 text-[16px] font-extralight leading-relaxed text-gray-700 md:text-lg">
          {t('title3')}
        </p>
         <p className="text-[16px] font-extralight leading-relaxed text-gray-700 md:text-lg">
          {t('title7')}
        </p>
      </div>
    </section>
  );
}
