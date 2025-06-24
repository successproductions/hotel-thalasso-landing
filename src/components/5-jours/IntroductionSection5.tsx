"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function IntroductionSection() {
  const t = useTranslations("offer5.introduction")

  return (
    <section id="about" className="relative bg-gradient-to-br from-gray-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20 py-32 transition-all duration-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 items-center gap-20">
          
          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-20 blur-sm"></div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
              <p className="text-teal-600 dark:text-teal-400 text-sm uppercase font-semibold tracking-[0.2em] font-sans">
                {t("whyTitle")}
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-trajan text-gray-900 dark:text-white mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-teal-700 dark:from-white dark:via-gray-200 dark:to-teal-300 bg-clip-text text-transparent">
                {t("headlineLine1")}
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed pl-8 font-light">
                {t("description")}
              </p>
            </motion.div>

            {/* Decorative dots */}
            <div className="flex gap-3 mt-12">
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-teal-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>

          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative group"
          >
            {/* Floating background elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-teal-400/30 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-400/30 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
            
            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-500/10 dark:shadow-teal-500/20 group-hover:shadow-3xl group-hover:shadow-teal-500/20 dark:group-hover:shadow-teal-500/30 transition-all duration-700">
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-900/10 dark:to-teal-900/30 z-10"></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 dark:ring-white/10 group-hover:ring-teal-500/30 dark:group-hover:ring-teal-400/30 transition-all duration-700 z-20"></div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src="/images/0070.png"
                  alt={t("imageAlt")}
                  width={600}
                  height={500}
                  className="object-cover w-full h-[500px] lg:h-[600px] transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>

              {/* Decorative corner elements */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/40 dark:border-white/20 rounded-tl-lg z-30"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/40 dark:border-white/20 rounded-br-lg z-30"></div>
            </div>

            {/* Floating stats or badges could go here */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-8 left-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Premium Experience
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}