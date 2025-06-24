"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import clsx from "clsx";

import { ThemeToggle } from "@/components/ui/theme-toggle";

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';


export default function Header5() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const links = [
    { name: t("home"), href: "#accueil" },
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: t("contact"), href: "#contact" }
  ];

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out",
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-lg py-3 dark:bg-gray-900/95 border-b border-gray-200/20 dark:border-gray-700/30"
          : "bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm py-5 dark:from-gray-900/90 dark:to-gray-800/90"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8">

        {/* Logo - Moved to left */}
        <div className="flex items-center">
          <Link href="/" className="group">
            <Image
              src="/images/LogoDakhla.png"
              alt="DakhlaClub Logo"
              width={140}
              height={45}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Nav - Center */}
        <nav className="hidden lg:flex items-center gap-8 text-base font-medium">
          {links.map((l) => (
            <a 
              key={l.href} 
              href={l.href} 
              className="relative text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 group"
            >
              {l.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            
<Link
  href={pathname}
  locale={otherLocale}
  className="relative flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-teal-500/25"
>
  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <Globe className="w-4 h-4 text-teal-500 dark:text-teal-400 relative z-10" />
  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 relative z-10">
    {otherLocale.toUpperCase()}
  </span>
</Link>
          </div>

         
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            className={clsx(
              "fixed right-0 top-0 z-50 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl transform transition-all duration-300 ease-in-out",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <Image
                  src="/images/LogoDakhla.png"
                  alt="DakhlaClub Logo"
                  width={120}
                  height={40}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <nav className="flex flex-col p-6 space-y-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 rounded-lg text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 dark:hover:from-teal-900/20 dark:hover:to-emerald-900/20 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200"
                >
                  {l.name}
                </a>
              ))}

              <div className="pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-700/50 space-y-4">
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <Link
                    href={pathname}
                    locale={otherLocale}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-teal-500 dark:hover:border-teal-400 text-sm font-medium flex-1 justify-center"
                  >
                    <Globe className="w-4 h-4" />
                    {otherLocale.toUpperCase()}
                  </Link>
                </div>
                
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}