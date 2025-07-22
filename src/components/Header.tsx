"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = scrolled || hovered;
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const otherLocale = locale === "fr" ? "en" : "fr";


  const links = [
    { name: t("home"), href: "#accueil" },
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: "FAQ", href: "#faq" }, // Added internal link
  ];

  return (
    <header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 w-screen",
        active ? "bg-white shadow py-2" : "bg-transparent py-4"
      )}
    >
      {/* Desktop Layout */}
      <div className="hidden md:block mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="transition-filter"
            >
              <Image
                src="/images/LogoDakhla.png"
                alt="Dakhla Club - Retour à l'accueil"
                width={120}
                height={40}
              />
            </Link>
          </div>

          {/* Center: Navigation - UPDATED with more internal links */}
          <nav
            className={clsx(
              "flex justify-center gap-2 font-medium transition-colors", // Reduced gap for more links
              active ? "text-gray-800 dark:text-gray-200" : "text-white"
            )}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative group px-2 py-2 transition-colors text-xs", // Smaller text for more links
                  active ? "hover:text-teal-700" : "hover:text-white/80"
                )}
              >
                {l.name}
                <span
                  className="
                    absolute bottom-0 left-0
                    h-[2px] w-0
                    bg-current
                    transition-all duration-300
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </nav>

          {/* Right: Language + Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href={pathname}
              locale={otherLocale}
              className={clsx(
                "flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors",
                active
                  ? "border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  : "border-white text-white hover:bg-white hover:text-gray-800"
              )}
            >
              <Globe className="w-4 h-4" />
              {otherLocale.toUpperCase()}
            </Link>

            <Button
              size="sm"
              className={clsx(
                "px-5 transition-transform border rounded-full py-5",
                active
                  ? "bg-[#139584] text-white hover:bg-[#d6bb8e] hover:scale-105 hover:shadow-xl"
                  : "bg-transparent border-white text-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white"
              )}
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("button.book")}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Layout - UPDATED with more links */}
      <div className="md:hidden w-full px-2 sm:px-4">
        <div className="flex items-center justify-between gap-2 max-w-full">
          <button
            className={clsx(
              "transition-colors flex-shrink-0 p-1",
              active ? "text-gray-800" : "text-white"
            )}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            href="/"
            className={clsx(
              "transition-filter flex-shrink-0 mx-2",
              !active && "transition-filter"
            )}
          >
            <Image
              src="/images/LogoDakhla.png"
              alt="Dakhla Club - Accueil"
              width={80}
              height={28}
              className="max-w-full h-auto"
            />
          </Link>

          <Button
            size="sm"
            className={clsx(
              "px-2 py-1 text-xs transition-transform border rounded-full flex-shrink-0 whitespace-nowrap",
              active
                ? "bg-[#139584] text-white hover:bg-[#d6bb8e] hover:scale-105 hover:shadow-xl"
                : "bg-transparent border-white text-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white"
            )}
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
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
            className="fixed inset-0 z-40 bg-black/40 md:hidden w-screen"
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
                <Link
                  href={pathname}
                  locale={otherLocale}
                  className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
                >
                  <Globe className="w-4 h-4" />
                  {otherLocale.toUpperCase()}
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}