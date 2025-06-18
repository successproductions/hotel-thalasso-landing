'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";


export function Hero() {
   const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      // hide as soon as you scroll 50px
      setShowIndicator(window.scrollY < 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

const services = [
   { id: 'bolDAirJacquier',  icon: '🌬️' },
   { id: 'hydroMassageBath',  icon: '💦' },
   { id: 'seaweedWrap',       icon: '🪻' },
   { id: 'affusionMassage',   icon: '💧' },
   { id: 'traditionalHammam', icon: '🧖‍♀️' },
   { id: 'cuppingTherapy',    icon: '🫙' }
 ];

const tHero    = useTranslations('hero');
 const tService = useTranslations('servicesSection');


  return (
    <div className="w-full" id="accueil">
      {/* Hero Section */}
      <div className="relative h-[700px] md:h-[600px] lg:h-[800px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Left Image */}
          <div className="hidden md:block relative">
            <Image src="/images/hydro_massage.png" alt="Spa oil treatment" fill className="object-cover" />
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center px-6 py-12 bg-[#eeede7] dark:bg-[#090b11] text-center">
            <div className="max-w-md space-y-6">
<div className="space-y-2">
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
    className="text-sm font-trajan tracking-widest text-stone-600 uppercase dark:text-stone-200"
  >
    {tHero('tagline')}
  </motion.p>

  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
    className="text-3xl md:text-4xl lg:text-5xl font-trajan text-stone-800 leading-tight dark:text-stone-200"
  >
    {tHero('headline')}
  </motion.h1>
</div>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
  className="text-stone-600 leading-relaxed text-sm md:text-base mt-4 dark:text-stone-200"
>
  {tHero('description')}
</motion.p>

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.8, duration: 0.6 }}
>
  <Button
    className="relative overflow-hidden px-8 py-3 bg-green-900 text-white font-trajan tracking-wide rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-green-800 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    size="lg"
    onClick={() => {
             const el = document.getElementById('services');
             el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
           }}
  >
    <span className="z-10 relative">{tHero('cta')}</span>
    <span className="absolute inset-0 bg-white opacity-10 blur-md scale-110 group-hover:opacity-20 transition-opacity duration-500" />
  </Button>
</motion.div>

            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block relative">
            <Image src="/images/Piscine_thermale.png"   alt="Hot stone therapy" fill className="object-cover" />
          </div>
        </div>

        {/* Mobile Hero Image */}
        <div className="md:hidden absolute inset-0 -z-10">
          <Image
            src="/Piscine_thermale.png"
            width={800}
            height={600}
            alt="piscine thermale"
            fill
            className="object-cover opacity-20"
            
          />
        </div>
      </div>

        <div className="max-w-6xl mx-auto">
{/* Services Section */}
<div className=" py-11 px-6 transition-colors dark:bg-[#090b11]">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-2xl md:text-4xl font-trajan text-stone-800 dark:text-stone-100">
       {tService('title')}
    </h2>
    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
      {tService('description')}
    </p>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {services.map(({ id, icon }, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl group-hover:rotate-6 transition-transform">
                  {icon}
                </span>
              </div>
              <h3 className="mt-4 text-xs font-semibold text-stone-700 dark:text-stone-100 uppercase tracking-wide">
                {tHero(`services.${id}`)}
              </h3>
            </div>
          ))}
        </div>
</div>

        </div>
            {showIndicator && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <ChevronDown className="w-6 h-6 text-stone-600 dark:text-stone-300" />
        </motion.div>
      )}
    </div>
    );
    }