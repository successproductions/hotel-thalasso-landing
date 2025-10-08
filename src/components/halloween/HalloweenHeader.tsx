'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function HalloweenHeader({ locale }: { locale: 'fr' | 'en' }) {
  const t = useTranslations('halloween');
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    const newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Image
              src="/images/LogoDakhla.png"
              alt="Dakhla Club"
              width={96}
              height={56}
              className="w-32 h-14"
              quality={100}
              priority
            />
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-sm transition-colors hover:text-[#5ea7aa] ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('offre')}
              className={`text-sm transition-colors hover:text-[#5ea7aa] ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
            >
              {t('nav.offer')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm transition-colors hover:text-[#5ea7aa] ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
            >
              {t('nav.about')}
            </button>
          </nav>

          {/* Language Toggle & Reservation Button - Right */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-4 py-2 font-normal rounded-full transition-all ${
                isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
            >
              <Globe size={18} />
              <span className="font-bold">{locale.toUpperCase()}</span>
            </button>

            {/* Reservation Button */}
            <button
              onClick={() => scrollToSection('reservation-form')}
              className={`px-6 py-2 font-normal rounded-full ${
                isScrolled
                  ? 'bg-transparent border-2 text-white'
                  : 'text-white'
              }`}
              style={{
                fontFamily: 'var(--font-creepster)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                ...(isScrolled ? { borderColor: '#5ea7aa', color: '#5ea7aa' } : { background: 'linear-gradient(to right, #5ea7aa, #a0d2de)' })
              }}
              onMouseEnter={(e) => {
                if (isScrolled) {
                  e.currentTarget.style.backgroundColor = 'rgba(94, 167, 170, 0.1)';
                } else {
                  e.currentTarget.style.background = 'linear-gradient(to right, #4a8a8d, #5ea7aa)';
                }
              }}
              onMouseLeave={(e) => {
                if (isScrolled) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                } else {
                  e.currentTarget.style.background = 'linear-gradient(to right, #5ea7aa, #a0d2de)';
                }
              }}
            >
              {t('hero.button')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 space-y-4 bg-white px-4 py-4 rounded-lg mt-2 shadow-lg">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left font-semibold py-2 text-gray-800 hover:text-[#5ea7aa] transition-colors"
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('offre')}
              className="block w-full text-left font-semibold py-2 text-gray-800 hover:text-[#5ea7aa] transition-colors"
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
            >
              {t('nav.offer')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left font-semibold py-2 text-gray-800 hover:text-[#5ea7aa] transition-colors"
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}
            >
              {t('nav.about')}
            </button>

            {/* Language Toggle - Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 font-normal rounded-full border-2 text-gray-800 hover:bg-gray-100 transition-all"
              style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif', borderColor: '#5ea7aa' }}
            >
              <Globe size={18} />
              <span className="font-bold">{locale === 'fr' ? 'FR / EN' : 'EN / FR'}</span>
            </button>

            <button
              onClick={() => scrollToSection('reservation-form')}
              className="w-full px-6 py-3 font-normal rounded-full text-white"
              style={{
                fontFamily: 'var(--font-creepster)',
                background: 'linear-gradient(to right, #5ea7aa, #a0d2de)'
              }}
            >
              {t('hero.button')}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
