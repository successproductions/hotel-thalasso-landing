"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';
import Image from "next/image";

const Footer = () => {
  const t = useTranslations('footer');
   

  return (
    <footer className="bg-[#0c1b11] text-white pt-32 mt-6 relative">
 
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/">
                        <Image
                          src="/images/LogoDakhla.png"
                          alt="DakhlaClub Logo"
                          width={180}
                          height={140}
                          className="mt-3"
                        />
                      </Link>
            <p className="text-sm text-gray-400">{t('brand.copy')}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact.title')}</h4>
            <p className="text-sm text-gray-400">
              {t('contact.address')}<br />
              {t('contact.phone')}<br />
              {t('contact.email')}
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('pages.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white">{t('pages.about')}</a></li>
              <li><a href="#services" className="hover:text-white">{t('pages.program')}</a></li>
              <li><a href="#contact" className="hover:text-white">{t('pages.book')}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('resources.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#faq" className="hover:text-white">{t('resources.faq')}</a></li>
              
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('socials.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://www.instagram.com/hoteldakhlaclub/" className="hover:text-white">{t('socials.instagram')}</a></li>
              <li><a href="https://www.facebook.com/DakhlaClub/" className="hover:text-white">{t('socials.facebook')}</a></li>
              <li><a href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY" className="hover:text-white">{t('socials.youtube')}</a></li>
              <li><a href="https://www.tiktok.com/@dakhlaclubhotel?_r=1&_d=eec80jahcl3m4g&sec_uid=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&share_author_id=7205863435829543941&sharer_language=fr&source=h5_m&u_code=e6ih6ce9mg3kj5&ug_btm=b8727,b0&social_share_type=4&utm_source=copy&sec_user_id=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&tt_from=copy&utm_medium=ios&utm_campaign=client_share&enable_checksum=1&user_id=7205863435829543941&share_link_id=080768DC-CD71-466C-B232-9A202D618A60&share_app_id=1233" className="hover:text-white">{t('socials.tiktok')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;