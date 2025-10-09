'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenScarcity() {
  const t = useTranslations('halloween');
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image animation - slide in from left
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Content animation - slide in from right
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Button pulse animation
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('reservation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-2 pt-6  md:py-12 ">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Warning Badge */}
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border-2"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 159, 64, 0.1))',
                borderColor: 'rgba(255, 107, 107, 0.3)',
              }}
            >
              <AlertTriangle size={24} style={{ color: '#ff6b6b' }} />
              <span
                className=" text-lg"
                style={{
                  color: '#ff6b6b',
                  fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif'
                }}
              >
                {t('scarcity.limitedPlaces')}
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Side */}
            <div ref={imageRef} className="relative">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/hallowenn/halloweenscarcity.png"
                  alt="Halloween Limited Availability"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content Side */}
            <div ref={contentRef} className="space-y-6">
              {/* Main Headline */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight"
                style={{
                  fontFamily: 'var(--font-creepster)',
                  background: 'linear-gradient(to right, #5ea7aa, #a0d2de, #5ea7aa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('scarcity.headline')}
              </h2>

              {/* Body Text */}
              <p
                className="text-lg md:text-xl text-gray-700 leading-relaxed"
                style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
              >
                {t('scarcity.body')}
              </p>

              {/* Urgency Message */}
              <div
                className="p-6 rounded-2xl backdrop-blur-sm border-l-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(94, 167, 170, 0.1), rgba(132, 187, 202, 0.1))',
                  borderColor: '#5ea7aa',
                }}
              >
                <p
                  className="text-base md:text-lg "
                  style={{
                    color: '#5ea7aa',
                    fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif',
                  }}
                >
                  {t('scarcity.urgency')}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  ref={buttonRef}
                  onClick={scrollToForm}
                  className="w-full md:w-auto px-10 py-5 rounded-full text-white font-normal text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #5ea7aa, #84bbca)',
                    fontFamily: 'var(--font-creepster)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(94, 167, 170, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(94, 167, 170, 0.3)';
                  }}
                >
                  {t('scarcity.cta')}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
