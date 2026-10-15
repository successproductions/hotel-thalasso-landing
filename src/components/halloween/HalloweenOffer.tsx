'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UtensilsCrossed, Music, Trophy, Brush, Drum, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenOffer() {
  const t = useTranslations('halloween');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

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

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );

          // Hover animation
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const offers = [
    {
      Icon: UtensilsCrossed,
      title: t('offer.items.dinner.title'),
      description: t('offer.items.dinner.desc'),
      image: '/images/hallowenn/menu.png',
    },
    {
      Icon: Music,
      title: t('offer.items.party.title'),
      description: t('offer.items.party.desc'),
      image: '/images/hallowenn/SOIREE.png',
    },
    {
      Icon: Trophy,
      title: t('offer.items.contest.title'),
      description: t('offer.items.contest.desc'),
      image: '/images/hallowenn/MAQUILLAGE.png',
    },
    {
      Icon: Brush,
      title: t('offer.items.makeup.title'),
      description: t('offer.items.makeup.desc'),
      image: '/images/hallowenn/COSTUMES.png',
    },
    {
      Icon: Drum,
      title: t('offer.items.dance.title'),
      description: t('offer.items.dance.desc'),
      image: '/images/hallowenn/DANSE.png',
    },
    {
      Icon: Sparkles,
      title: t('offer.items.ambiance.title'),
      description: t('offer.items.ambiance.desc'),
      image: '/images/hallowenn/ENSORCELANTE.png',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-2 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-center mb-1 text-transparent bg-clip-text"
          style={{
            fontFamily: 'var(--font-creepster)',
            background: 'linear-gradient(to right, #5ea7aa, #a0d2de, #5ea7aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {t('offer.title')}
        </h2>
        <p className="mb-5 text-xl md:text-2xl  text-center text-gray-800" style={{ fontFamily: 'Futura' }}>{t('offer.description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {offers.map((offer, index) => {
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="backdrop-blur-sm border-2 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(132, 187, 202, 0.1), rgba(132, 187, 202, 0.1))',
                  borderColor: 'rgba(132, 187, 202, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5ea7aa'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.3)'}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover "
                  />


                </div>
                <div className="p-6">
                  <h3 className="text-xl font-normal  text-center" style={{ fontFamily: 'var(--font-creepster)', color: '#5ea7aa' }}>
                    {offer.title}
                  </h3>
                  <p className="text-gray-700 text-center text-sm" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>{offer.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
