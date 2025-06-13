"use client";
import {useEffect, useState}      from "react";
import {Menu, X, Globe}           from "lucide-react";
import clsx                       from "clsx";

import {ThemeToggle}              from "@/components/ui/theme-toggle";
import {Button}                   from "@/components/ui/button";
  // helper file
 import { Link, usePathname } from '@/i18n/navigation';
 import { useTranslations, useLocale } from 'next-intl';
export default function Header() {
  /* --- scroll shadow ---------------------------------------------------- */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  /* --- mobile drawer ---------------------------------------------------- */
  const [open, setOpen] = useState(false);

  /* --- i18n ------------------------------------------------------------- */
    
 const pathname = usePathname();
  const locale   = useLocale();       
const t = useTranslations('nav');

   const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const links = [
    {name: t("home"),     href: "#accueil"},
    {name: t("about"),    href: "#about"},
    {name: t("services"), href: "#services"},
    {name: t("contact"),  href: "#contact"}
  ];

  /* --------------------------- JSX -------------------------------------- */
  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "bg-white/90 backdrop-blur-sm shadow py-2"
                 : "bg-[#f9f8f4] dark:bg-[#0f0f0f] py-4"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4">

        {/* mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>

        {/* desktop nav */}
        <nav className="hidden md:flex flex-1 gap-6 text-sm">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-teal-700 font-trajan">
              {l.name}
            </a>
          ))}
        </nav>

        {/* logo */}
        <span className="flex-1 text-center font-serif italic text-2xl text-green-900 dark:text-green-200">
          DakhlaClub
        </span>

        {/* utilities */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <ThemeToggle/>

          {/* language switch */}
          <Link
            href={pathname}          
            locale={otherLocale}     
            className="hidden md:flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Globe className="w-4 h-4"/>{otherLocale.toUpperCase()}
          </Link>

          <Button size="sm" className="bg-green-900 font-trajan px-5">
            {t("button.book")}
          </Button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div
            className={clsx(
              "fixed right-0 top-0 z-50 h-full w-64 bg-white dark:bg-[#0f0f0f] p-6",
              "transform transition-transform duration-300",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            <nav className="flex flex-col gap-6">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-medium hover:text-teal-700"
                >
                  {l.name}
                </a>
              ))}

              <div className="mt-4 flex gap-4 border-t pt-4">
                <ThemeToggle/>
                <Link
                  href={pathname}
                  locale={otherLocale}
                  className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
                >
                  <Globe className="w-4 h-4"/>{otherLocale.toUpperCase()}
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
