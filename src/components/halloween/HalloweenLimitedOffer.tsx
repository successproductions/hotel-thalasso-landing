'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HalloweenLimitedOffer() {
  const t = useTranslations('halloween');
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Timer animation
      gsap.fromTo(
        timerRef.current,
        { opacity: 0, scale: 0.5, rotationY: 180 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: timerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-10-30T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('reservation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="pt-12 md:py-9 relative overflow-hidden"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-2">
            <div className="inline-block mb-6 relative">
              {/* Glow effect */}
              <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-normal text-transparent bg-clip-text flex items-center gap-4 justify-center"
                  style={{
                    fontFamily: 'var(--font-creepster)',
                    background: 'linear-gradient(to right, #5ea7aa, #5ea7aa, #84bbca)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                <Image src="/images/pumpkinIcon.png" alt="" width={60} height={60} className="inline-block drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
                {t('limitedOffer.title')}
                <Image src="/images/pumpkinIcon.png" alt="" width={60} height={60} className="inline-block drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
              </h2>
            </div>
            {/* <p className="text-sm md:text-2xl  mb-4" style={{ fontFamily: 'Futura', color: '#84bbca' }}>
              {t('limitedOffer.dates')}
            </p> */}

          </div>

          {/* Countdown Timer */}
          <div
            ref={timerRef}
            className="relative mb-12"
          >
            {/* Spooky Border */}
            <div className="absolute inset-0 rounded-3xl opacity-30 blur-2xl" ></div>

            <div className="relative bg-gradient-to-br  rounded-3xl p-8 md:p-12 shadow-2xl border-4" style={{ borderColor: '#5ea7aa' }}>
              <div className="text-center mb-8">
                <p className="text-2xl md:text-3xl font-normal text-gray-800 text-transparent bg-clip-text mb-2"
                   style={{
                     background: 'linear-gradient(to right, #1e2b38, #1e2b38, #1e2b38)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     filter: 'drop-shadow(0 0 15px rgba(132, 187, 202, 0.5))'
                   }}>
                  {t('limitedOffer.countdown.title')}
                </p>
                {/* <p className="" style={{ fontFamily: 'Futura', color: '#84bbca' }}>{t('limitedOffer.countdown.subtitle')}</p> */}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {[
                  { value: timeLeft.days, label: t('limitedOffer.countdown.days'), icon: '/images/pumpkinIcon.png' },
                  { value: timeLeft.hours, label: t('limitedOffer.countdown.hours'), icon: '/images/hallowenn/gostIcon.png' },
                  { value: timeLeft.minutes, label: t('limitedOffer.countdown.minutes'), icon: '/images/hallowenn/batIcon.png' },
                  { value: timeLeft.seconds, label: t('limitedOffer.countdown.seconds'), icon: '/images/hallowenn/spider.png' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <div className="absolute inset-0 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-50" ></div>
                    <div className="relative  m-1 rounded-xl p-4 md:p-6 border-2 shadow-xl" style={{ borderColor: '#5ea7aa' }}>
                      <div className="relative w-10 h-10 mx-auto mb-2">
                        <Image src={item.icon} alt="" fill className="object-contain" />
                      </div>
                      <div className="text-4xl md:text-5xl text-center font-bold mb-2"
                           style={{ color: '#84bbca', textShadow: '0 0 10px rgba(132, 187, 202, 0.5)' }}>
                        {String(item.value).padStart(2, '0')}
                      </div>
                        <div className="text-xs md:text-sm text-center uppercase " style={{ color: '#84bbca' }}>
                          {item.label}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='text-center mb-6'>
                        <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border-2"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 159, 64, 0.1))',
                borderColor: 'rgba(255, 107, 107, 0.3)',
              }}
            >
              <AlertTriangle size={24} style={{ color: '#ff6b6b' }} />
              <span
                className="text-lg"
                style={{
                  color: '#ff6b6b',
                  fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif'
                }}
              >
                {t('limitedOffer.limitedPlaces')}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            
            <div className="relative inline-block group">
              <div className="absolute -inset-2 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" ></div>
              <button
                onClick={scrollToForm}
                className="relative mb-4 md:mb-2 text-white font-normal text-xl md:text-2xl px-6 py-6 rounded-full shadow-1xl transform transition-all duration-300 border-2 hover:brightness-110"
                style={{
                  fontFamily: 'var(--font-creepster)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(to right, #5ea7aa, #5ea7aa)',
                  borderColor: '#a0d2de'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {t('limitedOffer.button')}
              </button>
            </div>
            {/* <p className="mt-6 text-lg " style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif', color: '#84bbca' }}>
              {t('limitedOffer.info')}
            </p> */}
          </div>
        </div>
       {/* CTA Button */}

            </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  );
}
