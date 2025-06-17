import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: { locale: 'fr' | 'en' } }
): Promise<Metadata> {
  const { locale } = params;

  /* ---- localised strings ----------------------------------- */
  const strings = {
    fr: {
      title:
        'Évasion Holistique à Dakhla – Cure Détox & Bien-Être 3 Jours | Dakhla Club',
      description:
        '3 jours de bien-être au centre DC Thermes : cure détox, soins thalasso & spa entre désert et océan.',
      ogLocale: 'fr_FR',
    },
    en: {
      title:
        'Holistic Escape in Dakhla – 3-Day Detox & Well-Being Retreat | Dakhla Club',
      description:
        '3 days of wellness at DC Thermes, Dakhla: marine cures, spa treatments and desert/ocean bliss.',
      ogLocale: 'en_US',
    },
  }[locale];

  /* ---- common data reused in both languages ---------------- */
  const image = {
    url: '/images/thalasso-pool-ocean-view.jpg',
    width: 1200,
    height: 630,
    alt: 'Thermal pool with ocean view at DC Thermes Dakhla',
  };

  return {
    title: {
      default: strings.title,
      template: '%s | Dakhla Club – Spa & Thalasso',
    },
    description: strings.description,
    openGraph: {
      title: strings.title,
      description: strings.description,
      url: `https://offer.dakhlaclub.com/${locale}`,
      siteName: 'Dakhla Club Spa & Thalasso',
      locale: strings.ogLocale,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: strings.title,
      description: strings.description,
      images: [`https://offer.dakhlaclub.com${image.url}`],
    },
    icons: {
      icon: '/LogoIcone.png',
      shortcut: '/LogoIcone.png',
      apple: '/LogoIcone.png',
    },
  };
}

/* ---- plain wrapper – children rendered here ---------------- */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
