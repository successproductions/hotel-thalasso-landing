import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {        
  title: 'Dakhla Club | Thalasso & Spa',
  description: '3-day holistic detox retreat between desert and ocean in Dakhla.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <style dangerouslySetInnerHTML={{__html:'@media(max-width:768px){.rm-dummy{display:none}}'}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
