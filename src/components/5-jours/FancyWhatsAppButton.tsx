
"use client";


import { motion, useReducedMotion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { useTranslations } from "next-intl";

export default function FancyWhatsAppButton() {
  const t = useTranslations("offer5.imagesSection");
  const reduce = useReducedMotion();

 

  return (
        <motion.a
      href="https://wa.me/+212652881921"
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center gap-2 px-6 py-3 border-2 border-teal-500 rounded-full overflow-hidden group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={reduce ? {} : { backgroundColor: "#14b8a6", color: "#fff" }}
      whileTap={reduce ? {} : { scale: 0.95 }}
    >
      {/* ping circle */}
      {!reduce && (
        <span className="absolute inset-0 flex justify-center items-center">
          <span className="block w-8 h-8 bg-teal-500 rounded-full opacity-20 animate-ping"></span>
        </span>
      )}

      {/* icon and text */}
      <SiWhatsapp className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors" />
      <span className="font-semibold text-teal-500 group-hover:text-white transition-colors">
        {t("ctaWhatsApp")}
      </span>
    </motion.a>

  );
}
