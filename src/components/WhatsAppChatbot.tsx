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

    // ✅ Utiliser l'API route Next.js au lieu de l'URL Google Apps Script directement
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
    
    // Retourner une erreur structurée au lieu de faire planter l'application
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
        addMessage(t('welcome.greeting'), false);
        setTimeout(() => {
          addMessage(t('welcome.requestInfo'), false);
          setTimeout(() => {
            addMessage(t('welcome.format'), false);
          }, 500);
        }, 1000);
      }, 500);
    }
  };

  const showMainMenu = (): void => {
    addMessage(t('menu.title'), false, true, [
      { text: t('menu.options.program'), value: "program" },
      { text: t('menu.options.booking'), value: "booking" },
      { text: t('menu.options.info'), value: "info" }
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
    // Simple validation for name and phone
    const parts = input.split('-').map(part => part.trim());
    if (parts.length >= 2 && parts[0].length > 2 && parts[1].length > 8) {
      setUserInfo({
        name: parts[0],
        phone: parts[1],
        hasProvidedInfo: true
      });
      addMessage(`Merci ${parts[0]} ! Ravi de faire votre connaissance. 😊`, false);
      setTimeout(() => {
        showMainMenu();
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
            const programText = `${t('program.day1.title')}\n${t('program.day1.activities')}\n\n${t('program.day2.title')}\n${t('program.day2.activities')}\n\n${t('program.day3.title')}\n${t('program.day3.activities')}\n\n${t('program.day4.title')}\n${t('program.day4.activities')}`;
            
            addMessage(programText, false);
            setTimeout(() => {
              addMessage(t('program.followUp'), false, true, [
                { text: t('actions.reserve'), value: "booking" },
                { text: " Témoignages clients", value: "testimonials" },
                { text: t('menu.options.info'), value: "info" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'booking':
          addMessage(t('booking.decision'), false);
          setTimeout(() => {
            addMessage(t('booking.needInfo'), false);
            setTimeout(() => {
              addMessage(t('booking.askDate'), false);
              addMessage(`${t('booking.dateFormat')}\n${t('booking.example')} ${getTodayDate()}\n\n${t('booking.note')}`, false);
             
              setCurrentStep('booking');
            }, 1000);
          }, 1000);
          break;
          
          case 'redirect_booking':
  if (bookingData.checkInDate && bookingData.checkOutDate) {
    addMessage("🔄 Redirection vers le système de réservation...", false);
    setTimeout(() => {
      const bookingUrl = generateBookingUrl(bookingData);
      window.open(bookingUrl, '_blank');
      addMessage("✅ La page de réservation s'est ouverte dans un nouvel onglet.", false);
      
      // Envoyer les données de réservation via l'API route (sans CORS)
      sendReservationToSheets(userInfo, bookingData, sessionId)
        .then((result) => {
          if (result.status === 'success') {
            console.log('✅ Données sauvegardées avec succès');
            // Optionnel: Afficher un message de confirmation
            setTimeout(() => {
              addMessage("📊 Vos informations ont été enregistrées avec succès!", false);
            }, 2000);
          } else {
            console.error('❌ Erreur lors de la sauvegarde:', result.message);
            // Gérer l'erreur de manière gracieuse sans interrompre l'UX
          }
        })
        .catch((error) => {
          console.error('❌ Erreur réseau:', error);
          // Continuer sans interrompre l'expérience utilisateur
        });
      
      setTimeout(() => {
        addMessage(`📋 **Récapitulatif de votre réservation :**
👤 ${userInfo.name}
📞 ${userInfo.phone}
📅 Arrivée : ${bookingData.checkInDate}
📅 Départ : ${bookingData.checkOutDate}
👥 ${bookingData.adults} adulte(s)

Un conseiller vous contactera pour confirmer les détails !`, false);
      }, 1500);
    }, 1500);
  } else {
    addMessage("❌ Veuillez d'abord choisir vos dates d'arrivée.", false);
  }
  break;
        case 'info':
          addMessage(t('info.title'), false);
          setTimeout(() => {
            addMessage(t('info.details'), false);
            setTimeout(() => {
              addMessage("Autres informations souhaitées ?", false, true, [
                { text: "Météo et climat", value: "weather" },
                { text: "Bénéfices du programme", value: "benefits" },
                { text: t('menu.options.booking'), value: "booking" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'testimonials':
          addMessage(t('testimonials.title'), false);
          setTimeout(() => {
            addMessage(t('testimonials.reviews'), false);
            setTimeout(() => {
              addMessage(t('testimonials.convinced'), false, true, [
                { text: t('actions.reserve'), value: "booking" },
                { text: "J'ai encore des questions", value: "questions" },
                { text: "Parler à un expert", value: "advisor" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'weather':
          addMessage(t('weather.title'), false);
          setTimeout(() => {
            addMessage(t('weather.details'), false);
            setTimeout(() => {
              addMessage(t('weather.ready'), false, true, [
                { text: t('menu.options.booking'), value: "booking" },
                { text: t('menu.options.program'), value: "program" }
              ]);
            }, 1500);
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
                    { text: "Oui, je réserve maintenant", value: "booking" },
                    { text: "Voir le programme détaillé", value: "program" }
                  ]);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
          break;
          
        case 'advisor':
          addMessage(t('advisor.title'), false);
          setTimeout(() => {
            const advisorText = t('advisor.contact')
              .replace('{name}', userInfo.name)
              .replace('{phone}', userInfo.phone);
            addMessage(advisorText, false);
          }, 1000);
          break;
          
        case 'questions':
          addMessage(t('faq.title'), false);
          setTimeout(() => {
            addMessage(t('faq.content'), false);
            setTimeout(() => {
              addMessage(t('faq.notListed'), false, true, [
                { text: " Poser ma question à un conseiller", value: "advisor" },
                { text: " Réserver malgré tout", value: "booking" },
                { text: " Retour au menu", value: "main_menu" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'confirm_booking':
          addMessage("🎉 **Réservation en cours...**", false);
          setTimeout(() => {
            addMessage(`Vous allez être redirigé vers notre système de réservation sécurisé.

📋 **Récapitulatif :**
👤 ${userInfo.name}
📞 ${userInfo.phone}
📅 ${bookingData.checkInDate} → ${bookingData.checkOutDate}
👥 ${bookingData.adults} adulte(s)
🌙 3 nuits d'évasion holistique`, false);
            setTimeout(() => {
              addMessage("Prêt(e) à finaliser votre réservation ?", false, true, [
                { text: "✅ Oui, réserver maintenant", value: "redirect_booking" },
                { text: "📞 Parler d'abord à un conseiller", value: "advisor" }
              ]);
            }, 2000);
          }, 1000);
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
            addMessage(`📅 **Arrivée :** ${updatedDates.checkInDate}
📅 **Départ :** ${updatedDates.checkOutDate}
👥 **Adultes :** ${updatedDates.adults}

Tout est parfait ?`, false, true, [
              { text: "✅ Oui, réserver maintenant", value: "confirm_booking" },
              { text: "👥 Modifier encore", value: "change_adults" }
            ]);
          }, 1000);
          break;
          
        case 'adults_more':
          addMessage("Pour plus de 4 adultes, veuillez contacter directement notre équipe :", false);
          setTimeout(() => {
            addMessage(`📞 **Téléphone :** +21265288192
📧 **Email :** reservation@dakhlaclub.com

Ils pourront vous proposer des solutions adaptées à votre groupe !`, false);
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
    window.open('tel:+212665288192', '_self');
  };

  const handleWhatsAppRedirect = (): void => {
    const message = encodeURIComponent(t('messages.whatsappRedirect'));
    window.open(`https://wa.me/212665288192?text=${message}`, '_blank');
  };

  // Handle message sending with proper date validation
  const handleSendMessage = (): void => {
    if (!userInput.trim()) return;

    addMessage(userInput, true);
    
    if (!userInfo.hasProvidedInfo) {
      // Handle user info submission
      if (handleUserInfoSubmission(userInput)) {
        setUserInput('');
      } else {
        setTimeout(() => {
          addMessage(t('errors.incorrectFormat'), false);
          addMessage(t('errors.example'), false);
        }, 1000);
        setUserInput('');
      }
    } else {
      // Handle regular messages based on current step
      setUserInput('');
      
      // Check if we're in booking flow and expecting a date
      if (currentStep === 'booking') {
        // Check if it's a valid date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(userInput)) {
          const inputDate = new Date(userInput);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          // Check if date is valid (not NaN)
          if (isNaN(inputDate.getTime())) {
            setTimeout(() => {
              addMessage("❌ Date invalide. Veuillez utiliser le format AAAA-MM-JJ", false);
              addMessage(`Exemple valide: ${getTodayDate()}`, false);
              addMessage("Merci de réessayer avec une date valide.", false);
            }, 1000);
          } else if (inputDate < today) {
            setTimeout(() => {
              addMessage(t('errors.pastDate'), false);
              addMessage(t('errors.chooseToday'), false);
            }, 1000);
          } else {
            const dates = handleDateSelection(userInput, 2);
            setCurrentStep('booking_confirmed');
            setTimeout(() => {
              addMessage(`✅ **Dates confirmées !**`, false);
              setTimeout(() => {
                addMessage(`📅 **Arrivée :** ${dates.checkInDate}
📅 **Départ :** ${dates.checkOutDate} (3 nuits)
👥 **Adultes :** ${dates.adults}

Souhaitez-vous modifier le nombre d'adultes ?`, false, true, [
                  { text: "✅ C'est parfait, continuer", value: "confirm_booking" },
                  { text: "👥 Modifier le nombre d'adultes", value: "change_adults" },
                  { text: "📅 Changer les dates", value: "booking" }
                ]);
              }, 1000);
            }, 1000);
          }
        } else {
          // Invalid date format
          setTimeout(() => {
            addMessage(" Format de date incorrect.", false);
            addMessage(` Veuillez utiliser le format: AAAA-MM-JJ`, false);
            addMessage(`Exemple: ${getTodayDate()}`, false);
            addMessage("Merci de réessayer.", false);
          }, 1000);
        }
      } else {
        // Handle other types of messages
        setTimeout(() => {
          addMessage(t('messages.thankYou'), false);
          setTimeout(() => {
            showMainMenu();
          }, 1000);
        }, 1000);
      }
    }
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
            {/* Robot Icon */}
            <Bot size={28} className="text-white" />
          </button>
          
          {/* Notification Badge */}
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
                placeholder={userInfo.hasProvidedInfo ? t('placeholders.typeMessage') : t('placeholders.namePhone')}
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