'use client'
import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube  } from "lucide-react";
import { useTranslations , useLocale} from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale();

  const brochureUrl = locale === 'en' 
    ? 'https://offer.dakhlaclub.com/brochure/BROCHURE-EN.pdf'
    : 'https://offer.dakhlaclub.com/brochure/BROCHURE_CH_NUMERIQUE_FR_compressed.pdf';
  
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">DakhlaClub</h3>
          <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">
              <a href="#">{t('footerNav.home')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#about">{t('footerNav.about')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="#services">{t('footerNav.services')}</a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">{t('column2')}</h3>
          <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">
              <a href="#faq">{t('support.faq')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="mailto:reservation@dakhlaclub.com">reservation@dakhlaclub.com</a>
            </li>
            <li className="hover:underline font-trajan cursor-pointer">
              <a href="tel:+21265288192">+212 6652881921</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">{t('column4')}</h3>
          <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">
  <Link href="/legal/privacy">{t('legal.privacy')}</Link>
</li>
<li className="hover:underline cursor-pointer">
  <Link href="/legal/cookies">{t('legal.cookies')}</Link>
</li>
<li className="hover:underline cursor-pointer">
  <Link href="/legal/cgv">{t('legal.sitemap')}</Link>
</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com/DCthermes" aria-label="Facebook" className="hover:text-gray-900">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com/DCthermes" aria-label="Instagram" className="hover:text-gray-900">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com/DCthermes" aria-label="Youtube" className="hover:text-gray-900">
            <Youtube />
            </a>
            
          </div>
        </div>

       
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

      {/* Divider + center logo */}
      <div className="border-t border-gray-300 relative">
        <div className="absolute inset-x-0 top-0 flex justify-center -mt-4">
          <div className="bg-gray-100 px-3">
            {/* Replace with your R logo */}
            <Image
              src="/images/LogoDakhla.png"
              alt="Dakhla Club Logo"
              width={78}
              height={228}
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