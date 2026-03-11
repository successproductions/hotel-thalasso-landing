'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';
import Image from 'next/image';

interface EvasionPackSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EvasionPackSelectionPopup({ isOpen, onClose }: EvasionPackSelectionPopupProps) {
  const locale = useLocale();

  if (!isOpen) return null;

  const packs = [
    {
      id: 'vitalite',
      title: locale === 'fr' ? 'THALASSO VITALITÉ (3 Jours)' : 'ESCAPE VITALITY (3 Nights)',
      slug: 'vitalite',
      image: '/images/offer-5/DSC02450.jpg',
    },
    {
      id: 'regeneration',
      title: locale === 'fr' ? 'THALASSO RÉGÉNÉRATION (5 Jours)' : 'ESCAPE REGENERATION (5 Nights)',
      slug: 'regeneration',
      image: '/images/offer-5/DSC09159.jpg',
    },
    {
      id: 'renaissance',
      title: locale === 'fr' ? 'THALASSO RENAISSANCE (7 Jours)' : 'ESCAPE RENAISSANCE (7 Nights)',
      slug: 'renaissance',
      image: '/images/offer-3/dji7.jpg',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto overflow-x-hidden rounded-sm bg-[#fcfbf9] shadow-2xl p-6 md:p-10 animate-in zoom-in-95 duration-300 border border-gray-100 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 md:mb-10 mt-2 flex-shrink-0">
          <h2 className="text-2xl md:text-4xl font-normal text-gray-900 mb-2 md:mb-4" style={{ fontFamily: 'serif' }}>
            {locale === 'fr' ? 'Choisissez votre Programme' : 'Select your Program'}
          </h2>
          <p className="text-sm md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
            {locale === 'fr' 
              ? "Plongez dans l'univers de nos cures holistiques et trouvez le parcours qui répond à vos besoins." 
              : "Immerse yourself in our holistic escapes and find the journey that meets your needs."}
          </p>
        </div>

        {/* Pack Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-grow">
          {packs.map((pack) => (
            <a
              key={pack.id}
              href={`/${locale}/${pack.slug}`}
              className="group relative flex h-[160px] sm:h-[200px] md:h-80 w-full overflow-hidden rounded-sm border border-gray-200 shadow-md transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl hover:border-[#d6bb8e]"
            >
              {/* Background Image */}
              <Image
                src={pack.image}
                alt={pack.title}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />

              {/* Default Light Gradient (bottom part readable if there was text, but here mostly for aesthetics) */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />

              {/* Heavy Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/60" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center text-white">
                {/* Title drifting up and fading in */}
                <h3 
                  className="translate-y-4 md:translate-y-6 opacity-0 text-[15px] sm:text-lg md:text-xl font-medium tracking-wider uppercase transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {pack.title}
                </h3>
                
                {/* Small indicator line */}
                <span className="mt-4 h-0.5 w-0 bg-[#d6bb8e] transition-all duration-500 ease-out group-hover:w-16" />
                
                {/* Action Text */}
                <span className="mt-2 md:mt-4 translate-y-2 md:translate-y-4 opacity-0 text-[10px] md:text-sm font-light tracking-widest transition-all duration-500 delay-100 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {locale === 'fr' ? 'DÉCOUVRIR LE PACK' : 'DISCOVER PACKAGE'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
