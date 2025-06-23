"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Hero5() {
  const t = useTranslations("offer5.hero");
  const images = [
    "/images/DJI_0070.png",
    "/images/hydro_massage.png",
    "/images/centrethalassoDakhla.jpg",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className='relative h-[70vh] w-full overflow-hidden mt-20 rounded-2xl'>
      {/* Animated cross-fade carousel */}
      <div className='relative h-full w-full'>
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className='absolute inset-0'>
            <Image
              src={images[current]}
              alt={`${t("alt.hero")} ${current + 1}`}
              fill
              className='object-cover'
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/40 rounded-2xl' />

      {/* Centered content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-6'>
        <p className='text-sm uppercase text-white/80 tracking-widest mb-2'>
          {t("overline")}
        </p>
        <h1 className='font-trajan text-2xl md:text-3xl lg:text-7xl text-white drop-shadow-lg leading-tight max-w-3xl'>
          {t("title")}
        </h1>
        <div className='mt-8'>
          <Button
              className="relative overflow-hidden px-8 py-3 bg-green-900 text-white font-trajan tracking-wide rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-green-800 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              size="lg"
              onClick={() => {
                       const el = document.getElementById('programme');
                       el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }}
            >
              <span className="z-10 relative">{t("ctaPrimary")}</span>
              <span className="absolute inset-0 bg-white opacity-10 blur-md scale-110 group-hover:opacity-20 transition-opacity duration-500" />
            </Button>
        </div>
      </div>

      {/* Bottom-left caption */}
      <p className='absolute bottom-4 left-4 max-w-xs text-white/80 italic text-sm'>
        {t("tagline")}
      </p>

      {/* Bottom-right socials */}
      <div className='absolute bottom-4 right-4 flex space-x-4 text-white/80 text-sm'>
        <a href="https://www.facebook.com/DakhlaClub/" target='_blank' rel='noopener'>
          FB
        </a>
        <a href="https://www.instagram.com/hoteldakhlaclub/" target='_blank' rel='noopener'>
          IG
        </a>
        <a href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY" target='_blank' rel='noopener'>
          YT
        </a>
        <a href="https://www.tiktok.com/@dakhlaclubhotel?_r=1&_d=eec80jahcl3m4g&sec_uid=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&share_author_id=7205863435829543941&sharer_language=fr&source=h5_m&u_code=e6ih6ce9mg3kj5&ug_btm=b8727,b0&social_share_type=4&utm_source=copy&sec_user_id=MS4wLjABAAAADARMZsKCuqIf7jXLvKH9cUwpN_XYQepPD2WVmf-o43PiQv2KCVp9jL4qzuc4Sil4&tt_from=copy&utm_medium=ios&utm_campaign=client_share&enable_checksum=1&user_id=7205863435829543941&share_link_id=080768DC-CD71-466C-B232-9A202D618A60&share_app_id=1233" target='_blank' rel='noopener'>
          TK
        </a>
      </div>
    </section>
  );
}
