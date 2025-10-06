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
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Halloween Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-16 h-16">
          <Image src="/images/pumpkinIcon.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-20 right-20 text-6xl">👻</div>
        <div className="absolute bottom-20 left-20 text-6xl">🦇</div>
        <div className="absolute bottom-10 right-10 w-16 h-16">
          <Image src="/images/pumpkinIcon.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-1/2 left-1/4 text-6xl">🕷️</div>
        <div className="absolute top-1/3 right-1/3 text-6xl">🦇</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6 relative">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-600"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}>
                🎃 Offre Spéciale Halloween 🎃
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Du 30 Octobre au 2 Novembre 2025
            </p>
            <div className="inline-block bg-black text-orange-400 px-6 py-2 rounded-lg border-2 border-orange-500 animate-pulse">
              <span className="font-bold text-lg">⚠️ Places Limitées ⚠️</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div
            ref={timerRef}
            className="relative mb-12"
          >
            {/* Spooky Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-600 to-orange-500 rounded-3xl opacity-20 blur-xl"></div>

            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-orange-500"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23fff'/%3E%3Cpath d='M30 30L0 0h60L30 30z' fill='%23fef3c7' fill-opacity='0.2'/%3E%3C/svg%3E")`,
                   backgroundSize: '30px 30px'
                 }}>
              <div className="text-center mb-8">
                <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                  Le Compte à Rebours Commence...
                </p>
                <p className="text-orange-600 font-semibold">Ne ratez pas cette occasion unique !</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {[
                  { value: timeLeft.days, label: 'Jours', emoji: '🎃' },
                  { value: timeLeft.hours, label: 'Heures', emoji: '👻' },
                  { value: timeLeft.minutes, label: 'Minutes', emoji: '🦇' },
                  { value: timeLeft.seconds, label: 'Secondes', emoji: '🕷️' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="relative bg-white m-1 rounded-xl p-4 md:p-6 border-2 border-orange-300">
                      <div className="text-2xl mb-2">{item.emoji}</div>
                      <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs md:text-sm text-gray-700 uppercase font-semibold">
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
              <div key={index} className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl p-6 border-2 border-orange-300 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="text-5xl mb-4 text-center">{item.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: 'Cinzel, serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="relative group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-xl md:text-2xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-orange-400"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              <span className="relative z-10">🎃 Réservez Votre Séjour Halloween 🎃</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <p className="mt-6 text-gray-600 text-lg font-semibold">
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
