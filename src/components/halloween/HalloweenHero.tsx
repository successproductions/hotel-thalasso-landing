'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenHero() {
  const t = useTranslations('halloween');
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // Image animation from right
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
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
      className="relative min-h-screen flex items-center pt-24 pb-12 md:py-8 bg-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hallowenn/1107622.png"
          alt="Halloween Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Content */}
            <div ref={textRef} className="space-y-6 lg:col-span-2">
              <h1
                className="text-5xl md:mt-4  md:text-6xl lg:text-7xl font-normal text-transparent bg-clip-text drop-shadow-lg"
                style={{
                  fontFamily: 'var(--font-creepster)',
                  background: 'linear-gradient(to right, #5ea7aa, #5ea7aa, #5ea7aa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {t('hero.title')}
                <br />
                {t('hero.titleLine2')}
              </h1>

              <h2 className="text-3xl md:text-4xl font-normal drop-shadow-md" style={{ fontFamily: 'var(--font-creepster)', color: '#5ea7aa' }}>
                {t('hero.subtitle')}
              </h2>

              <p className="text-white text-lg leading-relaxed max-w-md" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
                {t('hero.description')}
              </p>

              <button
                ref={buttonRef}
                onClick={scrollToForm}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 font-bold text-lg rounded-md overflow-hidden transition-all duration-300 hover:text-white shadow-lg"
                style={{ borderColor: '#84bbca', color: '#84bbca' }}
              >
                <span className="relative z-10 flex items-center gap-3 hover:text-white">
                  <span style={{ fontFamily: 'var(--font-creepster)' }}>{t('hero.button2')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #5ea7aa , #a0d2de)' }} />
              </button>

              <div className="pt-4">
                <p className="text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif', color: '#5ea7aa' }}>
                  {t('hero.dates')}
                </p>
              </div>
            </div>

            {/* Right side - Image */}
            <div ref={imageRef} className="flex justify-center items-center lg:col-span-3">
              <Image
                src="/images/imagehalloween.png"
                alt="Halloween Dakhla Club"
                width={1200}
                height={1200}
                className="w-[88%] h-auto scale-125"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
