import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Dakhla Club – Spa & Thalasso',
    template: '%s | Dakhla Club'
  },
  description:
    'Centre thalasso entre désert et océan. Programmes holistiques 3 jours.',
  keywords: [
    'séjour bien-être Dakhla',
    'cure détox Maroc',
    'spa haut de gamme'
  ]
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return children;
}