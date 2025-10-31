'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function BlackFridayExperience() {
  const t = useTranslations('blackFriday.experience');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Modern image-based experiences using your actual images
  const experiences = [
    {
      key: 'rooms',
      image: '/images/black-friday/chambres.jpg',
    },
    {
      key: 'restaurant',
      image: '/images/black-friday/restaurant.jpeg',
    },
    {
      key: 'spa',
      image: '/images/black-friday/spa.jpg',
    },
    {
      key: 'kitesurf',
      image: '/images/black-friday/kitesurf.jpg',
    },
    {
      key: 'pool',
      image: '/images/black-friday/piscine.jpg',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards staggered animation
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-gradient-to-b bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-normal  text-[#5ba6a9] mb-4 md:mb-6 uppercase">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl text-[#d7c9ad] mb-4">
            {t('subtitle')}
          </p>
          <p className="text-sm md:text-xl text-gray-600 font-normal">
            {t('description')}
          </p>
        </div>

        {/* Modern Grid Layout - Masonry Style */}
        <div ref={cardsRef} className="max-w-7xl mx-auto mb-12">
          {/* Desktop: 3 columns | Tablet: 2 columns | Mobile: 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={exp.key}
                className={`experience-card group relative overflow-hidden  shadow-lg hover:shadow-2xl
                          transition-all duration-500 ${
                            // Card 0 (rooms): 3 rows, Card 2 (spa): 2 rows, Card 3 (kitesurf): 2 rows
                            index === 0 ? 'lg:row-span-3' :
                            index === 2 ? 'lg:row-span-3' :
                            index === 3 ? 'lg:row-span-1' : ''
                          }`}
              >
                {/* Image */}
                <div className="relative w-full h-64 lg:h-full min-h-[300px] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={t(`items.${exp.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Hover Color Overlay */}
                  <div className="absolute inset-0 bg-[#5ba6a9]/0 group-hover:bg-[#5ba6a9]/10 transition-all duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0
                              group-hover:translate-y-[-10px] transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-normal mb-2 drop-shadow-lg">
                    {t(`items.${exp.key}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed drop-shadow-md
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                    {t(`items.${exp.key}.description`)}
                  </p>
                </div>

                {/* Top Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-4 right-4 w-12 h-1 bg-[#d7c9ad]" />
                  <div className="absolute top-4 right-4 w-1 h-12 bg-[#d7c9ad]" />
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* CTA Section */}
        <div className="text-center">
          <a
            ref={ctaRef}
            href="#reservation"
            className="inline-block px-4 md:px-12 py-6 bg-[#5ba6a9] text-white text-xl md:text-2xl font-normal
                    hover:bg-[#4a9599] transition-all duration-500 transform hover:scale-105
                    shadow-2xl hover:shadow-[#5ba6a9]/50 cursor-pointer uppercase tracking-wider"
          >
            {t('cta')}
      
          </a>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#d7c9ad]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#5ba6a9]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
