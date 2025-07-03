// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";

export function Hero() {
  const tHero = useTranslations("hero");

  // Container-level variants to stagger children
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  // Each item fades in + slides up
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Animated Text */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="text-sm font-trajan tracking-widest uppercase"
        >
          {tHero("tagline")}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-trajan leading-tight"
        >
          {tHero("headline")}
        </motion.h1>

        <motion.p variants={item} className="max-w-xl text-base">
          {tHero("description")}
        </motion.p>
      </motion.div>
    </section>
  );
}
