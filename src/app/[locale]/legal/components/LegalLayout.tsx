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
      <main className="pb-12 pt-20">
        <div className="mx-auto max-w-7xl px-4">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
