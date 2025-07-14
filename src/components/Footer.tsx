// src/components/Footer.tsx - ENHANCED with more internal links
'use client'
import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube  } from "lucide-react";
import { useTranslations , useLocale} from "next-intl";

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale();

  const brochureUrl = locale === 'en' 
    ? 'https://offer.dakhlaclub.com/brochure/BROCHURE-EN.pdf'
    : 'https://offer.dakhlaclub.com/brochure/BROCHURE_CH_NUMERIQUE_FR_compressed.pdf';
  
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1 - ENHANCED with more internal links */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">DakhlaClub</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">
              <a href="#accueil">{t('footerNav.home')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#about">{t('footerNav.about')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#services">{t('footerNav.services')}</a>
            </li>
            {/* ADDED: More internal links */}
            <li className="hover:underline cursor-pointer">
              <a href="#services">Programme détaillé</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#pourquoi">Pourquoi ce programme</a>
            </li>
          </ul>
        </div>

        {/* Column 2 - ENHANCED with more internal links */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">{t('column2')}</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">
              <a href="#faq">{t('support.faq')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#rewards">Récompenses</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#contact">Contact</a>
            </li>
            {/* ADDED: More internal links */}
            <li className="hover:underline cursor-pointer">
              <a href="#fonctionnement">Comment ça marche</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#services">Tableau des services</a>
            </li>
          </ul>
        </div>

        {/* Column 3 - ENHANCED with more internal links */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">{t('column4')}</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">
              <a href="/terms" rel="nofollow">{t('legal.privacy')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="/terms" rel="nofollow">{t('legal.cookies')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="/terms" rel="nofollow">{t('legal.sitemap')}</a>
            </li>
            {/* ADDED: More internal navigation */}
            <li className="hover:underline cursor-pointer">
              <a href="#about">Qui sommes-nous</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#contact">Réservation</a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com/DCthermes" aria-label="Facebook" className="hover:text-gray-900" rel="noopener noreferrer" target="_blank">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com/DCthermes" aria-label="Instagram" className="hover:text-gray-900" rel="noopener noreferrer" target="_blank">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com/DCthermes" aria-label="Youtube" className="hover:text-gray-900" rel="noopener noreferrer" target="_blank">
            <Youtube />
            </a>
          </div>
          
          {/* ADDED: Internal quick links */}
          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase mb-2">Liens rapides</h4>
            <div className="space-y-1">
              <a href="#accueil" className="block text-xs hover:underline">Retour en haut</a>
              <a href="#contact" className="block text-xs hover:underline">Réserver maintenant</a>
              <a href="#faq" className="block text-xs hover:underline">Questions fréquentes</a>
            </div>
          </div>
        </div>

        {/* Column 5 - QR Code */}
        <div className="flex flex-col items-center md:justify-end space-y-4">
          <div className="text-center mr-auto md:mx-auto">
            <p className="text-xs text-gray-600 mb-2">
              {t('scanBrochure')} 
            </p>
            <div
              className="
                 w-32        
                 sm:w-28     
                md:w-24     
                 aspect-square  
                 relative
                 bg-white
                 rounded-lg
                 shadow-md
                 overflow-hidden
               "
             >
               <Image
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(brochureUrl)}`}
                 alt={t('qrAlt')} 
                 fill
                 className="object-cover p-1"
               />
             </div>
           </div>
         </div>
      </div>

      {/* ENHANCED: Internal linking section */}
      <div className="border-t border-gray-300 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <a href="#accueil" className="hover:underline">Accueil</a>
            <span>•</span>
            <a href="#about" className="hover:underline">À propos</a>
            <span>•</span>
            <a href="#services" className="hover:underline">Programme</a>
            <span>•</span>
            <a href="#pourquoi" className="hover:underline">Pourquoi choisir</a>
            <span>•</span>
            <a href="#fonctionnement" className="hover:underline">Comment ça marche</a>
            <span>•</span>
            <a href="#faq" className="hover:underline">FAQ</a>
            <span>•</span>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </div>

      {/* Divider + center logo */}
      <div className="border-t border-gray-300 relative">
        <div className="absolute inset-x-0 top-0 flex justify-center -mt-4">
          <div className="bg-gray-100 px-3">
            <Image
              src="/images/LogoDakhla.png"
              alt="Dakhla Club Logo"
              width={78}
              height={28}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-6 text-sm text-gray-600">
        © 2025 DakhlaClub and its Associated Subsidiaries | Luxury Fitness, Health & Wellness Vacation Retreat
      </div>
    </footer>
  );
}