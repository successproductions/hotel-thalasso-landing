import { useTranslations } from "next-intl";
import React from "react";

export function HealthPrograms() {
  const t   = useTranslations('health');
  return (
    <section id="programs" className="py-16 bg-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold  text-gray-800">
        {t('title')}
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-base md:text-lg font-light leading-relaxed">
         {t('description1')}
        </p>

        {/* Note */}
        <p className="mt-2 text-gray-500 text-sm md:text-base font-light italic leading-snug">
        {t('description2')}
        </p>
      </div>
    </section>
  );
}
