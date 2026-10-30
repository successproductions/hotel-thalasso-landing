import type { ReactNode } from 'react';
import Document from '../Document';

export default function Layout({ children }: { children: ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
