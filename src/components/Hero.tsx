"use client";

import React from "react";

import WavyText from "./ui/WavyText";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t   = useTranslations('home');
 

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-[92vh] object-cover"
        src="https://rancholapuerta.com/wp-content/themes/rancho/assets/images/homepage.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 " />

      {/* animated two-line headline */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-4">
        {/* Line 1: big italic serif */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal  ">
          <WavyText text={t("title")} />
        </h1>

        {/* Line 2: uppercase tracking-wide */}
        <h2 className="uppercase text-sm md:text-lg tracking-widest">
          <WavyText text={t("description")} />
        </h2>
      </div>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 w-[90%] md:w-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-6 py-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 shadow-lg">
          {/* 1) Program title */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-lg md:text-3xl font-medium text-gray-800">
            Dakhla is Calling…
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 border-l border-gray-300" />

          {/* 2) Duration */}
          <div className="flex flex-col items-center md:items-start text-sm">
            <span className="uppercase text-gray-500 tracking-wider">
              {t('duration')}
            </span>
            <span className="font-semibold text-gray-800">
            {t("days")}
            </span>
          </div>

          <div className="hidden md:block h-8 border-l border-gray-300" />

          

          {/* 4) CTA */}
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-5 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition"
          >
            {t('callButton')}
          </button>
        </div>
      </div>
    </section>
  );
}
