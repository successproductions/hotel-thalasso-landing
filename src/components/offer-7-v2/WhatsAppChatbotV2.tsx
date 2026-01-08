'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Message {
  text: string;
  isUser: boolean;
  isOptions: boolean;
  options: ChatOption[];
  timestamp: string;
}

interface ChatOption {
  text: string;
  value: string;
}

interface UserInfo {
  name: string;
  phone: string;
  hasProvidedInfo: boolean;
}

interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
}

//check is mobile chatbot
const isMobile = (): boolean => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
};

const sendReservationToSheets = async (
  userInfo: UserInfo,
  bookingData: BookingData,
  sessionId: string,
) => {
  try {
    const reservationData = {
      event: 'pageOpened',
      status: 'reservation_confirmed',
      userInfo: {
        name: userInfo.name,
        phone: userInfo.phone,
      },
      bookingData: {
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        adults: bookingData.adults,
      },
      sessionId: sessionId,
      timestamp: new Date().toISOString(),
    };

    console.log('Envoi des données de réservation:', reservationData);

    const response = await fetch('/api/chatbot-reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log('Données de réservation envoyées avec succès:', result);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données de réservation:", error);

    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
};

const generateSessionId = (): string => {
  return `chatbot_7v2_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const WhatsAppChatbotV2: React.FC = () => {
  const [sessionId] = useState<string>(generateSessionId());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone: '',
    hasProvidedInfo: false,
  });
  const [bookingData, setBookingData] = useState<BookingData>({
    checkInDate: '',
    checkOutDate: '',
    adults: 2,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Translations
  const t = useTranslations('offer7.chatbot7');

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (
    message: string,
    isUser: boolean = false,
    isOptions: boolean = false,
    options: ChatOption[] = [],
  ): void => {
    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isUser,
        isOptions,
        options,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleOpenChat = (): void => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(t('welcome.greeting'), false);
        setTimeout(() => {
          showMainMenu();
        }, 1000);
      }, 500);
    }
  };

  const showMainMenu = (): void => {
    addMessage(t('menu.title'), false, true, [
      { text: t('menu.options.program'), value: 'program' },
      { text: t('menu.options.info'), value: 'info' },
      { text: t('menu.options.booking'), value: 'booking' },
    ]);
  };

  // Auto-calculate check-out date (7 nights after check-in)
  const calculateCheckoutDate = (checkInDate: string): string => {
    if (!checkInDate) return '';
    const checkIn = new Date(checkInDate);
    checkIn.setDate(checkIn.getDate() + 7); // Add 7 days for 7 nights
    return checkIn.toISOString().split('T')[0];
  };

  const getTodayDate = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  const handleDateSelection = (checkInDate: string, adults: number): BookingData => {
    const checkOutDate = calculateCheckoutDate(checkInDate);
    const newBookingData = {
      checkInDate,
      checkOutDate,
      adults: adults || 2,
    };
    setBookingData(newBookingData);
    return newBookingData;
  };

  const generateBookingUrl = (dates: BookingData): string => {
    const baseUrl = 'https://direct-book.com/properties/DakhlaClubDIRECT';
    const params = new URLSearchParams({
      check_in_date: dates.checkInDate,
      check_out_date: dates.checkOutDate,
      'items[0][adults]': dates.adults.toString(),
      'items[0][children]': '0',
      'items[0][infants]': '0',
      currency: 'MAD',
      locale: 'fr',
      trackPage: 'yes',
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleUserInfoSubmission = (input: string): boolean => {
    // Simple validation for name and phone - accepting both - and – separators
    const parts = input.split(/[-–]/).map((part) => part.trim());
    if (parts.length >= 2 && parts[0].length > 2 && parts[1].length > 0) {
      setUserInfo({
        name: parts[0],
        phone: parts[1],
        hasProvidedInfo: true,
      });
      addMessage(t('summary.perfect', { name: parts[0] }), false);
      setTimeout(() => {
        const plural = bookingData.adults > 1 ? 's' : '';
        addMessage(
          t('summary.complete', {
            name: parts[0],
            phone: parts[1],
            checkInDate: bookingData.checkInDate,
            checkOutDate: bookingData.checkOutDate,
            adults: bookingData.adults.toString(),
            plural: plural,
          }),
          false,
        );
        setTimeout(() => {
          addMessage(t('summary.allReady'), false);
          setTimeout(() => {
            addMessage(t('summary.finalizeText'), false, true, [
              { text: t('summary.finalize'), value: 'redirect_booking' },
            ]);
          }, 1000);
        }, 1000);
      }, 1000);
      return true;
    }
    return false;
  };

  const handleOptionSelect = (option: ChatOption): void => {
    addMessage(option.text, true);

    setTimeout(() => {
      switch (option.value) {
        case 'program':
          addMessage(t('program.title'), false);
          setTimeout(() => {
            const programText = `${t('program.day1.title')}\n${t('program.day1.activities')}\n\n${t('program.day2.title')}\n${t('program.day2.activities')}\n\n${t('program.day3.title')}\n${t('program.day3.activities')}`;

            addMessage(programText, false);
            setTimeout(() => {
              const programText2 = `${t('program.day4.title')}\n${t('program.day4.activities')}\n\n${t('program.day5.title')}\n${t('program.day5.activities')}\n\n${t('program.day6.title')}\n${t('program.day6.activities')}`;

              addMessage(programText2, false);
              setTimeout(() => {
                addMessage(t('program.followUp'), false, true, [
                  { text: t('info.options.advisor'), value: 'advisor' },
                  { text: t('info.options.reserve'), value: 'booking' },
                ]);
              }, 2000);
            }, 2000);
          }, 1000);
          break;

        case 'benefits':
          addMessage(t('benefits.title'), false);
          setTimeout(() => {
            addMessage(t('benefits.physical'), false);
            setTimeout(() => {
              addMessage(t('benefits.mental'), false);
              setTimeout(() => {
                addMessage(t('benefits.lasting'), false);
                setTimeout(() => {
                  addMessage(t('benefits.motivated'), false, true, [
                    { text: t('info.options.reserve'), value: 'booking' },
                    { text: t('actions.call'), value: 'advisor' },
                  ]);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
          break;

        case 'booking':
          setTimeout(() => {
            addMessage(t('booking.decision'), false);
            setTimeout(() => {
              addMessage(t('booking.fields.date'), false);
              setTimeout(() => {
                addMessage(t('booking.dateFormat'), false);
                setCurrentStep('booking_date');
              }, 1000);
            }, 1000);
          }, 1000);
          break;

        case 'info':
          addMessage(t('info.title'), false);
          setTimeout(() => {
            addMessage(t('info.details'), false);
            setTimeout(() => {
              addMessage(t('info.followUp'), false, true, [
                { text: t('info.options.program'), value: 'program' },
                { text: t('info.options.reserve'), value: 'booking' },
                { text: t('info.options.advisor'), value: 'advisor' },
              ]);
            }, 2000);
          }, 1000);
          break;

        case 'advisor':
          addMessage(t('advisor.title'), false);
          setTimeout(() => {
            addMessage(t('advisor.contact2'), false);
            addMessage(t('info.followUp'), false, true, [
              { text: t('info.options.booking'), value: 'booking' },
            ]);
          }, 1000);
          break;

        case 'redirect_booking':
          if (bookingData.checkInDate && bookingData.checkOutDate && userInfo.hasProvidedInfo) {
            addMessage(t('booking.redirecting'), false);
            setTimeout(() => {
              const bookingUrl = generateBookingUrl(bookingData);

              if (isMobile()) {
                addMessage(t('booking.mobileRedirect'), false);
                window.location.href = bookingUrl;
              } else {
                window.open(bookingUrl, '_blank');
                addMessage(t('booking.newTabOpened'), false);
              }

              sendReservationToSheets(userInfo, bookingData, sessionId)
                .then((result) => {
                  if (result.status === 'success') {
                    console.log('✅ Données sauvegardées avec succès');
                    if (!isMobile()) {
                      setTimeout(() => {
                        addMessage(t('booking.dataSuccess'), false);
                      }, 2000);
                    }
                  } else {
                    console.error('❌ Erreur lors de la sauvegarde:', result.message);
                  }
                })
                .catch((error) => {
                  console.error('❌ Erreur réseau:', error);
                });

              if (!isMobile()) {
                setTimeout(() => {
                  addMessage(
                    t('summary.bookingSummary', {
                      name: userInfo.name,
                      phone: userInfo.phone,
                      checkInDate: bookingData.checkInDate,
                      checkOutDate: bookingData.checkOutDate,
                      adults: bookingData.adults.toString(),
                    }),
                    false,
                  );
                }, 1500);
              }
            }, 1500);
          } else {
            addMessage(t('booking.missingInfo'), false);
            setTimeout(() => {
              addMessage(t('booking.backToBooking'), false, true, [
                { text: t('booking.chooseDates'), value: 'booking' },
              ]);
            }, 1000);
          }
          break;

        case 'change_adults':
          addMessage(t('booking.askAdults'), false, true, [
            { text: t('booking.adultsOptions.adults1'), value: 'adults_1' },
            { text: t('booking.adultsOptions.adults2'), value: 'adults_2' },
            { text: t('booking.adultsOptions.adults3'), value: 'adults_3' },
            { text: t('booking.adultsOptions.adults4'), value: 'adults_4' },
            { text: t('booking.adultsOptions.adultsMore'), value: 'adults_more' },
          ]);
          break;

        case 'adults_1':
        case 'adults_2':
        case 'adults_3':
        case 'adults_4':
          const adultCount = parseInt(option.value.split('_')[1]);
          const updatedDates = handleDateSelection(bookingData.checkInDate, adultCount);
          addMessage(
            t('booking.adultsConfirmed', {
              count: adultCount.toString(),
              plural: adultCount > 1 ? 's' : '',
            }),
            false,
          );
          setTimeout(() => {
            addMessage(
              t('booking.arrival', { checkIn: updatedDates.checkInDate }) +
                '\n' +
                t('booking.departure', { checkOut: updatedDates.checkOutDate }),
              false,
            );
            setTimeout(() => {
              addMessage(t('booking.contactNeeded'), false);
              setTimeout(() => {
                addMessage(t('booking.formatExample'), false);
                setCurrentStep('contact_info');
              }, 1000);
            }, 1000);
          }, 1000);
          break;

        case 'booking_info_step':
          addMessage(t('booking.contactNeeded'), false);
          setTimeout(() => {
            addMessage(t('booking.formatExample'), false);
            setCurrentStep('contact_info');
          }, 1000);
          break;

        case 'adults_more':
          addMessage(t('booking.largeGroup'), false);
          setTimeout(() => {
            addMessage(t('booking.contactInfo'), false);
          }, 1000);
          break;

        case 'main_menu':
          showMainMenu();
          break;

        default:
          showMainMenu();
      }
    }, 1000);
  };

  const handleDirectCall = (): void => {
    window.open('tel:+212652881921', '_self');
  };

  const handleWhatsAppRedirect = (): void => {
    const message = encodeURIComponent(t('messages.whatsappRedirect'));
    window.open(`https://wa.me/212652881921?text=${message}`, '_blank');
  };

  // Handle message sending with step-by-step validation
  const handleSendMessage = (): void => {
    if (!userInput.trim()) return;

    addMessage(userInput, true);

    if (currentStep === 'booking_date') {
      // Handle date input
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(userInput)) {
        const inputDate = new Date(userInput);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isNaN(inputDate.getTime())) {
          setTimeout(() => {
            addMessage(t('errors.invalidDate'), false);
            addMessage(t('errors.validExample', { date: getTodayDate() }), false);
          }, 1000);
        } else if (inputDate < today) {
          setTimeout(() => {
            addMessage(t('errors.pastDate'), false);
            addMessage(t('errors.chooseToday'), false);
          }, 1000);
        } else {
          // Save the date and move to adults selection
          const dates = handleDateSelection(userInput, 2); // Default 2 adults for now
          setTimeout(() => {
            addMessage(t('booking.dateConfirmed'), false);
            setTimeout(() => {
              addMessage(
                t('booking.arrival', { checkIn: dates.checkInDate }) +
                  '\n' +
                  t('booking.departure', { checkOut: dates.checkOutDate }),
                false,
              );
              setTimeout(() => {
                addMessage(t('booking.askAdults'), false, true, [
                  { text: t('booking.adultsOptions.adults1'), value: 'adults_1' },
                  { text: t('booking.adultsOptions.adults2'), value: 'adults_2' },
                  { text: t('booking.adultsOptions.adults3'), value: 'adults_3' },
                  { text: t('booking.adultsOptions.adults4'), value: 'adults_4' },
                  { text: t('booking.adultsOptions.adultsMore'), value: 'adults_more' },
                ]);
                setCurrentStep('booking_adults');
              }, 1000);
            }, 1000);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          addMessage(t('errors.invalidDateFormat'), false);
          addMessage(t('errors.dateFormatInstruction'), false);
          addMessage(t('errors.dateExample', { date: getTodayDate() }), false);
        }, 1000);
      }
    } else if (currentStep === 'contact_info') {
      // Handle contact info
      if (handleUserInfoSubmission(userInput)) {
        setCurrentStep('booking_confirmed');
      } else {
        setTimeout(() => {
          addMessage(t('errors.incorrectFormat'), false);
          addMessage(t('errors.example'), false);
        }, 1000);
      }
    } else {
      // Handle other messages
      setTimeout(() => {
        addMessage(t('messages.thankYou'), false);
        setTimeout(() => {
          showMainMenu();
        }, 1000);
      }, 1000);
    }

    setUserInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Floating Button */}
      {!isOpen && (
        <div className="relative">
          <button
            onClick={handleOpenChat}
            className="flex h-16 w-16 transform items-center justify-center rounded-full bg-[#458b8b] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              animation: 'softGlow 2s ease-in-out infinite alternate',
            }}
          >
            <Bot size={28} className="text-white" />
          </button>

          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
            <span className="text-xs font-bold text-white">1</span>
          </div>

          <style jsx>{`
            @keyframes softGlow {
              0% {
                box-shadow: 0 4px 8px rgba(45, 90, 90, 0.3);
              }
              100% {
                box-shadow:
                  0 6px 20px rgba(45, 90, 90, 0.5),
                  0 0 0 4px rgba(45, 90, 90, 0.1);
              }
            }
          `}</style>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="flex h-[600px] w-96 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#14b8a6] p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <span className="text-lg font-bold text-[#14b8a6]">DC</span>
              </div>
              <div>
                <h3 className="font-semibold">Dakhla Club Assistant</h3>
                <p className="text-xs opacity-90">{t('status.online')}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white transition-colors hover:bg-[#0d9488]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-[#f4f4f4] p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${message.isUser ? 'bg-[#14b8a6] text-white' : 'bg-white text-gray-800'} rounded-2xl p-3 shadow-sm`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                  {message.isOptions && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleOptionSelect(option)}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-left text-xs transition-colors hover:bg-[#14b8a6] hover:text-white"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t bg-gray-50 p-3">
            <div className="mb-3 flex space-x-2">
              <button
                onClick={handleDirectCall}
                className="flex flex-1 items-center justify-center space-x-1 rounded-lg bg-[#14b8a6] px-3 py-2 text-xs text-white transition-colors hover:bg-[#0d9488]"
              >
                <Phone size={14} />
                <span>{t('actions.call')}</span>
              </button>
              <button
                onClick={handleWhatsAppRedirect}
                className="flex flex-1 items-center justify-center space-x-1 rounded-lg bg-green-500 px-3 py-2 text-xs text-white transition-colors hover:bg-green-600"
              >
                <MessageCircle size={14} />
                <span>{t('actions.whatsapp')}</span>
              </button>
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  currentStep === 'booking_date'
                    ? t('placeholders.date')
                    : currentStep === 'contact_info'
                      ? t('placeholders.namePhone')
                      : t('placeholders.typeMessage')
                }
                className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="rounded-full bg-[#14b8a6] p-2 text-white transition-colors hover:bg-[#0d9488]"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatbotV2;
