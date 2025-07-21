
'use client'
import { useTranslations } from "next-intl";
import React from "react";

export function HealthPrograms5() {
  const t   = useTranslations('offer5.healthProgram')
  return (
    <section  id="about"  className="pb-12 bg-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-medium  text-gray-800">
        {t('title').toUpperCase()}
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg font-light leading-relaxed">
         {t('title2')}
        </p>
        {/* Note */}
        <p className="mt-2 text-gray-500 text-sm md:text-base font-light italic leading-snug">
        {t('description1')}
        </p>
      </div>
    </section>
  );
}
