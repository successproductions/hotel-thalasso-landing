'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export function ProgrammeFonctionne() {
  const t = useTranslations('ProgrammeFonctionne.points')
  const te = useTranslations('ProgrammeFonctionne')

 

  return (
    <section id="pourquoi" className="md:py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-44 ">
        {/* Image Column */}
        <div className="w-full h-64 md:h-[48rem] relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/DJI_0070.png"    
            alt="Pourquoi ce programme fonctionne"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Column */}
        <div className="space-y-6">
          <h2 className="  block md:hidden text-3xl md:text-4xl pt-6 md:pt-14 text-center font-medium text-gray-800">
          {te('title2')}
          </h2>
          <h2 className="text-3xl hidden md:block  md:text-4xl pt-6 md:pt-14  font-medium text-gray-800">
          {te('title2')}
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600 text-base md:text-lg leading-relaxed">
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
