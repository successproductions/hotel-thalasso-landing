"use client";
import {useState, useEffect} from "react";
import {Menu, X, Globe} from "lucide-react";
import clsx from "clsx";
import {ThemeToggle} from "@/components/ui/theme-toggle";
import {Button} from "@/components/ui/button";
import {Link, usePathname, useLocale, useTranslations} from "@/navigation"; // <-- helper file
//  ↑ createLocalizedPathnamesNavigation as shown under 1-A

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const pathname   = usePathname();
  const locale     = useLocale();
  const other      = locale === "fr" ? "en" : "fr";
  const t          = useTranslations("nav");

  const nav = [
    {name: t("home"),     href:"#accueil"},
    {name: t("about"),    href:"#about"},
    {name: t("services"), href:"#services"},
    {name: t("contact"),  href:"#contact"},
  ];

  return (
    <header className={clsx(
      "fixed top-0 inset-x-0 z-50 transition-all",
      scrolled ? "bg-white/90 shadow backdrop-blur-sm py-2"
               : "bg-[#f9f8f4] py-4 dark:bg-[#0f0f0f]"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">

        {/* burger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>

        {/* desktop nav */}
        <nav className="hidden md:flex flex-1 justify-start gap-6 text-sm">
          {nav.map(l => <a key={l.href} href={l.href} className="hover:text-teal-700">{l.name}</a>)}
        </nav>

        {/* logo */}
        <span className="flex-1 text-center font-serif text-2xl italic text-green-900 dark:text-green-200">
          DakhlaClub
        </span>

        {/* utilities */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <ThemeToggle/>
          <Link href={pathname} locale={other}
            className="flex items-center gap-1 px-3 py-1 border rounded-full text-xs hover:bg-gray-100 dark:hover:bg-gray-800">
            <Globe className="w-4 h-4"/>{other.toUpperCase()}
          </Link>
          <Button size="sm" className="bg-green-900 px-5">{t("button.book")}</Button>
        </div>
      </div>

      {/* mobile drawer */}
      {/* backdrop */}
      {open && <div className="md:hidden fixed inset-0 bg-black/40 z-40" onClick={()=>setOpen(false)} />}
      {/* panel */}
      <div className={clsx(
        "md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-[#0f0f0f] z-50",
        "transform transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col gap-6 p-6">
          {nav.map(l => (
            <a key={l.href} href={l.href} onClick={()=>setOpen(false)}
               className="font-medium hover:text-teal-700">{l.name}</a>
          ))}
          <div className="border-t pt-4 flex gap-4">
            <ThemeToggle/>
            <Link href={pathname} locale={other}
                  className="flex items-center gap-1 px-3 py-1 border rounded-full text-xs">
              <Globe className="w-4 h-4"/>{other.toUpperCase()}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
