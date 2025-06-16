import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default:
      "Évasion Holistique à Dakhla – Cure Détox & Bien-Être 3 Jours | Dakhla Club",
    template: "%s | Dakhla Club – Spa & Thalasso",
  },
  description:
    "Offrez-vous 3 jours de bien‑être au centre DC Thermes à Dakhla. Cure détox, soins thalasso et spa entre désert et océan pour vitalité, clarté et énergie retrouvée.",
  keywords: [
    "séjour bien‑être Dakhla",
    "cure détox Maroc",
    "retraite bien‑être 3 jours",
    "spa haut de gamme Maroc",
    "centre thalasso Dakhla",
    "spa désert et océan",
    "reset corps et esprit",
    "escapade bien‑être Maroc",
    "séjour holistique Maroc",
    "week‑end détox Maroc",
    "spa DC Thermes",
    "séjour régénérant Dakhla",
    "retraite spirituelle Maroc",
    "programme bien‑être 3 jours",
    "mini cure thalasso Maroc",
    "massage affusion Maroc",
    "soins detox corps et esprit",
    "spa hammam traditionnel Dakhla",
    "soins sel Himalaya Maroc",
    "séjour anti‑fatigue Maroc",
  ],
  openGraph: {
    title:
      "Évasion Holistique à Dakhla – Cure Détox & Bien-Être 3 Jours | Dakhla Club",
    description:
      "Rejoignez notre programme thalasso 3 jours entre désert et océan : soins marins, hammam, massages, Bol d'Air Jacquier et plus encore.",
    url: "https://offer.dakhlaclub.com/",
    siteName: "Dakhla Club Spa & Thalasso",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/thalasso-pool-ocean-view.jpg",
        width: 1200,
        height: 630,
        alt: "Thermal pool with ocean view at DC Thermes Dakhla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Évasion Holistique 3 Jours à Dakhla | Désert & Océan",
    description:
      "3 jours de spa, détox et soins marins au DC Thermes – vitalité et clarté mentale garanties.",
    images: [
      "https://offer.dakhlaclub.com/images/thalasso-pool-ocean-view.jpg",
    ],
  },

  icons: {
    icon: "/LogoIcone.png",
    shortcut: "/LogoIcone.png",
    apple: "/LogoIcone.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
