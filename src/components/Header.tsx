"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import clsx from "clsx";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';


export default function Header() {
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
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "bg-white shadow py-2 dark:bg-[#131212]"
                : "bg-white py-4 dark:bg-[#0f0f0f]"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4">

        {/* Mobile Burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 gap-6 text-base text-gray-800 dark:text-gray-200">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-teal-700 font-medium">
              {l.name}
            </a>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex-1 text-center">
          <Link href="#">
            <Image
              src="/images/LogoDakhla.png"
              alt="DakhlaClub Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Utilities (hide toggle on mobile) */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <Link
            href={pathname}
            locale={otherLocale}
            className="hidden md:flex items-center gap-1 rounded-full border px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Globe className="w-4 h-4" />{otherLocale.toUpperCase()}
          </Link>

          <Button
            size="sm"
            className="bg-green-900 font-trajan px-5 dark:text-white hover:bg-green-800 hover:scale-105 hover:shadow-xl"
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {t("button.book")}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            className={clsx(
              "fixed right-0 top-0 z-50 h-full w-64 bg-white dark:bg-[#0f0f0f] p-6 transform transition-transform duration-300",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            <nav className="flex flex-col gap-6">
              {links.map((l) => (
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
                <ThemeToggle />
                <Link
                  href={pathname}
                  locale={otherLocale}
                  className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
                >
                  <Globe className="w-4 h-4" />{otherLocale.toUpperCase()}
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
