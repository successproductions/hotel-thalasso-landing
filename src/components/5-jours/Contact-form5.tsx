"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send, Calendar, User, MessageSquare, ArrowRight } from "lucide-react"
import Swal from "sweetalert2"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactForm5() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  })

  const [activeField, setActiveField] = useState<string | null>(null)

  const pathname = usePathname()
  const is3 = pathname?.includes("evasion-holistique-3-jours")
  const is5 = pathname?.includes("sejour-serenite-5-jours")
  const status = is3 ? "3 jours" : is5 ? "5 jours" : ""

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const t = useTranslations("contactForm")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, phone, email, date } = formData

    if (!name || !phone || !email || !date) {
      Swal.fire({
        icon: "warning",
        title: "Champs requis manquants",
        text: "Veuillez remplir tous les champs obligatoires.",
        confirmButtonColor: "#56a7af",
      })
      return
    }

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Message envoyé !",
        text: "Nous vous contacterons très bientôt.",
        confirmButtonColor: "#56a7af",
      })
      setFormData({ name: "", country: "", phone: "", email: "", date: "", message: "" })
    }, 800)

    try {
      const payload = { ...formData, status }

      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (res.ok && json.status === "success") {
        Swal.fire({
          icon: "success",
          title: t("success.title"),
          text: t("success.message"),
          confirmButtonColor: "#56a7af",
        })
        setFormData({ name: "", country: "MA", phone: "", email: "", date: "", message: "" })
      } else {
        throw new Error(json.error || "Erreur serveur")
      }
    } catch (err: unknown) {
      Swal.fire({
        icon: "error",
        title: t("errors.server"),
        text: err instanceof Error ? err.message : t("errors.unknown"),
        confirmButtonColor: "#56a7af",
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  }



  return (
    <section
      id="contact"
      className=" bg-[#ebf6fe] dark:bg-[#090b11] text-gray-800 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      {/* Animated Background Waves */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-full opacity-20 dark:opacity-10"
          
          animate="animate"
        >
          <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <path d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z" fill="#56a7af" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-[200%] h-full opacity-15 dark:opacity-5"
          
          animate="animate"
          transition={{ delay: 2 }}
        >
          <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <path d="M0,600 C400,300 800,700 1200,500 L1200,800 L0,800 Z" fill="#dab990" />
          </svg>
        </motion.div>

        {/* Floating Dots Animation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#56a7af] dark:bg-[#dab990] rounded-full opacity-30 dark:opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="text-center mb-10" >
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="px-8 py-4 border-2 border-[#56a7af] text-[#56a7af] dark:border-[#dab990] dark:text-[#dab990] rounded-full text-lg font-semibold tracking-wide bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              {t("header.small")}
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-trajan mb-2  tracking-tight text-gray-800 dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t("header.title")}
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-[#56a7af] dark:bg-[#dab990] mx-auto mb-2"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {t("header.subtitle")}
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form Section */}
          <motion.div className="flex-1" >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute -top-3 left-6 px-2 bg-[#ebf6fe] dark:bg-[#090b11] text-sm font-semibold flex items-center gap-2 text-[#56a7af] dark:text-[#dab990] z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <User className="w-4 h-4" />
                  {t("fields.name.label")} *
                </motion.div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("fields.name.placeholder")}
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField(null)}
                  className="h-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-[#dab990] dark:border-[#56a7af] text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-none text-lg focus:border-[#56a7af] dark:focus:border-[#dab990] focus:ring-0 transition-all duration-300"
                  required
                />
                <AnimatePresence>
                  {activeField === "name" && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-[#56a7af] dark:bg-[#dab990]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone Field */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute -top-3 left-6 px-2 bg-[#ebf6fe] dark:bg-[#090b11] text-sm font-semibold flex items-center gap-2 text-[#56a7af] dark:text-[#dab990] z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Phone className="w-4 h-4" />
                  {t("fields.phone.label")} *
                </motion.div>
                <div className="flex">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="h-16 pl-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-[#dab990] dark:border-[#56a7af] border-r-0 text-gray-800 dark:text-white rounded-none focus:border-[#56a7af] dark:focus:border-[#dab990] focus:ring-0 focus:outline-none"
                  >
                    <option value="MA" className="bg-white dark:bg-gray-800">
                      🇲🇦 +212
                    </option>
                    <option value="FR" className="bg-white dark:bg-gray-800">
                      🇫🇷 +33
                    </option>
                    <option value="US" className="bg-white dark:bg-gray-800">
                      🇺🇸 +1
                    </option>
                  </select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t("fields.phone.placeholder")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                    className="h-16 flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-[#dab990] dark:border-[#56a7af] border-l-0 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-none text-lg focus:border-[#56a7af] dark:focus:border-[#dab990] focus:ring-0"
                    required
                  />
                </div>
                <AnimatePresence>
                  {activeField === "phone" && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-[#56a7af] dark:bg-[#dab990]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email & Date Row */}
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div
                  className="flex-1 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute -top-3 left-6 px-2 bg-[#ebf6fe] dark:bg-[#090b11] text-sm font-semibold flex items-center gap-2 text-[#56a7af] dark:text-[#dab990] z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Mail className="w-4 h-4" />
                    {t("fields.email.label")} *
                  </motion.div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("fields.email.placeholder")}
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className="h-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-[#dab990] dark:border-[#56a7af] text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-none text-lg focus:border-[#56a7af] dark:focus:border-[#dab990] focus:ring-0"
                    required
                  />
                  <AnimatePresence>
                    {activeField === "email" && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-[#56a7af] dark:bg-[#dab990]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  className="flex-1 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute -top-3 left-6 px-2 bg-[#ebf6fe] dark:bg-[#090b11] text-sm font-semibold flex items-center gap-2 text-[#56a7af] dark:text-[#dab990] z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Calendar className="w-4 h-4" />
                    {t("fields.date.label")} *
                  </motion.div>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField("date")}
                    onBlur={() => setActiveField(null)}
                    className="h-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-[#dab990] dark:border-[#56a7af] text-gray-800 dark:text-white rounded-none text-lg focus:border-[#56a7af] dark:focus:border-[#dab990] focus:ring-0"
                    required
                  />
                  <AnimatePresence>
                    {activeField === "date" && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-[#56a7af] dark:bg-[#dab990]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute -top-3 left-6 px-2 bg-[#ebf6fe] dark:bg-[#090b11] text-sm font-semibold flex items-center gap-2 text-[#56a7af] dark:text-[#dab990] z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <MessageSquare className="w-4 h-4" />
                  {t("fields.message.label")}
                </motion.div>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("fields.message.placeholder")}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  className="min-h-32 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-[#dab990] dark:border-[#56a7af] text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-none text-lg focus:border-[#56a7af] dark:focus:border-[#dab990] focus:ring-0 resize-none"
                  rows={4}
                />
                <AnimatePresence>
                  {activeField === "message" && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-[#56a7af] dark:bg-[#dab990]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div className="pt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full h-20 bg-[#56a7af] hover:bg-[#4a9299] dark:bg-[#dab990] dark:hover:bg-[#c9a67d] text-white dark:text-gray-800 rounded-none font-bold text-xl tracking-wide transition-all duration-300 group relative overflow-hidden shadow-lg"
                  size="lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#dab990] dark:bg-[#56a7af]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                    <Send className="w-6 h-6" />
                    {t("submit")}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div className="lg:w-96 space-y-8" >
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, title: t("info.address.title"), text: t("info.address.text") },
                { icon: Phone, title: t("info.phone.title"), text: t("info.phone.text") },
                { icon: Mail, title: t("info.email.title"), text: t("info.email.text") },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-6 p-6 border-2 border-[#dab990] dark:border-[#56a7af] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-[#56a7af] hover:text-white dark:hover:bg-[#dab990] dark:hover:text-gray-800 transition-all duration-300 group cursor-pointer"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 text-[#56a7af] dark:text-[#dab990] group-hover:text-white dark:group-hover:text-gray-800" />
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white group-hover:text-white dark:group-hover:text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 group-hover:text-white/90 dark:group-hover:text-gray-800/90 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              className="border-2 border-[#dab990] dark:border-[#56a7af] overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.701890833086!2d-15.771637423230148!3d23.90018747856852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc23ad5afd1c1481%3A0xc28dd166fe5df19a!2sDakhla%20Club%20Hotel%20%26%20Spa!5e0!3m2!1sfr!2sma!4v1749717076479!5m2!1sfr!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
