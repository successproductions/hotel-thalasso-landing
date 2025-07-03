// components/HeroTest.tsx
"use client";

import { motion, easeOut } from "framer-motion";
import React from "react";

export default function HeroTest() {
  // Static test strings
  const tagline     = "LA SCIENCE DE LA LONGÉVITÉ";
  const headline    = "Évasion Holistique 3 Jours";
  const description = "Un séjour entre désert et océan…";

  // Alternative: Simple fade-in without staggering
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      } 
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden">
      {/* 1) Video at z-0 */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 2) Dark overlay at z-10 */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 3) Text at z-20 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-6 space-y-6">
        <motion.p 
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-sm uppercase tracking-widest font-medium"
        >
          {tagline}
        </motion.p>

        <motion.h1 
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          {headline}
        </motion.h1>

        <motion.p 
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="max-w-lg text-base md:text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}