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
  return `chatbot_5_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const WhatsAppChatbot5: React.FC = () => {
  const [sessionId] = useState<string>(generateSessionId());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', phone: '', hasProvidedInfo: false });
  const [bookingData, setBookingData] = useState<BookingData>({ checkInDate: '', checkOutDate: '', adults: 2 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Translations
  const t = useTranslations('offer5.chatbot5');

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
          showMainMenu();
        }, 1000);
      }, 500);
    }
  };

  const showMainMenu = (): void => {
    addMessage(t('menu.title'), false, true, [
      { text: t('menu.options.program'), value: "program" },
      { text: t('menu.options.info'), value: "info" },
      { text: t('menu.options.booking'), value: "booking" }
    ]);
  };

  // Auto-calculate check-out date (5 nights after check-in)
  const calculateCheckoutDate = (checkInDate: string): string => {
    if (!checkInDate) return '';
    const checkIn = new Date(checkInDate);
    checkIn.setDate(checkIn.getDate() + 5); // Add 5 days for 5 nights
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
        addMessage(`📋 **Récapitulatif complet :**\n👤 ${parts[0]}\n📞 ${parts[1]}\n📅 ${bookingData.checkInDate} → ${bookingData.checkOutDate}\n👥 ${bookingData.adults} adulte${bookingData.adults > 1 ? 's' : ''}\n🌙 5 nuits d'évasion holistique`, false);
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
          addMessage("🌟 **Programme Évasion Holistique 5 Nuits**\n\nUn voyage complet de transformation corps & esprit :", false);
          setTimeout(() => {
            const programText = `**🌅 Jour 1 - Arrivée au Dakhla Club**\n• Accueil personnalisé\n• Infusion d'ancrage\n• Installation bungalow vue nature/océan\n• Début en douceur dans un environnement pur\n\n**🧘‍♀️ Jour 2 - Lâcher-prise & Équilibre**\n• Yoga doux au lever du soleil\n• Sauna sec\n• Piscine thermale chauffée\n• Scrub détox sel himalaya\n• Hammam mille et une nuit\n\n**💆‍♀️ Jour 3 - Oxygénation & Régénération**\n• Yoga respiration & énergie\n• Bol d'Air Jacquier\n• Douche à jet\n• Bain hydromassant\n• Enveloppement aux algues\n• Modelage sous affusion`;
            
            addMessage(programText, false);
            setTimeout(() => {
              const programText2 = `**🌊 Jour 4 - Sérénité & Détente Profonde**\n• Yoga méditatif\n• Bol d'Air Jacquier\n• Sauna\n• Piscine thermale\n• Bain au magnésium\n• Massage traditionnel profond\n\n**⚡ Jour 5 - Stimulation & Vitalité**\n• Yoga dynamisant\n• Bol d'Air Jacquier\n• Soin lissant détoxifiant spiruline\n• Cupping thérapie serviette de feu\n• Manucure + Pédicure\n\n**🏡 Jour 6 - Départ du Dakhla Club**\n• Rituel de clôture\n• Conseils de prolongation\n• Carnet de bien-être à emporter`;
              
              addMessage(programText2, false);
              setTimeout(() => {
                addMessage("**✨ Résultat :** Une transformation complète en 6 jours (5 nuits) pour retrouver votre énergie et votre équilibre naturel !", false, true, [
                  { text: "🔸 Connaître les bienfaits concrets", value: "benefits" },
                  { text: "🔸 Réserver maintenant", value: "booking" }
                ]);
              }, 2000);
            }, 2000);
          }, 1000);
          break;

        case 'benefits':
          addMessage("✨ **Bienfaits de votre évasion 5 nuits**", false);
          setTimeout(() => {
            addMessage("🌟 En 5 nuits, votre corps et votre esprit vous diront merci :", false);
            setTimeout(() => {
              const physicalText = `💪 **Physiques**\n• Détoxification profonde\n• Regain d'énergie\n• Amélioration du sommeil\n• Renforcement immunitaire`;
              addMessage(physicalText, false);
              setTimeout(() => {
                const mentalText = `🧠 **Mentaux**\n• Réduction du stress\n• Clarté mentale\n• Équilibre émotionnel\n• Confiance retrouvée`;
                addMessage(mentalText, false);
                setTimeout(() => {
                  addMessage(`⏳ **Et après le séjour ?**\nNouvelles habitudes saines, outils de bien-être, suivi personnalisé post-séjour`, false);
                  setTimeout(() => {
                    addMessage("🎯 Motivé(e) pour commencer cette transformation ?", false, true, [
                      { text: "🔸 Je réserve maintenant", value: "booking" },
                      { text: "🔸 Parler à un conseiller", value: "advisor" }
                    ]);
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
          break;
          
        case 'booking':
          addMessage("📅 **Je réserve ma transformation**", false);
          setTimeout(() => {
            addMessage("🎉 **Excellente décision !** Vous vous offrez 5 nuits de transformation holistique.", false);
            setTimeout(() => {
              addMessage("📅 **Quelle est votre date d'arrivée souhaitée ?**", false);
              setTimeout(() => {
                addMessage(`Format : AAAA-MM-JJ\nExemple : ${getTodayDate()}\n\nNote : Votre séjour sera automatiquement de 5 nuits 🌙`, false);
                setCurrentStep('booking_date');
              }, 1000);
            }, 1000);
          }, 1000);
          break;

        case 'info':
          addMessage("ℹ️ **Informations Pratiques - Évasion 5 Nuits**", false);
          setTimeout(() => {
            const infoText = `📍 **Lieu :** Dakhla Club, Point de Dragon PK28\n⏰ **Durée :** 6 jours / 5 nuits\n🏠 **Hébergement :** Inclus en pension complète\n🍽️ **Repas :** Cuisine santé et détox\n👥 **Capacité :** Groupes de 2 à 8 personnes\n📞 **Contact :** +212 652 881 921`;
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
          addMessage("🤝 **Parler à un conseiller spécialisé**", false);
          setTimeout(() => {
            const contactText = `📞 **Ligne directe** : +212 652 88 1921\n💬 **WhatsApp** : +212 652 88 1921\n📧 **Email** : reservation@dakhlaclub.com\n🕘 **Disponibilité** : Tous les jours de 9h à 20h\n⚡ **Réponse rapide** : WhatsApp < 2h • Email < 4h`;
            addMessage(contactText, false);
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
                  addMessage(`📋 **Récapitulatif de votre réservation :**\n👤 ${userInfo.name}\n📞 ${userInfo.phone}\n📅 Arrivée : ${bookingData.checkInDate}\n📅 Départ : ${bookingData.checkOutDate}\n👥 ${bookingData.adults} adulte(s)\n🌙 5 nuits d'évasion holistique\n\nUn conseiller vous contactera pour confirmer les détails !`, false);
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
          addMessage(`✅ **${adultCount} adulte${adultCount > 1 ? 's' : ''} confirmé${adultCount > 1 ? 's' : ''} !**`, false);
          setTimeout(() => {
            addMessage(`📅 **Arrivée :** ${updatedDates.checkInDate}\n📅 **Départ :** ${updatedDates.checkOutDate}\n👥 **Adultes :** ${updatedDates.adults}`, false);
            setTimeout(() => {
              addMessage("📞 **Maintenant, j'ai besoin de vos coordonnées :**", false);
              setTimeout(() => {
                addMessage("Format : Prénom Nom - 0612345678\nExemple : Marie Dupont - 0612345678", false);
                setCurrentStep('contact_info');
              }, 1000);
            }, 1000);
          }, 1000);
          break;

        case 'booking_info_step':
          addMessage("Parfait ! Maintenant j'ai besoin de vos coordonnées :", false);
          setTimeout(() => {
            addMessage("Format : Prénom Nom - 0612345678", false);
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
    const message = encodeURIComponent("Bonjour ! Je souhaite en savoir plus sur l'Évasion Holistique 5 nuits au Dakhla Club.");
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
              addMessage(`📅 **Arrivée :** ${dates.checkInDate}\n📅 **Départ :** ${dates.checkOutDate} (5 nuits)`, false);
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
          addMessage("Format incorrect. Merci de respecter le format : Prénom Nom - Numéro de téléphone", false);
          addMessage("Exemple : Ahmed Bennani - 0661234567", false);
        }, 1000);
      }
    } else {
      // Handle other messages
      setTimeout(() => {
        addMessage("Merci pour votre message ! Un conseiller vous répondra sous peu. Pour une réponse immédiate, appelez le +212 652 88 1921.", false);
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
                <p className="text-xs opacity-90">En ligne • Répond rapidement</p>
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
                <span>Appeler</span>
              </button>
              <button
                onClick={handleWhatsAppRedirect}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-xs flex items-center justify-center space-x-1 hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
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
                  "Tapez votre message..."
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

export default WhatsAppChatbot5;