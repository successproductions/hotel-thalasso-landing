'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface BookingFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingFormPopup({ isOpen, onClose }: BookingFormPopupProps) {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (isOpen) {
      router.push(`/${locale}/panier/vitalite`);
      onClose();
    }
  }, [isOpen, locale, router, onClose]);

  return null;
}
