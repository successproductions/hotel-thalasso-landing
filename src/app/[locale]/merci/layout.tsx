import '../../globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Merci - Dakhla Club',
  description: 'Merci pour votre réservation au Dakhla Club.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function MerciLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={playfair.className}>
        {children}
      </body>
    </html>
  );
}
