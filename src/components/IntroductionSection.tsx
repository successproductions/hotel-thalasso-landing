"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function IntroductionSection() {
  const t = useTranslations("introduction")

  return (
    <section className="bg-[#fdfaf7] dark:bg-[#090b11] py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 items-center gap-16">
        
        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-teal-700 dark:text-teal-400 text-sm uppercase font-medium tracking-widest mb-4">
            {t("whyTitle")}
          </p>
          <h2 className="text-3xl md:text-4xl font-trajan  text-gray-800 dark:text-white  mb-6">
            {t("headlineLine1")}<br /> {t("headlineLine2")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Image Block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/introduction.png"
            alt={t("imageAlt")}
            width={600}
            height={500}
            className="object-cover w-full h-full rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
