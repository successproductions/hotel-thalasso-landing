'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

/** Source images are square-ish but not identical, so each sits in a fixed
 *  square box and is contained rather than cropped — a distorted award badge
 *  reads as sloppy. */
const AWARDS = [
  { src: '/images/hallowenn/AWARDS.png', key: 'award1' },
  { src: '/images/hallowenn/TripAdvisor-1.png', key: 'award2' },
  { src: '/images/hallowenn/trip.jpeg', key: 'award3' },
] as const;

export default function HalloweenRewards() {
  const t = useTranslations('halloween');
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !itemsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current!.children, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center md:mb-14">
          <h2
            className="mb-3 text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-creepster)', color: '#7eb8c6' }}
          >
            {t('rewards.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-900 leading-relaxed"
            style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
            {t('rewards.subtitle')}
          </p>
        </div>

        <div
          ref={itemsRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
        >
          {AWARDS.map((award) => (
            <div key={award.key} className="flex flex-col items-center">
              <div
                className="relative h-40 w-40 overflow-hidden rounded-full border-2 bg-white md:h-48 md:w-48"
                style={{ borderColor: '#5ea7aa' }}
              >
                <Image
                  src={award.src}
                  alt={t(`rewards.${award.key}.alt`)}
                  fill
                  sizes="(max-width: 640px) 160px, 192px"
                  className="object-contain p-3"
                />
              </div>
              <p
                className="mt-4 text-center text-sm font-semibold md:text-base"
                style={{ color: '#5ea7aa' }}
              >
                {t(`rewards.${award.key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
