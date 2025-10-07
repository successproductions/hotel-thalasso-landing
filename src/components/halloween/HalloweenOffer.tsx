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
      image: '/images/Restaurant.jpg',
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
      image: '/images/1.jpg',
    },
    {
      Icon: Smile,
      title: 'Activités & maquillage enfants',
      description: 'Animations spéciales et maquillage pour les plus jeunes',
      image: '/images/3.jpg',
    },
    {
      Icon: Sparkles,
      title: 'Massage relaxant post-frissons',
      description: 'Détendez-vous avec un massage à 500 DHS seulement',
      image: '/images/Salle-de-massage.png',
    },
    {
      Icon: Gift,
      title: '500 DHS offerts au Spa Shop',
      description: 'Un bon d\'achat de 500 DHS à utiliser dans notre boutique spa',
      image: '/images/2.jpg',
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
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-center mb-8 text-transparent bg-clip-text"
          style={{
            fontFamily: 'var(--font-creepster)',
            background: 'linear-gradient(to right, #5ea7aa, #a0d2de, #5ea7aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Offre Halloween
        </h2>

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
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                </div>
                <div className="p-6">
                  <h3 className="text-xl font-normal mb-3 text-center" style={{ fontFamily: 'var(--font-creepster)', color: '#5ea7aa' }}>
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
