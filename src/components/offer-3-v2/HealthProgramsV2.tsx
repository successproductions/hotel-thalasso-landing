'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

export function HealthProgramsV2() {
  const t = useTranslations('healthProgram');
  return (
    <section id="about" className="bg-white pb-12">
      <div className="mx-auto max-w-4xl px-0.5 md:px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl font-medium text-gray-800 md:text-4xl">
          {t('title').toUpperCase()}
        </h2>
        <p className="mt-4 text-base font-light leading-relaxed text-gray-600 md:text-lg">
          {t('title2')}
        </p>
        {/* Note */}
        <p className="mt-2 text-sm font-light  leading-snug text-gray-500 md:text-base">
          {t('description1')}
        </p>
      </div>
    </section>
  );
}
