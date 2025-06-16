"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#0c1b11] text-white pt-32 mt-6 relative">
      {/* CTA Banner */}
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-cover bg-center bg-black/40 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 md:p-10 text-center space-y-4 backdrop-blur-sm bg-black/30">
          <p className="text-sm uppercase tracking-widest text-gray-300">
            {t('cta.bannerText')}
          </p>
          <h2 className="text-2xl md:text-4xl font-trajan">
            {t('cta.headline')}
          </h2>
          <p className="max-w-xl mx-auto text-1xl text-gray-300">
            {t('cta.description')}
          </p>
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition"
           onClick={() => {
             const ell = document.getElementById('contact');
             ell?.scrollIntoView({ behavior: 'smooth', block: 'start' });
           }}>
            {t('cta.button')} →
          </button>
        </div>
      </div>

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
              <li><Link href="#about" className="hover:text-white">{t('pages.about')}</Link></li>
              <li><Link href="#pricing" className="hover:text-white">{t('pages.program')}</Link></li>
              <li><Link href="#contact" className="hover:text-white">{t('pages.book')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('resources.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#faq" className="hover:text-white">{t('resources.faq')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('resources.privacy')}</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('socials.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">{t('socials.instagram')}</a></li>
              <li><a href="#" className="hover:text-white">{t('socials.facebook')}</a></li>
              <li><a href="#" className="hover:text-white">{t('socials.youtube')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;