'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface ReservationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationPopup({ isOpen, onClose }: ReservationPopupProps) {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (isOpen) {
      router.push(`/${locale}/panier/renaissance`);
      onClose();
    }
  }, [isOpen, locale, router, onClose]);

  return null;
}
