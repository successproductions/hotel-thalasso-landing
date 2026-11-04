import type { Metadata, Viewport } from 'next';
import * as fr from '@/dc-thermes/content';
import * as en from '@/dc-thermes/content.en';
import { bookingHref } from '@/dc-thermes/funnel';
import type { FaqBlock, Funnel, Lang } from '@/dc-thermes/types';

const SITE_URL = 'https://offer.dakhlaclub.com';
const OG_IMAGE = `${SITE_URL}/images/dc-thermes/piscine-thermale.webp`;
const ICON = '/images/dc-thermes/logo-dc.webp';

const packs = { fr, en };

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: ICON },
  twitter: { card: 'summary_large_image' },
};

export const landingViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1c1b19',
};

export const formViewport: Viewport = { ...landingViewport, themeColor: '#f3f2ef' };

export function landingMetadata(lang: Lang, funnel: Funnel = 'main'): Metadata {
  const { meta } = packs[lang];

  // The payment and contact versions repeat the main page, so they stay out of search results
  if (funnel !== 'main') {
    return { ...baseMetadata, title: meta.title, description: meta.description, robots: { index: false } };
  }

  return {
    ...baseMetadata,
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        fr: fr.meta.canonical,
        en: en.meta.canonical,
        'x-default': fr.meta.canonical,
      },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: meta.canonical,
      locale: meta.ogLocale,
      images: [OG_IMAGE],
    },
  };
}

// The reservation and gift pages take their language from the link: ?lang=en
export type LangSearchParams = Promise<{ lang?: string }>;
const fromSearchParams = async (searchParams: LangSearchParams): Promise<Lang> =>
  (await searchParams).lang === 'en' ? 'en' : 'fr';

export async function reservationMetadata(
  searchParams: LangSearchParams,
  funnel: Funnel = 'main'
): Promise<Metadata> {
  const lang = await fromSearchParams(searchParams);
  const lead = funnel === 'lead';
  return {
    ...baseMetadata,
    title: lead ? packs[lang].meta.leadTitle : packs[lang].meta.bookingTitle,
    description: lead
      ? 'Demandez votre cure DC Luxury Thermes : notre équipe vous rappelle, sans paiement en ligne.'
      : 'Dernière étape avant le paiement sécurisé de votre cure DC Luxury Thermes.',
    robots: { index: false },
  };
}

export async function offrirMetadata(searchParams: LangSearchParams): Promise<Metadata> {
  const lang = await fromSearchParams(searchParams);
  return {
    ...baseMetadata,
    title: packs[lang].giftPage.title,
    description:
      'Offrez une cure DC Luxury Thermes : un bon cadeau personnalisé, valable 12 mois.',
  };
}

const answerText = (answer: FaqBlock[]) =>
  answer
    .map((block) =>
      typeof block === 'string'
        ? block
        : (block.ol || block.ul).map((li) => [li].flat().join(' ')).join(' · ')
    )
    .join(' ');

// Business, offers and FAQ, built from the texts visible on the page
export function landingStructuredData(lang: Lang) {
  const t = packs[lang];

  const graph = [
    {
      '@type': 'HealthAndBeautyBusiness',
      '@id': `${SITE_URL}/#dc-therme`,
      name: 'DC Luxury Thermes · Dakhla Club',
      url: t.site.url,
      telephone: t.site.phone.replace(/\s/g, ''),
      email: t.site.email,
      image: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Point de Dragon, PK 28',
        postalCode: '73000',
        addressLocality: 'Dakhla',
        addressCountry: 'MA',
      },
      makesOffer: t.cures.map((c) => ({
        '@type': 'Offer',
        name: `${c.name}, ${c.days} ${t.ui.days}`,
        description: c.for,
        price: c.price,
        priceCurrency: 'MAD',
        url: SITE_URL + bookingHref('main', lang, { cure: c.key }),
      })),
    },
    {
      '@type': 'FAQPage',
      inLanguage: t.lang,
      mainEntity: t.faq.items.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: answerText(a) },
      })),
    },
  ];

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
