"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function Hero5() {
  const t = useTranslations("offer5.hero")
  const images = ["/images/DJI_0070.png", "/images/hydro_massage.png", "/images/centrethalassoDakhla.jpg"]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative h-[70vh] w-full overflow-hidden mt-20 rounded-2xl">
      {/* Animated cross-fade carousel */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[current] || "/placeholder.svg"}
              alt={`${t("alt.hero")} ${current + 1}`}
              fill
              className="object-cover"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      {/* Centered content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Animated geometric background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rotate-45"
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-24 h-24 border border-white/15 rotate-12"
            animate={{ rotate: [12, -348] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-white/5 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        {/* Main content container */}
        <motion.div
          className="relative z-10 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          {/* Overline with animated border */}
          <motion.div
            className="relative inline-block mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />
            <p className="relative px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase text-white/90 tracking-[0.2em] sm:tracking-[0.3em] font-medium border border-white/30 rounded-full backdrop-blur-sm">
              {t("overline")}
            </p>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </motion.div>

          {/* Main title with responsive sizing */}
          <motion.h1
            className="font-trajan text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6 sm:mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.1)",
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2))",
            }}
          >
            {t("title")}
          </motion.h1>

          {/* Enhanced CTA Button */}
          <motion.div
            className="relative inline-block w-full max-w-sm sm:max-w-none sm:w-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button container */}
            <div className="relative group">
              <Button
                className="relative w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-green-800 via-green-900 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-700 text-white font-trajan text-xs sm:text-sm md:text-base lg:text-lg tracking-wide rounded-full shadow-2xl transition-all duration-500 ease-out focus:outline-none focus:ring-4 focus:ring-green-500/50 border-2 border-green-600/50 overflow-hidden group min-h-[48px]"
                size="lg"
                onClick={() => {
                  const el = document.getElementById("programme")
                  el?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                {/* Animated background waves */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
                  <motion.span
                    className="block text-sm sm:text-base"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                  
                  </motion.span>

                  {/* Responsive text - shorter on mobile */}
                  <span className="block sm:hidden text-center leading-tight">
                    BOOK YOUR
                   
                    RETREAT
                  </span>
                  <span className="hidden sm:block md:hidden text-center">BOOK YOUR MARINE RETREAT</span>
                  <span className="hidden md:block text-center">{t("ctaPrimary")}</span>

                  <motion.span
                    className="inline-block text-sm sm:text-lg md:text-xl"
                    animate={{ x: [0, 3, 0], rotate: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Pulse effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-green-400/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </div>
          </motion.div>

          {/* Floating elements around button */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400/60 rounded-full"
              style={{
                left: `${30 + i * 8}%`,
                top: `${70 + (i % 2) * 10}%`,
              }}
              animate={{
                y: [-5, -15, -5],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2 + 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            animate={{ borderColor: ["rgba(255,255,255,0.4)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.4)"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom-left caption */}
      <p className="absolute bottom-4 left-4 max-w-xs text-white/80 italic text-sm">{t("tagline")}</p>

      {/* Bottom-right socials */}
      <div className="absolute bottom-4 right-4 flex space-x-4 text-white/80 text-sm">
        <a href="https://www.facebook.com/DakhlaClub/" target="_blank" rel="noreferrer noopener">
          FB
        </a>
        <a href="https://www.instagram.com/hoteldakhlaclub/" target="_blank" rel="noreferrer noopener">
          IG
        </a>
        <a href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY" target="_blank" rel="noreferrer noopener">
          YT
        </a>
        <a
          href="https://www.tiktok.com/@dakhlaclubhotel?_r=1&_d=eec80jahcl3m4g&sec_uid=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&share_author_id=7205863435829543941&sharer_language=fr&source=h5_m&u_code=e6ih6ce9mg3kj5&ug_btm=b8727,b0&social_share_type=4&utm_source=copy&sec_user_id=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&tt_from=copy&utm_medium=ios&utm_campaign=client_share&enable_checksum=1&user_id=7205863435829543941&share_link_id=080768DC-CD71-466C-B232-9A202D618A60&share_app_id=1233"
          target="_blank"
          rel="noreferrer noopener"
        >
          TK
        </a>
      </div>
    </section>
  )
}
