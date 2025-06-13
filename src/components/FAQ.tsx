// src/components/FAQ.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Phone } from 'lucide-react';
import { useTranslations, useMessages } from 'next-intl';

export default function FAQSection() {
  const t        = useTranslations('faq');
  const messages = useMessages();

  const { contact, items } = messages.faq;

  return (
    <section className="bg-[#f9f8f4] dark:bg-[#080b12] py-20 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-start">
        {/* Left - Image with Contact Box */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/sauna_ritual.png"
              alt={contact.alt}
              width={700}
              height={700}
              className="object-cover w-full h-auto"
            />
          </div>

          
        </div>

        {/* Right - FAQ */}
        <div>
          <h2 className="text-2xl font-trajan dark:text-green-600 mb-4">
            {t('title')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-gray-900 rounded-md px-4 py-1 shadow-sm transition-colors"
              >
                <AccordionTrigger className="text-left font-medium text-base text-green-900 dark:text-green-600 hover:text-teal-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pt-2 leading-relaxed dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
