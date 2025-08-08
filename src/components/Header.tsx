'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = scrolled || hovered;
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const links = [
    { name: t('home'), href: '#accueil' },
    { name: t('about'), href: '#about' },
    { name: t('services'), href: '#services' },
    { name: 'FAQ', href: '#faq' }, // Added internal link
  ];

  return (
    <header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 w-screen transition-all duration-300',
        active ? 'bg-white py-2 shadow' : 'bg-transparent py-4',
      )}
    >
      {/* Desktop Layout */}
      <div className="mx-auto hidden max-w-7xl px-4 md:block">
        <div className="grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="transition-filter">
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
              'flex justify-center gap-2 font-medium transition-colors', // Reduced gap for more links
              active ? 'text-gray-800 dark:text-gray-200' : 'text-white',
            )}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={clsx(
                  'group relative px-2 py-2 text-xs transition-colors', // Smaller text for more links
                  active ? 'hover:text-teal-700' : 'hover:text-white/80',
                )}
              >
                {l.name}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Language + Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href={pathname}
              locale={otherLocale}
              className={clsx(
                'flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors',
                active
                  ? 'border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
                  : 'border-white text-white hover:bg-white hover:text-gray-800',
              )}
            >
              <Globe className="h-4 w-4" />
              {otherLocale.toUpperCase()}
            </Link>

            <Button
              size="sm"
              className={clsx(
                'rounded-full border px-5 py-5 transition-transform',
                active
                  ? 'bg-[#139584] text-white hover:scale-105 hover:bg-[#d6bb8e] hover:shadow-xl'
                  : 'border-white bg-transparent text-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white',
              )}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('button.book')}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Layout - UPDATED with more links */}
      <div className="w-full px-2 sm:px-4 md:hidden">
        <div className="flex max-w-full items-center justify-between gap-2">
          <button
            className={clsx(
              'flex-shrink-0 p-1 transition-colors',
              active ? 'text-gray-800' : 'text-white',
            )}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            href="/"
            className={clsx('transition-filter mx-2 flex-shrink-0', !active && 'transition-filter')}
          >
            <Image
              src="/images/LogoDakhla.png"
              alt="Dakhla Club - Accueil"
              width={80}
              height={28}
              className="h-auto max-w-full"
            />
          </Link>

          <Button
            size="sm"
            className={clsx(
              'flex-shrink-0 whitespace-nowrap rounded-full border px-2 py-1 text-xs transition-transform',
              active
                ? 'bg-[#139584] text-white hover:scale-105 hover:bg-[#d6bb8e] hover:shadow-xl'
                : 'border-white bg-transparent text-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white',
            )}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('button.book')}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 w-screen bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            className={clsx(
              'fixed right-0 top-0 z-50 h-full w-64 transform bg-white p-6 transition-transform duration-300 dark:bg-[#0f0f0f]',
              open ? 'translate-x-0' : 'translate-x-full',
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
                  <Globe className="h-4 w-4" />
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
