'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenWhy() {
  const t = useTranslations('halloween');
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation from left
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      // Image animation from right
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('reservation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reasons = [
    {
      icon: '/images/1.jpg',
      text: t('why.reasons.allInclusive'),
    },
    {
      icon: '/images/5.jpg',
      text: t('why.reasons.atmosphere'),
    },
    {
      icon: '/images/8.jpg',
      text: t('why.reasons.experience'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="pt-8 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-transparent bg-clip-text"
                style={{
                  fontFamily: 'var(--font-creepster)',
                  background: 'linear-gradient(to right, #5ea7aa, #a0d2de, #5ea7aa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              {t('why.title')}
            </h2>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border rounded-xl p-6 transition-all duration-300 shadow-sm"
                  style={{
                    backgroundColor: 'rgba(132, 187, 202, 0.05)',
                    borderColor: 'rgba(132, 187, 202, 0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5ea7aa'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)'}
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
                    <Image
                      src={reason.icon}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="md:text-lg text-xs  text-gray-800 pt-5 md:pt-4" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>{reason.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div ref={imageRef} className="relative">
            <Image
              src="/images/hallowenn/DSC09978-Edit1.png"
              alt="Halloween Dakhla Club"
              width={800}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

            {/* CTA Button */}
            <div className="text-center mt-6">
              <button
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
                {t('why.cta')}
              </button>
            </div>
      </div>
    </section>
  );
}
