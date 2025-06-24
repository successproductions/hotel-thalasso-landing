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
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Decorative background blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 backdrop-blur-[1px]" />

        {/* Content container with glassmorphism effect */}
        <motion.div
          className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Animated overline */}
          <motion.p
            className="text-sm uppercase text-white/90 tracking-[0.3em] mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="relative">
              {t("overline")}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </span>
          </motion.p>

          {/* Main title with enhanced styling */}
          <motion.h1
            className="font-trajan text-2xl md:text-4xl lg:text-7xl text-white leading-tight max-w-3xl mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)",
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
            }}
          >
            {t("title")}
          </motion.h1>

          {/* Decorative line under title */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-8 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          />

          {/* Enhanced button container */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-green-500/30 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <Button
              className="relative overflow-hidden px-10 py-4 bg-gradient-to-r from-green-800 to-green-900 hover:from-green-700 hover:to-green-800 text-white font-trajan tracking-wide rounded-full shadow-2xl transition-all duration-500 ease-out hover:scale-110 hover:shadow-green-500/25 focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-transparent group border border-green-600/50"
              size="lg"
              onClick={() => {
                const el = document.getElementById("programme")
                el?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />

              {/* Button text */}
              <span className="relative z-10 flex items-center gap-2">
                {t("ctaPrimary")}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </span>

              {/* Button inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>

          {/* Floating particles around the content */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                delay: i * 0.3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Subtle corner decorations */}
        
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
