'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function OtherOffersSection() {
  const t = useTranslations('otherOffers');
  const pathname = usePathname();

  // Define all offers
  const allOffers = [
    {
      title: t('offer3.title'),
      description: t('offer3.description'),
      href: '/evasion-holistique-3-jours' as const,
    },
    {
      title: t('offer5.title'),
      description: t('offer5.description'),
      href: '/evasion-holistique-5-jours' as const,
    },
    {
      title: t('offer7.title'),
      description: t('offer7.description'),
      href: '/evasion-holistique-7-jours' as const,
    },
  ];

  // Filter out the current page from offers
  const otherOffers = allOffers.filter((offer) => !pathname.includes(offer.href));

  // Only show if there are other offers to display
  if (otherOffers.length === 0) return null;

  return (
    <section className="bg-gradient-to-b py-4 md:py-16 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h2 className="mb-4 text-3xl  text-gray-900 dark:text-white md:text-4xl">
            {t('heading')}
          </h2>
          <p className="md:mb-12 mb-4 text-lg text-gray-600 dark:text-gray-400">
            {t('subheading')}
          </p>

          {/* Offers Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {otherOffers.map((offer) => (
              <div
                key={offer.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="mb-6">
                  <h3 className="mb-3 text-2xl  text-gray-900 dark:text-white">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{offer.description}</p>
                </div>

                <Link href={offer.href}>
                  <Button
                    className="group/btn w-full bg-[#139584] text-white transition-all hover:bg-[#0f7a6c] hover:shadow-lg"
                    size="lg"
                  >
                    {t('buttonText')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>

                {/* Decorative element */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#139584]/10 transition-all duration-300 group-hover:scale-150" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
