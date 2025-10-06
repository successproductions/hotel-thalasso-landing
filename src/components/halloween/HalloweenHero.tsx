'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!heroRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Text animation from left
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'back.out(1.7)',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('reservation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 w-full h-full lg:hidden">
        <Image
          src="/images/halloweenHeroSectionMobile.png"
          alt="Halloween Hero Background Mobile"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>

      {/* Background Image - Desktop */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <Image
          src="/images/halloweenHeroSection.png"
          alt="Halloween Hero Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content */}
            <div ref={textRef} className="space-y-6">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 drop-shadow-lg"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Hello,
                <br />
                Halloween!
              </h1>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-md" style={{ fontFamily: 'Cinzel, serif' }}>
                Séjour Exceptionnel!
              </h2>

              <p className="text-gray-800 text-lg leading-relaxed max-w-md drop-shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
                Vivez une expérience unique entre frissons et détente à Dakhla Club.
                Soirée costumée, dîner thématique, animations et spa face à la lagune.
              </p>

              <button
                ref={buttonRef}
                onClick={scrollToForm}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-600 font-bold text-lg rounded-md overflow-hidden transition-all duration-300 hover:text-white shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span style={{ fontFamily: 'Cinzel, serif' }}>RÉSERVER MAINTENANT</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>

              <div className="pt-4">
                <p className="text-orange-600 text-sm font-semibold uppercase tracking-wider drop-shadow-sm">
                  Du 30 Octobre au 2 Novembre 2025
                </p>
              </div>
            </div>

            {/* Right side - empty to show background image */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
