"use client";

import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations, useMessages } from "next-intl";

// Define types for your FAQ messages
interface FAQItem {
  question: string;
  answer: string;
}

// interface FAQMessages {
//   faq: {
//     title: string;
//     contact: {
//       label: string;
//       subtext: string;
//       alt: string;
//     };
//     items: FAQItem[];
//   };
// }

export default function FAQSection() {
  const t = useTranslations("faq");
  const messages = useMessages();

  const { contact, items } = messages.faq;

  return (
    <section id="faq" className="bg-[#f9f8f4] dark:bg-[#080b12] py-20 text-gray-900 dark:text-gray-100 transition-colors seo-ping">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-start">
        {/* Left - Image with Contact Box */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/centrethalassoDakhla.jpg"
              alt={contact.alt}
              width={700}
              height={500}
              className="object-cover w-full h-[560px]"
            />
          </div>

          
        </div>

        {/* Right - FAQ */}
        <div>
          <h2 className="text-2xl font-trajan dark:text-green-600 mb-4">{t("title")}</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item: FAQItem, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-gray-900 rounded-md px-4 py-1 shadow-sm transition-colors"
              >
                <AccordionTrigger className="text-left font-medium text-base text-green-900 dark:text-green-600 hover:text-teal-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pt-2 leading-relaxed dark:text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
