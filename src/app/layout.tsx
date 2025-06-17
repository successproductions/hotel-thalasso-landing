
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default:
      'Évasion Holistique à Dakhla – Cure Détox & Bien-Être 3 Jours | Dakhla Club',
    template: '%s | Dakhla Club – Spa & Thalasso',
  },
  description:
    '3 jours de bien-être au centre DC Thermes à Dakhla : cure détox, soins thalasso & spa entre désert et océan. Vitalité, clarté et énergie retrouvée.',
  keywords: [
    'séjour bien-être Dakhla',
    'cure détox Maroc',
    'retraite bien-être 3 jours',
    'spa haut de gamme Maroc',
    'centre thalasso Dakhla',
    'spa désert et océan',
    /* … (keep / adjust keywords as needed) … */
  ],

  openGraph: {
    title:
      'Évasion Holistique à Dakhla – Cure Détox & Bien-Être 3 Jours | Dakhla Club',
    description:
      "Rejoignez notre programme thalasso 3 jours entre désert et océan : soins marins, hammam, massages, Bol d'Air Jacquier et plus encore.",
    url: 'https://offer.dakhlaclub.com/',
    siteName: 'Dakhla Club Spa & Thalasso',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/thalasso-pool-ocean-view.jpg',
        width: 1200,
        height: 630,
        alt: 'Thermal pool with ocean view at DC Thermes Dakhla',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Évasion Holistique 3 Jours à Dakhla | Désert & Océan',
    description:
      '3 jours de spa, détox et soins marins au DC Thermes – vitalité et clarté mentale garanties.',
    images: [
      'https://offer.dakhlaclub.com/images/thalasso-pool-ocean-view.jpg',
    ],
  },

  icons: {
    icon    : '/LogoIcone.png',
    shortcut: '/LogoIcone.png',
    apple   : '/LogoIcone.png',
  },
};

/*—– Plain wrapper (locale layout adds <html>, etc.) —–*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
