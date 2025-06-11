"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "À propos", href: "#about" },
    { name: "Séjours", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow backdrop-blur-sm py-2" : "bg-[#f9f8f4] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Left Nav (hidden on mobile) */}
        <nav className="hidden md:flex flex-1 justify-start space-x-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-teal-700">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <span className="text-2xl font-serif italic text-green-900">DakhlaClub</span>
        </div>

        {/* CTA Button (right) */}
        <div className="flex-1 flex justify-end">
          <Button className="bg-green-900 hover:bg-green-800 text-white rounded-full px-5 py-2 text-sm">
            Réserver
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white/95 shadow backdrop-blur">
          <nav className="flex flex-col space-y-4 text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-tr font-trajan hover:text-teal-600"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
