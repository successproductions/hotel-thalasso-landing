"use client"

import type React from "react"

import { motion, useReducedMotion } from "framer-motion"
import { Hourglass, CalendarDays, Sparkles, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ExclusiveOfferSection() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations("exclusiveOffer")

  return (
    <section className="w-full py-12 md:py-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-900/20 dark:to-cyan-900/20" />

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }
          }
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -25, 0],
                  y: [0, 15, 0],
                  rotate: [0, -3, 0],
                }
          }
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full blur-2xl"
        />
      </div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.95 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-5xl mx-auto relative"
      >
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-teal-500/10 border border-white/20 dark:border-gray-700/50 overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl p-[2px]">
            <div className="w-full h-full bg-white/90 dark:bg-gray-800/90 rounded-3xl" />
          </div>

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Enhanced Icons Section */}
              <div className="flex lg:flex-col gap-6 lg:gap-8 items-center justify-center">
                <FloatingIcon delay={0}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl blur-lg opacity-30" />
                    <div className="relative bg-gradient-to-br from-teal-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
                      <Hourglass className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </FloatingIcon>

                <motion.div
                  initial={reduceMotion ? undefined : { scale: 0, rotate: -180 }}
                  whileInView={reduceMotion ? undefined : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
                  className="hidden lg:block"
                >
                  <Sparkles className="w-6 h-6 text-teal-400" />
                </motion.div>

                <FloatingIcon delay={0.4}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-500 rounded-2xl blur-lg opacity-30" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                      <CalendarDays className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </FloatingIcon>
              </div>

              {/* Enhanced Content Section */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <motion.div
                  initial={reduceMotion ? undefined : { opacity: 0, x: -30 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                    {t("title")}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {t("description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
                >
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold text-sm lg:text-base">{t("nextSession")}</span>
                    </div>
                  </div>

                  <motion.div
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, 0],
                          }
                    }
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Limited Time</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Enhanced floating icon component
function FloatingIcon({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, scale: 0, rotate: -180 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
      whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: 5 }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -8, 0],
              rotate: [0, 2, 0],
            }
      }
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        bounce: 0.4,
      }}
      className="cursor-pointer"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -8, 0],
                rotate: [0, 2, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay * 2,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
