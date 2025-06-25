"use client"

import React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sunrise, Waves, Wind, Heart, Sparkles, Sun, Calendar, Target } from "lucide-react"
import Image from "next/image"

const days = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"] as const

const dayIcons = [Calendar, Sunrise, Wind, Heart, Sparkles, Waves, Sun]

const defaultImages = [
  "/images/DJI_0070.png",
  "/images/centrethalassoDakhla.jpg",
  "/images/Piscine_thermale.png",
  "/images/sauna_ritual.png",
  "/images/Salle-de-massage.png",
  "/images/modelage.jpg",
  "/images/hydro_massage.png",
]

const objectives = [
  "",
  "libérer le système nerveux, relancer le drainage",
  "stimuler les cellules, éliminer, reconnecter",
  "sommeil réparateur, ancrage durable",
  "activation complète de la vitalité",
  "ancrer les bienfaits, repartir régénéré(e)",
  "",
]

interface WellnessProgramEnhancedProps {
  translationKey?: string 
  images?: string[]
  className?: string
  showBenefits?: boolean
}

export default function WellnessProgramEnhanced({
  translationKey = "offer5.program",
  images = defaultImages,
  className = "",
  showBenefits = true,
}: WellnessProgramEnhancedProps) {
  const t = useTranslations(translationKey)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)


  return (
    <section id="services" className={`py-16 px-4 bg-stone-50 dark:bg-[#090b11] text-stone-900 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-trajan dark:text-white text-gray-900 mb-4">{t("heading")}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500  mx-auto rounded-full"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {days.map((day, index) => {
            const IconComponent = dayIcons[index]
            const dayNumber = index + 1
            const isHovered = hoveredCard === index
            const imageUrl = images[index]
            const activities = t.raw(`${day}.activities`) as string[]

            return (
              <motion.div
                key={day}
                className="relative"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setHoveredCard((prev) => (prev === index ? null : index))
            }
              >
                <Card className="relative overflow-hidden cursor-pointer h-64 group">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={t(`${day}.label`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Dark overlay for text readability */}
                    <motion.div
                      className="absolute inset-0 bg-black/40"
                      animate={{
                        opacity: isHovered ? 0.6 : 0.4,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  </div>

                  <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.2 : 1,
                          rotate: isHovered ? 10 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-2"
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.div>
                      <motion.div
                        className="text-right bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1"
                        animate={{
                          y: isHovered ? -5 : 0,
                          scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-xs opacity-90">Jour</div>
                        <div className="text-xl font-bold">{dayNumber}</div>
                      </motion.div>
                    </div>

                    <motion.div
                      animate={{
                        y: isHovered ? -10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-black/30 backdrop-blur-sm rounded-lg p-3"
                    >
                      <h3 className="text-lg font-bold mb-1">{t(`${day}.label`)}</h3>
                      <div className="text-sm opacity-90">{activities.length} {t("activities")}</div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? "100%" : "50%" }}
                        transition={{ duration: 0.4 }}
                        className="h-0.5 bg-white/60 mt-2 rounded-full"
                      />
                    </motion.div>
                  </CardContent>

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 overflow-hidden"
                      >
                        <div className="p-4 h-full overflow-y-auto">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="bg-blue-100 rounded-full p-1.5">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm">{t(`${day}.label`)}</h4>
                          </div>

                          {objectives[index] && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              className="mb-3"
                            >
                              <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                <Target className="w-3 h-3 mr-1" />
                                {objectives[index]}
                              </Badge>
                            </motion.div>
                          )}

                          <div className="space-y-2">
                            {activities.map((activity, activityIndex) => (
                              <motion.div
                                key={activityIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + activityIndex * 0.05 }}
                                className="flex items-start gap-2 text-xs"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                <p className="text-gray-700 leading-relaxed">{activity}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>



        {/* Benefits Section */}
        {showBenefits && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 relative overflow-hidden rounded-2xl "
          >
            <div className="absolute inset-0">
              
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm dark:bg-transparent" />
            </div>

            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-trajan text-gray-900 mb-6 dark:text-white text-center">CE QUE VOUS RESSENTIREZ VRAIMENT</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Une sensation de vide libérateur dans la tête et dans le ventre",
                  "Un système nerveux apaisé, un sommeil réparateur",
                  "Une digestion plus fluide, une énergie disponible",
                  "Une peau lissée, un visage détendu et rayonnant",
                  "Un corps plus léger, désengorgé, décrispé",
                  "Un esprit clair, une envie de revenir à vous",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg dark:bg-transparent hover:bg-white/90 transition-colors border border-white/50"
                  >
                    <span className="text-green-500 dark:text-white font-montserrat text-lg">✔️</span>
                    <p className="text-gray-800 dark:text-white font-medium text-sm">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
