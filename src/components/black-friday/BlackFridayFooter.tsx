'use client';

import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BlackFridayFooter() {
  const t = useTranslations('blackFriday.footer');

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bf-turquoise via-bf-sand to-bf-turquoise"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Branding & Description */}
          <div className="text-center md:text-left">
            <div className="relative w-32 h-20 mx-auto">
              <Image
                src="/images/LogoDakhla.png"
                alt="Dakhla Club Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <p className="text-gray-300 text-sm text-center leading-relaxed md:mb-4">
              {t('description')}
            </p>
            
          </div>

          {/* Column 2: Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-medium mb-4 text-bf-sand">
              {t('contactTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+212661807293"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-bf-turquoise transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-bf-turquoise/10 flex items-center justify-center group-hover:bg-bf-turquoise/20 transition-colors">
                    <Phone size={18} className="text-bf-turquoise" />
                  </div>
                  <span>+212 661-807293</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:reservation@dakhlaclub.com"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-bf-turquoise transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-bf-turquoise/10 flex items-center justify-center group-hover:bg-bf-turquoise/20 transition-colors">
                    <Mail size={18} className="text-bf-turquoise" />
                  </div>
                  <span>reservation@dakhlaclub.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-medium mb-4 text-bf-sand">
              {t('followTitle')}
            </h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.facebook.com/DakhlaClub/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-12 h-12 rounded-full bg-bf-turquoise/10 border border-bf-turquoise/30 flex items-center justify-center hover:bg-bf-turquoise hover:border-bf-turquoise transition-all group"
              >
                <Facebook size={20} className="text-bf-turquoise group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/hoteldakhlaclub/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full bg-bf-turquoise/10 border border-bf-turquoise/30 flex items-center justify-center hover:bg-bf-turquoise hover:border-bf-turquoise transition-all group"
              >
                <Instagram size={20} className="text-bf-turquoise group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="w-12 h-12 rounded-full bg-bf-turquoise/10 border border-bf-turquoise/30 flex items-center justify-center hover:bg-bf-turquoise hover:border-bf-turquoise transition-all group"
              >
                <Youtube size={20} className="text-bf-turquoise group-hover:text-white transition-colors" />
              </a>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-bf-turquoise/30 to-transparent"></div>

        {/* Bottom Bar */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {t('copyright')}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {t('specialEvent')}
          </p>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-bf-sand/20"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-bf-sand/20"></div>
    </footer>
  );
}
