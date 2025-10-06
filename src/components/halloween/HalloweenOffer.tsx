'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UtensilsCrossed, Music, Trophy, Smile, Sparkles, Gift } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenOffer() {
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
      title: 'Dîner effrayant & menu thématique',
      description: 'Savourez un menu spécial Halloween préparé par nos chefs',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    },
    {
      Icon: Music,
      title: 'Soirée costumée avec DJ',
      description: 'Danse face à la lagune avec notre DJ sous les étoiles',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
    },
    {
      Icon: Trophy,
      title: 'Concours de costumes & prix',
      description: 'Participez au concours et gagnez des prix incroyables',
      image: 'https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=400&q=80',
    },
    {
      Icon: Smile,
      title: 'Activités & maquillage enfants',
      description: 'Animations spéciales et maquillage pour les plus jeunes',
      image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=400&q=80',
    },
    {
      Icon: Sparkles,
      title: 'Massage relaxant post-frissons',
      description: 'Détendez-vous avec un massage à 500 DHS seulement',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
    },
    {
      Icon: Gift,
      title: '500 DHS offerts au Spa Shop',
      description: 'Un bon d\'achat de 500 DHS à utiliser dans notre boutique spa',
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400&q=80',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gray-800"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Offre Halloween
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {offers.map((offer, index) => {
            const IconComponent = offer.Icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="bg-gradient-to-br from-orange-500/10 to-purple-600/10 backdrop-blur-sm border-2 border-orange-500/30 rounded-2xl overflow-hidden hover:border-orange-400 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <IconComponent className="w-16 h-16 text-orange-400" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-300 mb-3 text-center">
                    {offer.title}
                  </h3>
                  <p className="text-gray-300 text-center text-sm">{offer.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
