"use client";

import React, { useState } from "react";
import WavyText from "../ui/WavyText";
import { useTranslations } from "next-intl";
import Swal from 'sweetalert2';


interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
}

interface ValidationErrors {
  checkInDate?: string;
  checkOutDate?: string;
  adults?: string;
}

export default function Hero7() {
  const t = useTranslations('offer7.home');
  const [bookingData, setBookingData] = useState<BookingData>({
    checkInDate: '',
    checkOutDate: '',
    adults: 2,
    children: 0
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Calculate number of days between two dates
  const calculateDays = (checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Auto-calculate check-out date (6 nights after check-in)
  const calculateCheckoutDate = (checkInDate: string): string => {
    if (!checkInDate) return '';
    const checkIn = new Date(checkInDate);
    checkIn.setDate(checkIn.getDate() + 8); // Add 3 days for 3 nights
    return checkIn.toISOString().split('T')[0];
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!bookingData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    }
    
    if (!bookingData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    }
    
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      const checkIn = new Date(bookingData.checkInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkIn < today) {
        newErrors.checkInDate = 'Check-in date cannot be in the past';
      }

      const numberOfDays = calculateDays(bookingData.checkInDate, bookingData.checkOutDate);
      if (numberOfDays !== 8) {
        // Show SweetAlert2 warning with translated messages
        Swal.fire({
          icon: 'warning',
          title: t('bookingValidation.invalidDurationTitle'),
          text: 'Your stay must be exactly 7 nights. Please adjust your dates.',
          confirmButtonText: t('bookingValidation.confirmButton'),
          confirmButtonColor: '#f59e0b'
        });
        return false;
      }
    }
    
    if (bookingData.adults < 1) {
      newErrors.adults = 'At least 1 adult is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleBookingSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Build the booking engine URL following SiteMinder EMEA format
    const baseUrl = 'https://direct-book.com/properties/DakhlaClubDIRECT';
    const params = new URLSearchParams({
      check_in_date: bookingData.checkInDate,
      check_out_date: bookingData.checkOutDate,
      'items[0][adults]': bookingData.adults.toString(),
      'items[0][children]': bookingData.children.toString(),
      'items[0][infants]': '0',
      currency: 'MAD',
      locale: 'en',
      trackPage: 'yes'
    });

    const bookingUrl = `${baseUrl}?${params.toString()}`;
    window.open(bookingUrl, '_blank');
  };

  const handleInputChange = (field: keyof BookingData, value: string | number) => {
    if (field === 'checkInDate') {
      // Auto-calculate check-out date when check-in changes
      const checkOutDate = calculateCheckoutDate(value as string);
      setBookingData(prev => ({
        ...prev,
        checkInDate: value as string,
        checkOutDate: checkOutDate
      }));
    } else if (field !== 'checkOutDate') {
      // Allow changes to other fields except checkOutDate
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="accueil" className="relative h-[70vh] md:h-screen w-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-[57vh] lg:h-[80vh] xl:h-[92vh] object-cover"
        src="/videos/VIDEO_LANDING_PAGE_5.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 " />

      {/* animated two-line headline */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center pb-12 md:pb-0 px-4 space-y-4">
        {/* Line 1: big italic serif */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-normal">
          <span className="hidden md:block">
            <WavyText text={t("title")} />
          </span>
          <span className="block md:hidden">
            <WavyText text={t("title2")} />
          </span>
        </h1>

        {/* Line 2: uppercase tracking-wide */}
        {/* <h2 className="uppercase text-xs md:text-lg tracking-widest">
        <span className="hidden md:block">
            <WavyText text={t("description")} />
          </span>
          <span className="block md:hidden">
            <WavyText text={t("description2")} />
          </span>
        </h2> */}
      </div>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-12 lg:bottom-9 xl:bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-[90%] md:w-auto">
        <div className="bg-white/90 lg:p-6 backdrop-blur-sm rounded-3xl px-4 py-4 md:px-12 md:py-8 shadow-lg">
          
          {/* Mobile Layout: All fields in one row, button below */}
          <div className="md:hidden">
            {/* Fields row */}
            <div className="flex items-center space-x-2 mb-4">
              {/* Check-in Date */}
              <div className="flex-1 min-w-0">
                <span className="block text-xs text-gray-500 tracking-wider mb-1">
                  {t('Check-in')}
                </span>
                <input
                  type="date"
                  min={today}
                  value={bookingData.checkInDate}
                  onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Check-out Date */}
              <div className="flex-1 min-w-0 relative">
                <span className="block text-xs text-gray-500 tracking-wider mb-1">
                  {t('Check-out')}
                </span>
                <input
                  type="date"
                  value={bookingData.checkOutDate}
                  readOnly
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-gray-800 bg-gray-50 cursor-not-allowed"
                  title="Check-out date is automatically set to 3 nights after check-in"
                />
                {/* Forbidden icon overlay */}
                
              </div>

              {/* Adults */}
              <div className="w-16">
                <span className="block text-xs text-gray-500 tracking-wider mb-1">
                  Adults
                </span>
                <select
                  value={bookingData.adults}
                  onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                  className="w-full  px-1 py-1 text-xs border border-gray-300 rounded text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Button row */}
            <div className="text-center">
              <button
                onClick={handleBookingSubmit}
                className="w-full px-5 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition text-sm"
              >
                {t('callButton')}
              </button>
            </div>
          </div>

          {/* Desktop Layout: Original horizontal layout */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Check-in Date */}
            <div className="flex flex-col items-start text-sm min-w-0">
              <span className="uppercase text-gray-500 tracking-wider text-xs whitespace-nowrap">
              {t('Check-in')}
              </span>
              <input
                type="date"
                min={today}
                value={bookingData.checkInDate}
                onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                className="mt-1 px-2 py-1 font-trajan border border-gray-300 rounded text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full"
              />
            </div>

            <div className="h-8 border-l border-gray-300" />

            {/* Check-out Date */}
            <div className="flex flex-col items-start text-sm min-w-0 relative">
              <span className="uppercase text-gray-500 tracking-wider text-xs whitespace-nowrap">
              {t('Check-out')}
              </span>
              <input
                type="date"
                value={bookingData.checkOutDate}
                readOnly
                className="mt-1 font-trajan px-2 py-1 border border-gray-300 rounded text-gray-800 text-sm w-full bg-gray-50 cursor-not-allowed"
                title="Check-out date is automatically set to 3 nights after check-in"
              />
              
            </div>

            <div className="h-8 border-l border-gray-300" />

            {/* Adults */}
            <div className="flex flex-col items-start text-sm min-w-0">
              <span className="uppercase text-gray-500 tracking-wider text-xs whitespace-nowrap">
                Adults
              </span>
              <select
                value={bookingData.adults}
                onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                className="mt-1 px-1 xl:px-1 py-1 font-trajan border border-gray-300 rounded text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="h-8 border-l border-gray-300" />

            {/* CTA Button */}
            <button
              onClick={handleBookingSubmit}
              className="px-5 py-2 border text-center border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition"
            >
              {t('callButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}