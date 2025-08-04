'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';

// TypeScript interfaces
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
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
};

const sendReservationToSheets = async (userInfo: UserInfo, bookingData: BookingData, sessionId: string) => {
  try {
    const reservationData = {
      event: 'pageOpened',
      status: 'reservation_confirmed',
      userInfo: {
        name: userInfo.name,
        phone: userInfo.phone
      },
      bookingData: {
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        adults: bookingData.adults
      },
      sessionId: sessionId,
      timestamp: new Date().toISOString()
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
    console.error('Erreur lors de l\'envoi des données de réservation:', error);
    
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
};

const generateSessionId = (): string => {
  return `chatbot_3_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const WhatsAppChatbot: React.FC = () => {
  const [sessionId] = useState<string>(generateSessionId());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', phone: '', hasProvidedInfo: false });
  const [bookingData, setBookingData] = useState<BookingData>({ checkInDate: '', checkOutDate: '', adults: 2 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Translations
  const t = useTranslations('chatbot');

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: string, isUser: boolean = false, isOptions: boolean = false, options: ChatOption[] = []): void => {
    setMessages(prev => [...prev, { 
      text: message, 
      isUser, 
      isOptions, 
      options, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleOpenChat = (): void => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        // New welcome flow - no name/phone request
        addMessage(t('welcome.greeting'), false);
        setTimeout(() => {
          addMessage(t('welcome.description'), false);
          setTimeout(() => {
            addMessage(t('welcome.instruction'), false);
            setTimeout(() => {
              showMainMenu();
            }, 500);
          }, 1000);
        }, 1000);
      }, 500);
    }
  };

  const showMainMenu = (): void => {
    addMessage(t('welcome.question'), false, true, [
      { text: t('menu.options.program'), value: "program" },
      { text: t('menu.options.info'), value: "info" },
      { text: t('menu.options.booking'), value: "booking" },
      { text: t('menu.options.advisor'), value: "advisor" }
    ]);
  };

  // Auto-calculate check-out date (3 nights after check-in)
  const calculateCheckoutDate = (checkInDate: string): string => {
    if (!checkInDate) return '';
    const checkIn = new Date(checkInDate);
    checkIn.setDate(checkIn.getDate() + 3); // Add 3 days for 3 nights
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
      adults: adults || 2
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
      trackPage: 'yes'
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleUserInfoSubmission = (input: string): boolean => {
    // Simple validation for name and phone - accepting both - and – separators
    const parts = input.split(/[-–]/).map(part => part.trim());
    if (parts.length >= 2 && parts[0].length > 2 && parts[1].length > 0) {
      setUserInfo({
        name: parts[0],
        phone: parts[1],
        hasProvidedInfo: true
      });
      addMessage(`✅ **Parfait ${parts[0]} !**`, false);
      setTimeout(() => {
        addMessage(`📋 **Récapitulatif complet :**\n👤 ${parts[0]}\n📞 ${parts[1]}\n📅 ${bookingData.checkInDate} → ${bookingData.checkOutDate}\n👥 ${bookingData.adults} adulte${bookingData.adults > 1 ? 's' : ''}\n🌙 3 nuits d'évasion holistique`, false);
        setTimeout(() => {
          addMessage("🎉 **Tout est prêt !**", false);
          setTimeout(() => {
            addMessage("Cliquez ci-dessous pour finaliser votre réservation en toute sécurité 🔒", false, true, [
              { text: "✅ Finaliser ma réservation", value: "redirect_booking" }
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
      switch(option.value) {
        case 'program':
          addMessage(t('program.title'), false);
          setTimeout(() => {
            addMessage(t('program.description'), false);
            setTimeout(() => {
              const programText = `${t('program.day1.title')}\n${t('program.day2.title')}\n${t('program.day3.title')}\n${t('program.day4.title')}`;
              
              addMessage(programText, false);
              setTimeout(() => {
                addMessage(t('program.followUp'), false, true, [
                  { text: t('program.nextOptions.benefits'), value: "benefits" },
                  { text: t('program.nextOptions.booking'), value: "booking" }
                ]);
              }, 2000);
            }, 1000);
          }, 1000);
          break;

        case 'benefits':
          addMessage(t('benefits.title'), false);
          setTimeout(() => {
            addMessage(t('benefits.description'), false);
            setTimeout(() => {
              const physicalText = `${t('benefits.physical.title')}\n${t('benefits.physical.items.0')}\n${t('benefits.physical.items.1')}\n${t('benefits.physical.items.2')}`;
              addMessage(physicalText, false);
              setTimeout(() => {
                const mentalText = `${t('benefits.mental.title')}\n${t('benefits.mental.items.0')}\n${t('benefits.mental.items.1')}\n${t('benefits.mental.items.2')}`;
                addMessage(mentalText, false);
                setTimeout(() => {
                  addMessage(`${t('benefits.lasting.title')}\n${t('benefits.lasting.description')}`, false);
                  setTimeout(() => {
                    addMessage(t('benefits.nextQuestion'), false, true, [
                      { text: t('benefits.nextOptions.booking'), value: "booking" },
                      { text: t('benefits.nextOptions.question'), value: "advisor" }
                    ]);
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
          break;
          
        case 'booking':
          addMessage(t('booking.title'), false);
          setTimeout(() => {
            addMessage(t('booking.decision'), false);
            setTimeout(() => {
              addMessage("📅 **Quelle est votre date d'arrivée souhaitée ?**", false);
              setTimeout(() => {
                addMessage(`Format: AAAA-MM-JJ\nExemple: ${getTodayDate()}\n\nNote: Votre séjour sera automatiquement de 3 nuits 🌙`, false);
                setCurrentStep('booking_date');
              }, 1000);
            }, 1000);
          }, 1000);
          break;

        case 'info':
          addMessage(t('info.title'), false);
          setTimeout(() => {
            const infoText = `${t('info.location')}\n${t('info.accommodation')}\n${t('info.meals')}\n${t('info.access')}\n\n${t('info.included.title')}\n${t('info.included.items.0')}\n${t('info.included.items.1')}\n${t('info.included.items.2')}\n${t('info.included.items.3')}\n${t('info.included.items.4')}\n\n${t('info.bring.title')}\n${t('info.bring.items.0')}\n${t('info.bring.items.1')}\n${t('info.bring.items.2')}\n${t('info.bring.items.3')}`;
            addMessage(infoText, false);
            setTimeout(() => {
              addMessage("Autres informations souhaitées ?", false, true, [
                { text: "🔸 Voir le programme détaillé", value: "program" },
                { text: "🔸 Réserver maintenant", value: "booking" },
                { text: "🔸 Parler à un conseiller", value: "advisor" }
              ]);
            }, 2000);
          }, 1000);
          break;

        case 'advisor':
          addMessage(t('advisor.title'), false);
          setTimeout(() => {
            addMessage(t('advisor.subtitle'), false);
            setTimeout(() => {
              const contactText = `${t('advisor.contact.phone')}\n${t('advisor.contact.whatsapp')}\n${t('advisor.contact.email')}\n${t('advisor.contact.hours')}\n${t('advisor.contact.response')}`;
              addMessage(contactText, false);
            }, 1000);
          }, 1000);
          break;
          
        case 'redirect_booking':
          if (bookingData.checkInDate && bookingData.checkOutDate && userInfo.hasProvidedInfo) {
            addMessage("🔄 Redirection vers le système de réservation...", false);
            setTimeout(() => {
              const bookingUrl = generateBookingUrl(bookingData);
              
              if (isMobile()) {
                addMessage("📱 Redirection en cours...", false);
                window.location.href = bookingUrl;
              } else {
                window.open(bookingUrl, '_blank');
                addMessage("✅ La page de réservation s'est ouverte dans un nouvel onglet.", false);
              }
              
              sendReservationToSheets(userInfo, bookingData, sessionId)
                .then((result) => {
                  if (result.status === 'success') {
                    console.log('✅ Données sauvegardées avec succès');
                    if (!isMobile()) {
                      setTimeout(() => {
                        addMessage("📊 Vos informations ont été enregistrées avec succès!", false);
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
                  const summaryText = t('summary.subtitle').replace('{name}', userInfo.name)
                    .replace('{phone}', userInfo.phone)
                    .replace('{checkInDate}', bookingData.checkInDate)
                    .replace('{checkOutDate}', bookingData.checkOutDate)
                    .replace('{adults}', bookingData.adults.toString());
                  
                  addMessage(`📋 ${summaryText}\n\n🌙 Séjour : 3 nuits d'évasion holistique\n\nUn conseiller vous contactera pour confirmer les détails !`, false);
                }, 1500);
              }
            }, 1500);
          } else {
            addMessage("❌ Veuillez d'abord remplir toutes les informations nécessaires.", false);
            setTimeout(() => {
              addMessage("Retournons à la réservation :", false, true, [
                { text: "📅 Choisir mes dates", value: "booking" }
              ]);
            }, 1000);
          }
          break;

        case 'change_adults':
          addMessage("👥 **Combien d'adultes serez-vous ?**", false, true, [
            { text: "1 adulte", value: "adults_1" },
            { text: "2 adultes", value: "adults_2" },
            { text: "3 adultes", value: "adults_3" },
            { text: "4 adultes", value: "adults_4" },
            { text: "Plus de 4 adultes", value: "adults_more" }
          ]);
          break;
          
        case 'adults_1':
        case 'adults_2':
        case 'adults_3':
        case 'adults_4':
          const adultCount = parseInt(option.value.split('_')[1]);
          const updatedDates = handleDateSelection(bookingData.checkInDate, adultCount);
          addMessage(`✅ **Réservation mise à jour !**`, false);
          setTimeout(() => {
            addMessage(`📅 **Arrivée :** ${updatedDates.checkInDate}\n📅 **Départ :** ${updatedDates.checkOutDate}\n👥 **Adultes :** ${updatedDates.adults}\n\nTout est parfait ?`, false, true, [
              { text: "✅ Oui, continuer", value: "booking_info_step" },
              { text: "👥 Modifier encore", value: "change_adults" }
            ]);
          }, 1000);
          break;

        case 'booking_info_step':
          addMessage("Parfait ! Maintenant j'ai besoin de vos coordonnées :", false);
          setTimeout(() => {
            addMessage(t('booking.fields.contact'), false);
            setCurrentStep('contact_info');
          }, 1000);
          break;
          
        case 'adults_more':
          addMessage("Pour plus de 4 adultes, veuillez contacter directement notre équipe :", false);
          setTimeout(() => {
            addMessage(`📞 **Téléphone :** +212 652 88 1921\n📧 **Email :** reservation@dakhlaclub.com\n\nIls pourront vous proposer des solutions adaptées à votre groupe !`, false);
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
            addMessage("❌ Date invalide. Veuillez utiliser le format AAAA-MM-JJ", false);
            addMessage(`Exemple valide: ${getTodayDate()}`, false);
          }, 1000);
        } else if (inputDate < today) {
          setTimeout(() => {
            addMessage("❌ La date d'arrivée ne peut pas être dans le passé.", false);
            addMessage("Veuillez choisir une date à partir d'aujourd'hui.", false);
          }, 1000);
        } else {
          // Save the date and move to adults selection
          const dates = handleDateSelection(userInput, 2); // Default 2 adults for now
          setTimeout(() => {
            addMessage(`✅ **Date confirmée !**`, false);
            setTimeout(() => {
              addMessage(`📅 **Arrivée :** ${dates.checkInDate}\n📅 **Départ :** ${dates.checkOutDate} (3 nuits)`, false);
              setTimeout(() => {
                addMessage("👥 **Combien d'adultes serez-vous ?**", false, true, [
                  { text: "1 adulte", value: "adults_1" },
                  { text: "2 adultes", value: "adults_2" },
                  { text: "3 adultes", value: "adults_3" },
                  { text: "4 adultes", value: "adults_4" },
                  { text: "Plus de 4 adultes", value: "adults_more" }
                ]);
                setCurrentStep('booking_adults');
              }, 1000);
            }, 1000);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          addMessage("❌ Format de date incorrect.", false);
          addMessage(`Veuillez utiliser le format: AAAA-MM-JJ`, false);
          addMessage(`Exemple: ${getTodayDate()}`, false);
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
            className="w-16 h-16 bg-[#458b8b] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{
              animation: 'softGlow 2s ease-in-out infinite alternate'
            }}
          >
            <Bot size={28} className="text-white" />
          </button>
          
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
          
          <style jsx>{`
            @keyframes softGlow {
              0% { box-shadow: 0 4px 8px rgba(45, 90, 90, 0.3); }
              100% { box-shadow: 0 6px 20px rgba(45, 90, 90, 0.5), 0 0 0 4px rgba(45, 90, 90, 0.1); }
            }
          `}</style>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#14b8a6] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#14b8a6] font-bold text-lg">DC</span>
              </div>
              <div>
                <h3 className="font-semibold">Dakhla Club Assistant</h3>
                <p className="text-xs opacity-90">{t('status.online')}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-[#0d9488] rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f4f4f4]">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.isUser ? 'bg-[#14b8a6] text-white' : 'bg-white text-gray-800'} rounded-2xl p-3 shadow-sm`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  {message.isOptions && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleOptionSelect(option)}
                          className="w-full text-left p-2 bg-gray-50 hover:bg-[#14b8a6] hover:text-white rounded-lg text-xs transition-colors border border-gray-200"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-3 bg-gray-50 border-t">
            <div className="flex space-x-2 mb-3">
              <button
                onClick={handleDirectCall}
                className="flex-1 bg-[#14b8a6] text-white px-3 py-2 rounded-lg text-xs flex items-center justify-center space-x-1 hover:bg-[#0d9488] transition-colors"
              >
                <Phone size={14} />
                <span>{t('actions.call')}</span>
              </button>
              <button
                onClick={handleWhatsAppRedirect}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-xs flex items-center justify-center space-x-1 hover:bg-green-600 transition-colors"
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
                  currentStep === 'booking_date' ? "AAAA-MM-JJ" :
                  currentStep === 'contact_info' ? "Prénom Nom - 06xx xx xx xx" :
                  t('placeholders.typeMessage')
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#14b8a6] text-white p-2 rounded-full hover:bg-[#0d9488] transition-colors"
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

export default WhatsAppChatbot;