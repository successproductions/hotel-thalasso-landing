'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HalloweenLimitedOffer() {
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
      className="py-6 md:py-9 relative overflow-hidden"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6 relative">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-3xl opacity-30" style={{ background: 'linear-gradient(to right, #84bbca, #84bbca, #84bbca)' }}></div>

              <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-normal text-transparent bg-clip-text flex items-center gap-4 justify-center"
                  style={{
                    fontFamily: 'var(--font-creepster)',
                    background: 'linear-gradient(to right, #84bbca, #a0d2de, #84bbca)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(132, 187, 202, 0.6))'
                  }}>
                <Image src="/images/pumpkinIcon.png" alt="" width={60} height={60} className="inline-block drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
                Offre Spéciale Halloween
                <Image src="/images/pumpkinIcon.png" alt="" width={60} height={60} className="inline-block drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
              </h2>
            </div>
            <p className="text-xl md:text-2xl font-semibold mb-4" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif', color: '#84bbca' }}>
              Du 30 Octobre au 2 Novembre 2025
            </p>
            <div className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full border-2 border-yellow-400 shadow-lg shadow-orange-500/50 animate-pulse">
              <span className="font-bold text-lg">⚠️ Places Limitées ⚠️</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div
            ref={timerRef}
            className="relative mb-12"
          >
            {/* Spooky Border */}
            <div className="absolute inset-0 rounded-3xl opacity-30 blur-2xl" style={{ background: 'linear-gradient(to right, #84bbca, #84bbca, #84bbca)' }}></div>

            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4" style={{ borderColor: 'rgba(132, 187, 202, 0.5)' }}>
              <div className="text-center mb-8">
                <p className="text-2xl md:text-3xl font-normal text-transparent bg-clip-text mb-2"
                   style={{
                     fontFamily: 'var(--font-creepster)',
                     background: 'linear-gradient(to right, #84bbca, #a0d2de, #84bbca)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     filter: 'drop-shadow(0 0 15px rgba(132, 187, 202, 0.5))'
                   }}>
                  Le Compte à Rebours Commence...
                </p>
                <p className="font-semibold" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif', color: '#84bbca' }}>Ne ratez pas cette occasion unique !</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {[
                  { value: timeLeft.days, label: 'Jours', icon: '/images/pumpkinIcon.png' },
                  { value: timeLeft.hours, label: 'Heures', icon: '/images/hallowenn/gostIcon.png' },
                  { value: timeLeft.minutes, label: 'Minutes', icon: '/images/hallowenn/batIcon.png' },
                  { value: timeLeft.seconds, label: 'Secondes', icon: '/images/hallowenn/spider.png' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <div className="absolute inset-0 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-50" style={{ background: 'linear-gradient(to bottom right, #84bbca, #84bbca)' }}></div>
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 m-1 rounded-xl p-4 md:p-6 border-2 shadow-xl" style={{ borderColor: 'rgba(132, 187, 202, 0.5)' }}>
                      <div className="relative w-10 h-10 mx-auto mb-2">
                        <Image src={item.icon} alt="" fill className="object-contain" />
                      </div>
                      <div className="text-4xl md:text-5xl text-center font-bold mb-2"
                           style={{ color: '#84bbca', textShadow: '0 0 10px rgba(132, 187, 202, 0.5)' }}>
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs md:text-sm text-center uppercase font-semibold" style={{ color: '#84bbca' }}>
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Halloween Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { emoji: '🎃', title: 'Soirée Costumée', desc: 'DJ & Animations' },
              { emoji: '🍽️', title: 'Menu Thématique', desc: 'Dîner Spécial' },
              { emoji: '🎁', title: 'Cadeaux Offerts', desc: '500 DHS Spa' }
            ].map((item, index) => (
              <div key={index} className="relative group rounded-2xl p-6 border-2 transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm"
                   style={{
                     borderColor: 'rgba(132, 187, 202, 0.5)',
                   }}
                   onMouseEnter={(e) => e.currentTarget.style.borderColor = '#84bbca'}
                   onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(132, 187, 202, 0.5)'}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom right, rgba(132, 187, 202, 0.1), rgba(132, 187, 202, 0.1))' }}></div>
                <div className="relative">
                  <div className="text-5xl mb-4 text-center">{item.emoji}</div>
                  <h3 className="text-xl font-normal mb-2 text-center"
                      style={{
                        fontFamily: 'var(--font-creepster)',
                        color: '#84bbca',
                        textShadow: '0 0 10px rgba(132, 187, 202, 0.3)'
                      }}>
                    {item.title}
                  </h3>
                  <p className="text-center" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif', color: '#84bbca' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-2 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ background: 'linear-gradient(to right, #84bbca, #84bbca, #84bbca)' }}></div>
              <button
                onClick={scrollToForm}
                className="relative text-white font-normal text-xl md:text-2xl px-12 py-6 rounded-full shadow-2xl transform transition-all duration-300 border-2 hover:brightness-110"
                style={{
                  fontFamily: 'var(--font-creepster)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(to right, #84bbca, #a0d2de)',
                  borderColor: '#a0d2de'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                🎃 Réservez Votre Séjour Halloween 🎃
              </button>
            </div>
            <p className="mt-6 text-lg font-semibold" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif', color: '#84bbca' }}>
              ⏰ Offre limitée • 🔒 Paiement sécurisé • ⚡ Confirmation immédiate
            </p>
          </div>
        </div>
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
