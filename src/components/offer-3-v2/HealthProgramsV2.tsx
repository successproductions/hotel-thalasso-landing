'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

export function HealthProgramsV2() {
  const t = useTranslations('healthProgram');
  return (
    <section id="about" className="bg-white pb-12">
      <div className="mx-auto max-w-4xl px-0.5 md:px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl font-normal text-gray-800 md:text-4xl">
          {t('title').toUpperCase()}
        </h2>
        <p className="mt-4 text-base font-normal leading-relaxed text-gray-900 md:text-lg">
          {t('title3')}
        </p>
        {/* Note */}
        {/* <p className="mt-2 text-sm font-normal  leading-snug text-gray-900 md:text-lg">
          {t('description1')}
        </p> */}
      </div>
    </section>
  );
}
