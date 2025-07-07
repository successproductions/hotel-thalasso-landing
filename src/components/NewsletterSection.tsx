// components/NewsletterSection.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function NewsletterSection() {
  const t = useTranslations("exclusiveOffer");

  return (
    <section
      className="relative h-[400px] md:h-[500px] bg-center bg-cover"
      style={{ backgroundImage: `url("/images/news-bg.jpg")` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center space-y-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-serif text-white">
          {t("title")}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-white/80 uppercase tracking-wide">
          {t("description")}
        </p>

        {/* Next session */}
        <p className="text-sm md:text-base text-white/90">
          {t("nextSession")}
        </p>

        {/* Just the button, no email input */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <a
        href="#contact"
        style={{
          padding: "12px 32px",
          background: "#14b8a6",
          color: "#fff",
          fontSize: "1.325rem",
          fontWeight: 400,
          borderRadius: "9999px",
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(20,184,166,0.15)"
        }}
      >
{t('callButton')}
      </a>
    </div>

      </div>
    </section>
  );
}
