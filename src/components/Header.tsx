"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";



export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleReserve = () => {
    localStorage.setItem("reservationIntent", "true");
    // Redirect or scroll
    const target = document.getElementById("contact");
    target?.scrollIntoView({ behavior: "smooth" });
  };


  const navLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "À propos", href: "#about" },
    { name: "Séjours", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];
  return (
    <header
  className={`fixed top-0 w-full z-50 transition-all duration-300 ${
  scrolled
    ? "bg-white/90 dark:bg-[#0f0f0f]/90 shadow backdrop-blur-sm py-2"
    : "bg-[#f9f8f4] dark:bg-[#0f0f0f] py-4"
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
        <nav className="hidden md:flex flex-1 justify-start space-x-6 text-1xl font-medium text-gray-700  dark:text-gray-200">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-teal-700">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
<span className="text-2xl font-serif italic text-green-900 dark:text-green-200">DakhlaClub</span>


        {/* CTA Button (right) */}
         <div className="flex-1 flex items-center justify-end gap-4">
          <ThemeToggle />
          <Button
            onClick={handleReserve}
            className="bg-green-900 hover:bg-green-800 text-white rounded-full px-5 py-2 text-sm"
          >
            Réserver
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white/95 shadow backdrop-blur">
          <nav className="hidden md:flex flex-1 justify-start space-x-6 text-sm font-medium text-gray-700 dark:text-gray-200">
  {navLinks.map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className="hover:text-teal-700 dark:hover:text-teal-400 "
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
