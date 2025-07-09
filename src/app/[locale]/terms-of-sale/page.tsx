"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function TermsOfSale() {
  const t = useTranslations('terms');

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            {t('header.title')}
          </h1>
          <p className="text-xl opacity-90">
            {t('header.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Intro Box */}
          <div className="bg-gray-50 border-l-4 border-gray-800 p-6 mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('header.intro')}
            </p>
            <p className="text-gray-800 font-medium">
              {t('header.acceptance')}
            </p>
          </div>

          {/* Security Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-6 bg-red-500 rounded text-white text-xs font-bold flex items-center justify-center">
                CMI
              </div>
              <span className="text-sm text-gray-600">Centre Monétique Interbancaire</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                VISA
              </div>
              <span className="text-sm text-gray-600">Verified by Visa</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-6 bg-orange-500 rounded text-white text-xs font-bold flex items-center justify-center">
                MC
              </div>
              <span className="text-sm text-gray-600">MasterCard SecureCode</span>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.preamble.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.preamble.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.purpose.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.purpose.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.sales.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.sales.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.payment.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.payment.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.guarantee.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.guarantee.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.privacy.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.privacy.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.proof.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.proof.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.services.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.services.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.cancellation.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.cancellation.content')}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.liability.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.liability.content')}
              </p>
            </div>

            <div className="pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('sections.law.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.law.content')}
              </p>
            </div>

          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gray-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              {t('contact.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-medium mb-2">Adresse</h4>
                <p className="text-sm opacity-90">{t('contact.address')}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-sm opacity-90">
                  <a href={`mailto:${t('contact.email')}`} className="hover:underline">
                    {t('contact.email')}
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Téléphone</h4>
                <p className="text-sm opacity-90">
                  <a href={`tel:${t('contact.phone')}`} className="hover:underline">
                    {t('contact.phone')}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-4">
              {t('lastUpdated')}
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
            >
              {t('backToHome')}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}