'use client';
import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const brochureUrl =
    locale === 'en'
      ? 'https://offer.dakhlaclub.com/brochure/BROCHURE-EN.pdf'
      : 'https://offer.dakhlaclub.com/brochure/BROCHURE_CH_NUMERIQUE_FR_compressed.pdf';

  return (
    <footer className="bg-gray-100  text-gray-700">
      <div className="mx-auto p-6  grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-5">
        {/* Column 1 */}
        <div className="text-left">
          <h3 className="mb-4 text-sm font-semibold uppercase">DakhlaClub</h3>
          <ul className="space-y-2 font-light ">
            <li className=" cursor-pointer  hover:underline">
              <a href="#">{t('footerNav.home')}</a>
            </li>
            <li className="cursor-pointer hover:underline">
              <a href="#about">{t('footerNav.about')}</a>
            </li>
            <li className="cursor-pointer hover:underline">
              <a href="#services">{t('footerNav.offers')}</a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="text-left">
          <h3 className="mb-4 text-sm font-semibold uppercase">{t('column2')}</h3>
          <ul className="space-y-2 font-light">
            <li className="cursor-pointer hover:underline">
              <a href="#faq">{t('support.faq')}</a>
            </li>
            <li className="cursor-pointer hover:underline">
              <a href="mailto:reservation@dakhlaclub.com">reservation@dakhlaclub.com</a>
            </li>
            <li className="cursor-pointer font-trajan hover:underline">
              <a href="tel:+21265288192">+212 652881921</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="text-left">
          <h3 className="mb-4 text-sm font-semibold uppercase">{t('column4')}</h3>
          <ul className="space-y-2 font-light">
            <li className="cursor-pointer hover:underline">
              <Link href="/legal/privacy">{t('legal.privacy')}</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href="/legal/cookies">{t('legal.cookies')}</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href="/legal/cgv">{t('legal.sitemap')}</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="text-left">
          <h3 className="mb-4 text-sm font-semibold uppercase">Follow Us</h3>
          <div className="flex justify-start space-x-4">
            <a
              href="https://www.facebook.com/DakhlaClub/"
              aria-label="Facebook"
              className="hover:text-gray-900"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/hoteldakhlaclub/"
              aria-label="Instagram"
              className="hover:text-gray-900"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY"
              aria-label="Youtube"
              className="hover:text-gray-900"
            >
              <Youtube />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-4 md:items-center md:justify-end">
          <div className="text-left md:text-center md:mx-auto">
            <p className="mb-2 text-xs text-gray-600">{t('scanBrochure')}</p>
            <div className="relative aspect-square w-32 overflow-hidden rounded-lg ml-3 md:ml-0 bg-white shadow-md sm:w-28 md:w-24">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  brochureUrl
                )}`}
                alt={t('qrAlt')}
                fill
                unoptimized
                className="object-contain  p-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider + center logo */}
      <div className="relative border-t border-gray-300">
        <div className="absolute inset-x-0 top-0 -mt-4 flex justify-center">
          <div className="bg-gray-100 px-3">
            {/* Replace with your R logo */}
            <Image
              src="/images/offer-3/logoDcBolde.png"
              alt="Dakhla Club Logo"
              width={78}
              height={228}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Payment Security Logos - Required by CMI */}
      <div className="pt-6 pl-6 md:pl-0 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-left md:text-center my-2 uppercase tracking-wide">Paiement 100% Sécurisé</p>
        <div className="flex items-center justify-start md:justify-center gap-6 flex-wrap">
          <Image 
            src="/images/logos_cmi/logo_cmi.png" 
            alt="CMI Payment" 
            width={60} 
            height={36}
            className="object-contain"
          />
          <Image 
            src="/images/logos_cmi/tn_verified_by_visa.png" 
            alt="Verified by Visa" 
            width={60} 
            height={36}
            className="object-contain"
          />
          <Image 
            src="/images/logos_cmi/secure_code_logo.png" 
            alt="MasterCard SecureCode" 
            width={60} 
            height={36}
            className="object-contain"
          />
          <Image 
            src="/images/logos_cmi/AMEX.png" 
            alt="American Express" 
            width={60} 
            height={36}
            className="object-contain"
          />
          <Image 
            src="/images/logos_cmi/MarocPay.png" 
            alt="MarocPay" 
            width={60} 
            height={36}
            className="object-contain"
          />
          <Image 
            src="/images/logos_cmi/unionpay.png" 
            alt="UnionPay" 
            width={60} 
            height={36}
            className="object-contain"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 pl-6 md:pl-0 font-normal text-left md:text-center text-sm text-gray-600">
        © 2026 DakhlaClub and its Associated Subsidiaries | Luxury Fitness, Health & Wellness
        Vacation Retreat
      </div>
    </footer>
  );
}
