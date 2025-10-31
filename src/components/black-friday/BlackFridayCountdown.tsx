'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function BlackFridayCountdown() {
  const t = useTranslations('blackFriday.countdown');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Set your Black Friday end date here
  const endDate = new Date('2025-11-30T23:59:59').getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !imageRef.current || !timerRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );

      // Timer animation
      gsap.fromTo(
        timerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: timerRef.current,
            start: 'top 80%',
          },
        }
      );

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t('days') },
    { value: timeLeft.hours, label: t('hours') },
    { value: timeLeft.minutes, label: t('minutes') },
  ];

  return (
    <section id="countdown" ref={sectionRef} className="relative py-12 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div ref={titleRef} className="text-center space-y-4 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-normal  text-[#5ba6a9] uppercase leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-normal text-[#c4b89a] leading-tight">
              {t('description')}
            </p>
          </div>

          {/* Image with Countdown Overlay */}
          <div ref={imageRef} className="relative  overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div className="relative w-full aspect-[3/4] md:aspect-[4/3] bg-gray-200">
              <Image
                src="/images/5.jpg"
                alt="Black Friday Countdown"
                fill
                className="object-cover"
                priority
                quality={90}
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            </div>

            {/* Countdown Badge */}
            <div className="absolute top-1/2 lg:top-[calc(50%+45px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
              <div className="bg-black/80 backdrop-blur-sm text-white text-center py-3 px-6 rounded-t-3xl">
                <span className="text-lg md:text-xl font-bold uppercase tracking-wider">
                  COUNTDOWN
                </span>
              </div>
            </div>

            {/* Countdown Timer Overlay */}
            <div
              ref={timerRef}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-[#d7c9ad] to-[#5ba6a9]
                        p-6 md:p-8"
            >
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
                {timeUnits.map((unit, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-black rounded-2xl p-4 md:p-6 mb-2 shadow-xl">
                      <div className="text-4xl md:text-6xl lg:text-7xl font-mono font-black text-white">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-sm md:text-lg font-bold text-white uppercase tracking-wider">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom text */}
              <p className="text-center text-sm md:text-base font-normal text-gray-100">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 md:mt-12">
            <a
              ref={ctaRef}
              href="#reservation"
              className="inline-block px-10 py-5 bg-[#5ba6a9] text-white text-lg md:text-xl font-normal
                       hover:bg-[#4a9599] transition-all duration-300 transform hover:scale-105
                       shadow-2xl hover:shadow-[#5ba6a9]/50 cursor-pointer uppercase tracking-wider"
            >
              {t('cta')}
              <span className="inline-block ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
