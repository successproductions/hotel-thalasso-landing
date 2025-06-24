"use client"

import Image from "next/image"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Star, Trophy, Medal, Crown, Sparkles } from "lucide-react"

const logos = [
  { id: "tripadvisor", src: "/images/TripAdvisor.jpeg" },
  { id: "tripdotcom", src: "/images/trip.jpg" },
  { id: "spaAward", src: "/images/AWARDS.png" },
  { id: "kayakBadge", src: "/images/kayak-badge.png" },
]

const floatingIcons = [Award, Star, Trophy, Medal, Crown, Sparkles]

export default function RewardsSection5() {
  const t = useTranslations("rewards")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  
  

  return (
    <section
      ref={ref}
      className="relative  bg-gradient-to-br from-[#ebf6fe] via-white to-[#f0f9ff] dark:from-[#090b11] dark:via-[#0f1419] dark:to-[#1a1f2e] py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 ">
        {/* Floating Icons */}
        {floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute opacity-10 dark:opacity-5"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + index * 10}%`,
            }}
            
            animate="animate"
            transition={{ delay: index * 0.5 }}
          >
            <Icon className="w-12 h-12 text-[#56a7af] dark:text-[#dab990]" />
          </motion.div>
        ))}

        {/* Pulsing Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#56a7af]/20 to-[#dab990]/20 dark:from-[#dab990]/10 dark:to-[#56a7af]/10"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            
            animate="animate"
            transition={{ delay: i * 0.3 }}
          />
        ))}

        {/* Gradient Waves */}
        <motion.div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #56a7af 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #dab990 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #56a7af 0%, transparent 50%)",
              "radial-gradient(circle at 60% 20%, #dab990 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-20" >
          <motion.h2
            className="text-5xl md:text-7xl font-trajan mb-8 bg-gradient-to-r from-gray-800 via-[#12292b] to-gray-800 dark:from-white dark:via-[#dab990] dark:to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
          >
            {t("title")}
          </motion.h2>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="group relative"
              
              whileHover={{ scale: 1.1, rotateY: 10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated Background Card */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50"
                animate={{
                  background:
                    hoveredIndex === index
                      ? "linear-gradient(135deg, rgba(86, 167, 175, 0.2), rgba(218, 185, 144, 0.2))"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-[#56a7af]/30 via-[#dab990]/30 to-[#56a7af]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col items-center justify-center h-48">
                {/* Floating Award Icon */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#56a7af] to-[#dab990] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                    scale: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="w-4 h-4 text-white" />
                </motion.div>

                {/* Logo Image */}
                <motion.div
                  className="relative overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={t(`logos.${logo.id}.alt`)}
                    width={160}
                    height={80}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-2xl"
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    animate={{
                      x: hoveredIndex === index ? ["-100%", "200%"] : "-100%",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Animated Particles */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#56a7af] dark:bg-[#dab990] rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [-10, -30, -10],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Accent Line */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#56a7af] to-[#dab990] rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: hoveredIndex === index ? "80%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
       
      </motion.div>
    </section>
  )
}
