'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

interface LegalLayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  const pathname = usePathname();
  const t = useTranslations('legal');
  
  // Générer les breadcrumbs basés sur le pathname
  const getBreadcrumbItems = () => {
    const items = [
      { label: t('index.title'), href: '/legal' }
    ];
    
    if (pathname.includes('/cgu')) {
      items.push({ label: t('cgu.title') });
    } else if (pathname.includes('/cgv')) {
      items.push({ label: t('cgv.title') });
    } else if (pathname.includes('/privacy')) {
      items.push({ label: t('privacy.title') });
    } else if (pathname.includes('/cookies')) {
      items.push({ label: t('cookies.title') });
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {pathname !== '/legal' && <Breadcrumb items={getBreadcrumbItems()} />}
          <div className="legal-content">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}