'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100, scale: 0.8 },
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

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 100 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reasons = [
    {
      icon: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&q=80',
      text: 'Séjour All Inclusive au bord de la lagune',
    },
    {
      icon: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&q=80',
      text: 'Atmosphère unique, festive et familiale',
    },
    {
      icon: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&q=80',
      text: 'Expérience combinant détente & animations',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Image Section */}
          <div ref={imageRef} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-500/50">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
                alt="Dakhla Club Lagoon"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full p-8 shadow-2xl animate-pulse border-4 border-orange-300">
              <div className="text-center">
                <div className="text-xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>HALLOWEEN</div>
                <div className="text-2xl font-bold mt-1">2025</div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: 'Cinzel, serif' }}>
              Pourquoi choisir Dakhla Club ?
            </h2>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-orange-50 border border-orange-300 rounded-xl p-6 hover:border-orange-500 transition-all duration-300 shadow-sm"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
                    <Image
                      src={reason.icon}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-lg text-gray-800 pt-2" style={{ fontFamily: 'Georgia, serif' }}>{reason.text}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 italic text-center mt-8 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              &ldquo;Une expérience magique entre frissons et détente, dans le cadre exceptionnel de Dakhla&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
