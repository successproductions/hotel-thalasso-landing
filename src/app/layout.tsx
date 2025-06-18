import './globals.css';
import type { ReactNode } from 'react';
import ClientMountGuard from './ClientMountGuard'; 
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClientMountGuard>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </ClientMountGuard>
  );
}