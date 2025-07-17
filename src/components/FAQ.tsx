"use client"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations, useMessages } from "next-intl"
// import { Phone, Mail } from "lucide-react"
import { useState } from "react"


interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const t = useTranslations("faq")
  const messages = useMessages()
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)
  // const PHONE_NUMBER = "+21265288192";
  // const EMAIL_ADDRESS = "reservation@dakhlaclub.com";

  const { contact, items } = messages.faq

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  }



  return (
    <section id="faq" className=" bg-slate-50 dark:bg-[#090b11] py-12 md:py-14 transition-colors duration-500">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-5xl md:text-5xl font-medium text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              {t("title")}
            </h2>
            <div className="w-24 h-1 bg-slate-800 dark:bg-slate-100 mx-auto rounded-full"></div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Image Section - Left Side */}
          <motion.div className="lg:col-span-2" variants={imageVariants}>
            <div className="sticky top-8">
              <motion.div className="relative group" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <div className="absolute -inset-4 bg-slate-200 dark:bg-slate-700  rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/centrethalassoDakhla.jpg"
                    alt={contact.alt}
                    width={600}
                    height={400}
                    className="object-cover w-full h-80 filter contrast-110"
                  />
                </div>
              </motion.div>

              {/* Contact Info */}
              {/* <motion.div
                className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-4 text-lg">{contact.label}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">{contact.subtext}</p>
                <div className="flex gap-3">
                   <motion.a
        href={`tel:${PHONE_NUMBER}`}
        className="flex items-center gap-2 px-4 py-2 bg-[#139584] dark:bg-slate-100 text-white dark:text-slate-800 rounded-lg text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone className="w-4 h-4" />
        Call
      </motion.a>

      
      <motion.a
        href={`mailto:${EMAIL_ADDRESS}`}
        className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-4 h-4" />
        Email
      </motion.a>
                </div>
              </motion.div> */}
            </div>
          </motion.div>

          {/* FAQ Section - Right Side */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <div className="space-y-4">
              {items.map((item: FAQItem, index: number) => (
                <motion.div key={index} variants={itemVariants} className="group">
                  <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                    <AccordionItem value={`item-${index}`} className="border-none">
                      <motion.div
                        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                        whileHover={{
                          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
                          y: -2,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <AccordionTrigger className="px-6 py-5 text-left font-bold text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600  transition-colors duration-200">
                          <div className="flex items-center justify-between w-full dark:hover:bg-slate-600">
                            <span className="text-base md:text-lg pr-4">{item.question}</span>
                            <motion.div
                              animate={{
                                rotate: openItem === `item-${index}` ? 45 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0"
                            >
                            </motion.div>
                          </div>
                        </AccordionTrigger>

                        <AnimatePresence>
                          <AccordionContent className="px-6 pb-5">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-slate-600 dark:text-slate-300 leading-relaxed "
                            >
                              <div className="pt-2 border-t border-slate-100  ">{item.answer}</div>
                            </motion.div>
                          </AccordionContent>
                        </AnimatePresence>
                      </motion.div>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
