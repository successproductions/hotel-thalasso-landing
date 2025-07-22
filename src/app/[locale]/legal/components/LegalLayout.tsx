'use client';

import { ReactNode } from 'react';
// import Header from '@/components/Header';
// import { Footer } from '@/components/Footer';

interface LegalLayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}