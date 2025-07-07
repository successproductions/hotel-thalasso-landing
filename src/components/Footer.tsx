import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube  } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">DakhlaClub</h3>
          <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">
              <a href="">{t('footerNav.home')}</a>
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
              <a href="#awards">{t('support.Awards')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="">{t('support.terms')}</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">{t('column4')}</h3>
          <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">
              <a href="">{t('legal.privacy')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="">{t('legal.cookies')}</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="">{t('legal.sitemap')}</a>
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

        {/* Column 5: QR Code for PDF Download */}
        <div className="flex flex-col items-center md:justify-end space-y-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Scan to download our brochure</p>
            <div className="w-24 h-24 relative bg-white p-2 rounded-lg shadow-md">
            <Image
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://hotel-thalasso-landing-git-dev-successproductions-projects.vercel.app/brochure/BROCHURE_CH_NUMERIQUE_FR_compressed.pdf"
                alt="QR Code - Download Brochure"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Download Brochure</p>
          </div>
        </div>
      </div>

      {/* Divider + center logo */}
      <div className="border-t border-gray-300 relative">
        <div className="absolute inset-x-0 top-0 flex justify-center -mt-4">
          <div className="bg-gray-100 px-3">
            {/* Replace with your R logo */}
            <span className="text-2xl font-serif font-bold">DC</span>
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