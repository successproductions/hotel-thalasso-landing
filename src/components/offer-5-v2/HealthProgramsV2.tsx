'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

export function HealthProgramsV2() {
  const t = useTranslations('offer5.healthProgram');
  return (
    <section id="about" className="bg-white mb-4 md:pb-12">
      <div className="mx-auto max-w-4xl px-4 md:text-center">
        {/* Title */}
        <h2 className="text-[27px] font-normal text-gray-800 md:text-4xl">
          {t('title2').toUpperCase()}
        </h2>
        {/* Note */}
        <p className="mt-2 text-base  leading-snug font-light text-gray-600 md:text-base">
          {t('description1')}
        </p>
      </div>
    </section>
  );
}
