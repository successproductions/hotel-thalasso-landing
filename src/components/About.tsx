'use client'
import Image from "next/image";
import { useTranslations } from "next-intl";

export function About() {

  const t   = useTranslations('about');

  return (
    <section  className="  bg-white">
      <div className="mx-auto  grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Column */}
        <div className="space-y-4 px-4 md:px-28">
          <p className="text-sm uppercase tracking-widest font-light text-gray-500">
          {t('title')}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
         {t('description1')}
          </h2>
          <p className="text-gray-600 leading-relaxed font-normal text-base md:text-lg">
          {t('description2')}
          </p>
        </div>

        {/* Image Column */}
        <div className="relative w-full h-64 md:h-auto md:min-h-[60vh]">
          <Image
            src="https://shawellness.com/wp-content/uploads/2024/12/well-being.jpg"   
            alt="Illustration scientifique"
            fill
            className="object-cover"
          />
          
        </div>
      </div>
    </section>
  );
}
