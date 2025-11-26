'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';

export function OtherOffersSectionV2() {
  const t = useTranslations('otherOffers');
  const pathname = usePathname();

  // Define all offers with images
  const allOffers = [
    {
      title: t('offer3.title'),
      description: t('offer3.description'),
      href: '/evasion-holistique-3-jours' as const,
      image: '/images/offer-3/dji1.jpg',
    },
    {
      title: t('offer5.title'),
      description: t('offer5.description'),
      href: '/evasion-holistique-5-jours' as const,
      image: '/images/offer-3/dji3.jpg',
    },
    {
      title: t('offer7.title'),
      description: t('offer7.description'),
      href: '/evasion-holistique-7-jours' as const,
      image: '/images/offer-3/dji5.jpg',
    },
  ];

  const otherOffers = allOffers.filter((offer) => !pathname.includes(offer.href));

  if (otherOffers.length === 0) return null;

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container mx-auto md:px-4">
        <div className="mx-auto max-w-5xl">
          {/* Heading */}
          <h2 className="mb-8 text-center text-3xl font-medium uppercase text-gray-800 md:mb-12 md:text-4xl">
            {t('heading')}
          </h2>

          {/* Offers Grid - 2 cards */}
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {otherOffers.slice(0, 2).map((offer) => (
              <div
                key={offer.href}
                className="group rounded-xs bg-[#faf9f5] p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-72 w-full overflow-hidden rounded-xs">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="py-6 md:p-8 text-center">
                  <h3 className="mb-4 text-2xl font-medium uppercase tracking-wide text-gray-800">
                    {offer.title}
                  </h3>

                  <div className="mx-auto mb-2 h-px w-16 bg-gray-800"></div>

                  <p className="mb-6 text-base leading-relaxed text-gray-600">
                    {offer.description}
                  </p>

                  <Link
                    href={offer.href}
                    className="inline-block border-b-2 border-gray-800 pb-1 text-sm font-medium uppercase tracking-wide text-gray-800 transition-colors hover:border-[#139584] hover:text-[#139584]"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
