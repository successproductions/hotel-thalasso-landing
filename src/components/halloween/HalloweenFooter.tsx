'use client';

import Image from 'next/image';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function HalloweenFooter() {
  return (
    <footer className="bg-black text-white py-12 border-t-2" style={{ borderColor: '#84bbca' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/LogoDakhla.png"
                alt="Dakhla Club"
                width={50}
                height={50}
              />
              <h3
                className="text-2xl font-normal text-transparent bg-clip-text"
                style={{
                  fontFamily: 'var(--font-creepster)',
                  background: 'linear-gradient(to right, #84bbca, #a0d2de)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Dakhla Club
              </h3>
            </div>
            <p className="text-gray-400" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
              Vivez une expérience Halloween unique entre frissons et détente à Dakhla Club.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-xl font-normal mb-4"
              style={{ fontFamily: 'var(--font-creepster)', color: '#84bbca' }}
            >
              Contact
            </h4>
            <ul className="space-y-3" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
              <li className="flex items-center gap-3 text-gray-400 transition-colors">
                <Phone size={18} />
                <a href="tel:+212652881921" onMouseEnter={(e) => e.currentTarget.style.color = '#84bbca'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>+212 652 88 19 21</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 transition-colors">
                <Mail size={18} />
                <a href="mailto:reservation@dakhlaclub.com" onMouseEnter={(e) => e.currentTarget.style.color = '#84bbca'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>reservation@dakhlaclub.com</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>POINT DE DRAGON PK 28<br />Dakhla 73000, Maroc</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4
              className="text-xl font-normal mb-4"
              style={{ fontFamily: 'var(--font-creepster)', color: '#84bbca' }}
            >
              Suivez-nous
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/DakhlaClub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                style={{ backgroundColor: '#84bbca' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6ba3b3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#84bbca'}
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/hoteldakhlaclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                style={{ backgroundColor: '#84bbca' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6ba3b3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#84bbca'}
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com/@dakhlaclub1745?si=D_TKjBar-WzAMcnY"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                style={{ backgroundColor: '#84bbca' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6ba3b3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#84bbca'}
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>
            © 2025 Dakhla Club. Tous droits réservés. | Halloween Special Event
          </p>
        </div>
      </div>
    </footer>
  );
}
