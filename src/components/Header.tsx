"use client";

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-800">
            Hôtel Thalasso
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="#offres" className="text-gray-600 hover:text-blue-800 transition-colors">
              Nos Offres
            </Link>
            <Link href="#bienfaits" className="text-gray-600 hover:text-blue-800 transition-colors">
              Bienfaits
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-800 transition-colors">
              Contact
            </Link>
            <Link 
              href="#reservation" 
              className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link 
              href="#offres" 
              className="block text-gray-600 hover:text-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Nos Offres
            </Link>
            <Link 
              href="#bienfaits" 
              className="block text-gray-600 hover:text-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bienfaits
            </Link>
            <Link 
              href="#contact" 
              className="block text-gray-600 hover:text-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="#reservation" 
              className="block bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Réserver
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 