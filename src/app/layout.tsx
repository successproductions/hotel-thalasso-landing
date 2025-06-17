import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children; // Don't wrap in html/body tags here since [locale]/layout.tsx does it
}