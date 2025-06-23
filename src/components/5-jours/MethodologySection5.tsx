
"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import FancyWhatsAppButton from "./FancyWhatsAppButton";

export default function FeaturesWithImagesSection() {
  const t = useTranslations("offer5.imagesSection");
  const messages = useMessages();
  const features: string[] = messages.offer5?.imagesSection?.features ?? [];
  const reduce = useReducedMotion();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">
        {/* Left: overlapping images */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, x: -50 }}
          animate={reduce ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full lg:w-1/2"
        >
          <Image
            src="/images/IMG_2150 (1).png"
            alt={t("imageAlt1")}
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
          <Image
            src="/images/6 (1).png"
            alt={t("imageAlt2")}
            width={320}
            height={240}
            className="absolute -top-8 -left-8 rounded-2xl shadow-lg border-4 border-white dark:border-gray-800"
          />
        </motion.div>

        {/* Right: features list & WhatsApp CTA */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, x: 50 }}
          animate={reduce ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <h2 className="text-4xl font-trajan text-gray-800 dark:text-gray-200">
            {t("heading")}
          </h2>

          <ul className="space-y-4">
            {features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4">
 <FancyWhatsAppButton/>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
