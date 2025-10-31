'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BlackFridayHero() {
  const t = useTranslations('blackFriday.hero');
  const tNav = useTranslations('blackFriday.nav');
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Carousel images - Update these paths with your actual images
  const carouselImages = [
    '/images/black-friday/carousel-1.jpg',
    '/images/black-friday/carousel-2.jpg',
    '/images/black-friday/carousel-3.jpg',
    '/images/black-friday/carousel-4.jpg',
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      // Hero content animation - fade in from left
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // CTA button animation - scale + fade
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 1,
        }
      );

      // Carousel animation - fade in from right
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          {
            opacity: 0,
            x: 100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.5,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCTA = () => {
    const reservationSection = document.getElementById('reservation');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      {/* Navbar - Fixed/Sticky */}
      <nav className={`fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg rounded-2xl px-6 md:px-16 transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between gap-2 md:gap-12 h-16 md:h-18">
            {/* Left - Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/images/LogoDakhla.png"
                alt="Dakhla Club Logo"
                width={80}
                height={50}
                className="object-contain"
                priority
              />
            </div>

            {/* Center - Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-800 hover:text-bf-turquoise transition-colors text-xs font-medium tracking-wider uppercase"
              >
                {tNav('home')}
              </button>
              <button
                onClick={() => scrollToSection('countdown')}
                className="text-gray-800 hover:text-bf-turquoise transition-colors text-xs font-medium tracking-wider uppercase"
              >
                {tNav('offer')}
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-gray-800 hover:text-bf-turquoise transition-colors text-xs font-medium tracking-wider uppercase"
              >
                {tNav('experience')}
              </button>
            </div>

            {/* Right - Reserve Button (Desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection('reservation')}
                className="px-6 py-2 bg-bf-turquoise text-white font-semibold hover:bg-[#d7c9ad] transition-all duration-300 text-xs tracking-wider uppercase rounded-1xl"
              >
                {tNav('reservation')}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-800 hover:text-bf-turquoise  transition-colors p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Menu - Full Screen Overlay from Right */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 animate-fadeIn">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel - Slides from Right */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl animate-slideInRight">
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <div className="flex justify-end p-4 border-b border-gray-200">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-800 hover:text-bf-turquoise transition-colors"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-6 pt-8 pb-6 space-y-6">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="block w-full text-left text-gray-800 hover:text-bf-turquoise transition-colors py-4 px-4 text-xl font-medium uppercase border-b border-gray-100"
                >
                  {tNav('home')}
                </button>
                <button
                  onClick={() => scrollToSection('countdown')}
                  className="block w-full text-left text-gray-800 hover:text-bf-turquoise transition-colors py-4 px-4 text-xl font-medium uppercase border-b border-gray-100"
                >
                  {tNav('offer')}
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className="block w-full text-left text-gray-800 hover:text-bf-turquoise transition-colors py-4 px-4 text-xl font-medium uppercase border-b border-gray-100"
                >
                  {tNav('experience')}
                </button>

                {/* Reserve Button */}
                <button
                  onClick={() => scrollToSection('reservation')}
                  className="block w-full text-center bg-bf-turquoise text-white font-medium py-4 px-6 hover:bg-[#d7c9ad] transition-all duration-300 text-lg mt-8  uppercase"
                >
                  {tNav('reservation')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Grid Layout - Split Screen */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT SIDE - Content (Order 2 on mobile, Order 1 on desktop) */}
        <div className="relative flex flex-col justify-between py-2 px-4 md:p-12 lg:p-16 xl:p-44 order-2 lg:order-1">
          {/* Main Content */}
          <div ref={contentRef} className="flex-1 flex flex-col justify-center space-y-2 md:space-y-8">
            {/* Title */}
            <div className="md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-7xl font-normal text-white uppercase leading-none">
                {t('tagline').replace('🖤 ', '')}
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white uppercase tracking-wide">
                BOUTIQUE & RESORTS
              </p>
            </div>

            {/* Description */}
            <div className="md:space-y-4 max-w-xl">
              <p className="text-sm md:text-xl text-white/80 leading-relaxed">
                {t('description')}
              </p>
              <p className="text-sm md:text-xl text-white/80 leading-relaxed">
                {t('highlight')}
              </p>
            </div>

            {/* CTA Button with Discount Badge Image */}
            <div className="md:pt-4">
              <div className="relative inline-block">
                <a
                  ref={ctaRef}
                  href="#reservation"
                  onClick={handleCTA}
                  className="relative inline-block px-6 md:px-10 py-4 bg-[#d7c9ad] text-gray-900 text-lg md:text-xl hover:text-white font-medium
                           hover:bg-[#5ba6a9] transition-all duration-300 transform hover:scale-105
                           shadow-2xl cursor-pointer uppercase tracking-wider z-10"
                >
                  {t('cta').replace('🎯 ', '')}
                </a>

                {/* Discount Badge Image - Overlapping */}
                <div className="absolute -right-8 -top-16 md:-right-28 md:-top-16 w-28 h-28 md:w-44 md:h-44  z-20 pointer-events-none">
                  <Image
                    src="/images/black-friday/30Offe1.png"
                    alt="-30% Off"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Icons - Bottom */}
          <div className="flex gap-6 mt-4 md:mt-12">
            <a
              href="https://www.facebook.com/DakhlaClub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-16 h-16 bg-[#d7c9ad] flex items-center justify-center cursor-pointer
                          hover:bg-[#5ba6a9] transition-all duration-300 group"
            >
              <FaFacebookF className="text-2xl text-gray-900 group-hover:text-white" />
            </a>
            <a
              href="https://www.instagram.com/hoteldakhlaclub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-16 h-16 bg-[#d7c9ad] flex items-center justify-center cursor-pointer
                          hover:bg-[#5ba6a9] transition-all duration-300 group"
            >
              <FaInstagram className="text-2xl text-gray-900 group-hover:text-white" />
            </a>
            <a
              href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-16 h-16 bg-[#d7c9ad] flex items-center justify-center cursor-pointer
                          hover:bg-[#5ba6a9] transition-all duration-300 group"
            >
              <FaYoutube className="text-2xl text-gray-900 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - Image Carousel with Border (Order 1 on mobile, Order 2 on desktop) */}
        <div ref={carouselRef} className="relative flex items-center justify-center mt-4 md:mt-0 p-4 md:p-8 lg:py-10 order-1 lg:order-2">
          {/* Decorative Border Frame */}
          <div className="relative w-full max-w-full md:max-w-4xl">
            {/* Top-left corner accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#d7c9ad] z-10" />

            {/* Bottom-right corner accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#d7c9ad] z-10" />

            {/* Carousel Container */}
            <div className="relative w-full aspect-[4/3] overflow-hidden shadow-2xl">
              {/* Images */}
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="relative w-full h-full bg-gradient-to-br from-[#5ba6a9] to-[#d7c9ad]">
                    <Image
                      src={image}
                      alt={`Dakhla Club ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={90}
                    />
                  </div>
                </div>
              ))}

              {/* Carousel Dots */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-[#d7c9ad] w-8'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
