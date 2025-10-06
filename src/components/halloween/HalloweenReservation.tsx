'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HalloweenReservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '2025-10-30',
    checkOut: '2025-11-02',
    guests: '2',
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Merci pour votre réservation Halloween ! Nous vous contactons sous peu.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '2025-10-30',
        checkOut: '2025-11-02',
        guests: '2',
      });
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="reservation-form"
      className="py-20 bg-white relative overflow-hidden"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Cinzel, serif' }}>
              Réservez maintenant
            </h2>
            <p className="text-xl text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
              Réservez votre séjour Halloween inoubliable à Dakhla Club
            </p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-orange-50 border-2 border-orange-500 rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-orange-300 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-orange-300 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-orange-300 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  placeholder="+212 XXX XXX XXX"
                />
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-gray-800 font-semibold mb-2">
                  Nombre de personnes *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-orange-300 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'personne' : 'personnes'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in */}
              <div>
                <label htmlFor="checkIn" className="block text-gray-800 font-semibold mb-2">
                  Date d&apos;arrivée
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min="2025-10-30"
                  max="2025-10-31"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-orange-300 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
              </div>

              {/* Check-out */}
              <div>
                <label htmlFor="checkOut" className="block text-gray-800 font-semibold mb-2">
                  Date de départ
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min="2025-11-01"
                  max="2025-11-02"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-orange-300 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xl py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-orange-300"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Je réserve mon séjour Halloween'}
            </button>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">☎</div>
                <span>+212 652 88 19 21</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span>Confirmation immédiate</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
