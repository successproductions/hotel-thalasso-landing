"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';

import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { SiTiktok } from "react-icons/si";

const Footer5 = () => {
  const t = useTranslations('footer');


  return (
    <footer className="relative  overflow-hidden">
      {/* Floating CTA Card */}
      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 max-w-4xl z-10">

      </div>

      {/* Main Footer */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-4 space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/LogoDakhla.png"
                  alt="DakhlaClub Logo"
                  width={160}
                  height={120}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <p className="text-gray-300 leading-relaxed max-w-sm">
                {t('brand.copy')}
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/hoteldakhlaclub/" 
                  className="group w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.facebook.com/DakhlaClub/" 
                  className="group w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY" 
                  className="group w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.tiktok.com/@dakhlaclubhotel?_r=1&_d=eec80jahcl3m4g&sec_uid=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&share_author_id=7205863435829543941&sharer_language=fr&source=h5_m&u_code=e6ih6ce9mg3kj5&ug_btm=b8727,b0&social_share_type=4&utm_source=copy&sec_user_id=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&tt_from=copy&utm_medium=ios&utm_campaign=client_share&enable_checksum=1&user_id=7205863435829543941&share_link_id=080768DC-CD71-466C-B232-9A202D618A60&share_app_id=1233" 
                  className="group w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiTiktok className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-xl font-semibold text-white mb-4 relative">
                {t('contact.title')}
                <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full"></div>
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {t('contact.address')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-gray-300 text-sm">
                    {t('contact.phone')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-gray-300 text-sm">
                    {t('contact.email')}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-2 space-y-6">
              <h4 className="text-xl font-semibold text-white mb-4 relative">
                {t('pages.title')}
                <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#about" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {t('pages.about')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#services" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {t('pages.program')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {t('pages.book')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-xl font-semibold text-white mb-4 relative">
                {t('resources.title')}
                <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#faq" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {t('resources.faq')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 Dakhla Club. Tous droits réservés.
              </p>
              
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-500/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </footer>
  );
};

export default Footer5;