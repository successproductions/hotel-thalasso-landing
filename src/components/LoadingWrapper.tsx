'use client';

import { useState, useEffect, ReactNode } from 'react';
import Loading from '@/components/loading';

type Props = { children: ReactNode };

export default function LoadingWrapper({ children }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (visible) return <Loading />;     
  return <>{children}</>;
}
