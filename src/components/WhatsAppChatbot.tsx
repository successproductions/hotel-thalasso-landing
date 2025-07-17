'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', hasProvidedInfo: false });
  const [bookingData, setBookingData] = useState({ checkInDate: '', checkOutDate: '', adults: 2 });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message, isUser = false, isOptions = false, options = []) => {
    setMessages(prev => [...prev, { 
      text: message, 
      isUser, 
      isOptions, 
      options, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage("Bonjour ! 🌟 Bienvenue au Dakhla Club - votre refuge de bien-être entre désert et océan.", false);
        setTimeout(() => {
          addMessage("Pour mieux vous accompagner, pouvez-vous me donner votre nom et numéro de téléphone ?", false);
          setTimeout(() => {
            addMessage("Format : Nom Prénom - Numéro de téléphone", false);
          }, 500);
        }, 1000);
      }, 500);
    }
  };

  const showMainMenu = () => {
    addMessage("Parfait ! Comment puis-je vous aider aujourd'hui ?", false, true, [
      { text: " Découvrir le programme 3 jours", value: "program" },
      { text: " Réserver ma place", value: "booking" },
      { text: " Informations pratiques", value: "info" }
    ]);
  };

  // Auto-calculate check-out date (3 nights after check-in)
  const calculateCheckoutDate = (checkInDate) => {
    if (!checkInDate) return '';
    const checkIn = new Date(checkInDate);
    checkIn.setDate(checkIn.getDate() + 3); // Add 3 days for 3 nights
    return checkIn.toISOString().split('T')[0];
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleDateSelection = (checkInDate, adults) => {
    const checkOutDate = calculateCheckoutDate(checkInDate);
    setBookingData({
      checkInDate,
      checkOutDate,
      adults: adults || 2
    });
    return { checkInDate, checkOutDate, adults: adults || 2 };
  };

  const generateBookingUrl = (dates) => {
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

  const handleUserInfoSubmission = (input) => {
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

  const handleOptionSelect = (option) => {
    addMessage(option.text, true);
    
    setTimeout(() => {
      switch(option.value) {
        case 'program':
          addMessage("🗓️ Notre Évasion Holistique - 3 jours de pure régénération :", false);
          setTimeout(() => {
            addMessage(`**Jour 1** - Arrivée & Ancrage
 Bol d'Air Jacquier + Piscine thermale
 Objectif: Respiration, ouverture corps & esprit

**Jour 2** - Apaisement Profond  
 Sauna + Bain hydromassant + Enveloppement algues + Modelage affusion
 Objectif: Lâcher-prise, oxygénation cellulaire

**Jour 3** - Régénération & Vitalité
⚡ Douche à jet + Bain magnésium + Cupping thérapie  
 Objectif: Circulation, silhouette, recharge énergétique

**Jour 4** - Purification & Clôture
 Hammam Secret du Désert + Massage relaxant
 Objectif: Détox, apaisement, peau régénérée`, false);
            setTimeout(() => {
              addMessage("Que souhaitez-vous savoir d'autre ?", false, true, [
                { text: " Réserver maintenant", value: "booking" },
                { text: "🌟 Témoignages clients", value: "testimonials" },
                { text: "📍 Informations pratiques", value: "info" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'booking':
          addMessage("🎉 Excellente décision ! Votre corps vous remerciera.", false);
          setTimeout(() => {
            addMessage("Pour réserver votre séjour, j'ai besoin de quelques informations :", false);
            setTimeout(() => {
              addMessage("📅 **Quand souhaitez-vous arriver ?**", false);
              addMessage("Veuillez choisir votre date d'arrivée (format : AAAA-MM-JJ)", false);
              addMessage(`Exemple : ${getTodayDate()}`, false);
              addMessage("Note : Votre séjour sera automatiquement de 3 nuits 🌙", false);
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
            setTimeout(() => {
              addMessage("🔙 Retournons à la sélection des dates :", false, true, [
                { text: "📅 Choisir mes dates", value: "booking" }
              ]);
            }, 1000);
          }
          break;
          
        case 'info':
          addMessage("📍 **DC Thermes - Dakhla Club**", false);
          setTimeout(() => {
            addMessage(`🗺️ **Localisation** : Dakhla, entre désert et océan Atlantique
🏨 **Hébergement** : Bungalows avec vue océan/nature
🍽️ **Restauration** : Cuisine saine et locale incluse
🚗 **Accès** : 15min de l'aéroport de Dakhla

**Inclus dans votre séjour** :
✅ Tous les soins programmés
✅ Hébergement 3 nuits
✅ Pension complète bio
✅ Transferts aéroport
✅ Thés détox & collations

**À prévoir** :
• Maillot de bain
• Vêtements confortables  
• Sandales antidérapantes
• Protection solaire`, false);
            setTimeout(() => {
              addMessage("Autres informations souhaitées ?", false, true, [
                { text: "🌡️ Météo et climat", value: "weather" },
                { text: "🎯 Bénéfices du programme", value: "benefits" },
                { text: "📅 Réserver ma place", value: "booking" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'testimonials':
          addMessage("🌟 **Ce que nos clients disent** :", false);
          setTimeout(() => {
            addMessage(`💬 *"J'ai l'impression d'avoir appuyé sur reset. En 3 jours, j'ai retrouvé ma clarté, ma peau, mon calme. Incroyable."*
**- Amina, Rabat**

💬 *"Le cadre est magique, les soins exceptionnels. Je me suis sentie choyée du premier au dernier jour."*
**- Sarah, Casablanca**  

💬 *"3 jours qui valent des semaines de vacances classiques. Mon corps et mon esprit sont transformés."*
**- Latifa, Marrakech**

⭐ **Note moyenne** : 4.9/5 (147 avis)`, false);
            setTimeout(() => {
              addMessage("Convaincu(e) ? 😊", false, true, [
                { text: "✅ Je réserve maintenant", value: "booking" },
                { text: "🤔 J'ai encore des questions", value: "questions" },
                { text: "📱 Parler à un expert", value: "advisor" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'weather':
          addMessage("🌡️ **Climat à Dakhla** :", false);
          setTimeout(() => {
            addMessage(`☀️ **Température** : 20-28°C toute l'année
🌊 **Océan** : 18-24°C selon saison
💨 **Vent** : Brise océanique rafraîchissante
🌤️ **Ensoleillement** : 300+ jours/an

**Meilleures périodes** :
• Oct-Mai : Températures idéales
• Juin-Sept : Plus chaud mais très agréable avec la brise

Le climat de Dakhla est parfait pour les soins thalasso toute l'année ! 🌴`, false);
            setTimeout(() => {
              addMessage("Prêt(e) pour votre évasion ? 😊", false, true, [
                { text: "📅 Réserver maintenant", value: "booking" },
                { text: "🌿 Voir le programme", value: "program" }
              ]);
            }, 1500);
          }, 1000);
          break;
          
        case 'benefits':
          addMessage("🎯 **Les bénéfices de votre Évasion Holistique** :", false);
          setTimeout(() => {
            addMessage(`✨ **Physiques** :
• Oxygénation cellulaire profonde
• Détente musculaire complète
• Peau lissée et reminéralisée
• Silhouette affinée naturellement
• Sommeil profondément réparateur

🧠 **Mentaux** :
• Clarté d'esprit retrouvée
• Stress évacué durablement
• Énergie stable et équilibrée
• Reconnexion à soi-même
• Confiance renouvelée

💫 **Durables** :
• Techniques de respiration acquises
• Habitudes bien-être intégrées
• Motivation décuplée
• Nouveau regard sur sa santé`, false);
            setTimeout(() => {
              addMessage("Ces bénéfices vous motivent ?", false, true, [
                { text: "🔥 Oui, je réserve maintenant", value: "booking" },
                { text: "📋 Voir le programme détaillé", value: "program" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'advisor':
          addMessage("🤝 **Parler à un conseiller spécialisé**", false);
          setTimeout(() => {
            addMessage(`📞 **Ligne directe** : +212 652 88 192
💬 **WhatsApp Business** : +212 652 88 192  
📧 **Email VIP** : concierge@dakhlaclub.com

**Disponibilité** :
• Lun-Dim : 9h-20h
• Réponse WhatsApp : < 2h
• Réponse email : < 4h

Un expert bien-être vous rappellera pour répondre à toutes vos questions personnalisées et vous accompagner dans votre réservation.

Vos informations seront transmises :
👤 ${userInfo.name}
📞 ${userInfo.phone}`, false);
          }, 1000);
          break;
          
        case 'questions':
          addMessage("❓ **Questions fréquentes** :", false);
          setTimeout(() => {
            addMessage(`**Q: Que dois-je apporter ?**
R: Maillot de bain, vêtements confortables, sandales antidérapantes, protection solaire. Tout le reste est fourni !

**Q: Y a-t-il des contre-indications ?**
R: Grossesse, problèmes cardiaques sévères, plaies ouvertes. En cas de doute, consultez votre médecin.

**Q: Puis-je venir seul(e) ?**
R: Absolument ! Beaucoup de nos clients viennent en solo pour se reconnecter à eux-mêmes.

**Q: Quelle est la politique d'annulation ?**
R: Annulation gratuite jusqu'à 7 jours avant l'arrivée.`, false);
            setTimeout(() => {
              addMessage("Votre question n'y est pas ?", false, true, [
                { text: "📞 Poser ma question à un conseiller", value: "advisor" },
                { text: "📅 Réserver malgré tout", value: "booking" },
                { text: "🔙 Retour au menu", value: "main_menu" }
              ]);
            }, 2000);
          }, 1000);
          break;
          
        case 'confirm_booking':
          addMessage(`🎉 **Réservation en cours...**`, false);
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
            addMessage(`📞 **Téléphone :** +212 652 88 192
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

  const handleDirectCall = () => {
    window.open('tel:+212652881921', '_self');
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Bonjour ! Je souhaite en savoir plus sur l'Évasion Holistique 3 jours au Dakhla Club.");
    window.open(`https://wa.me/212652881921?text=${message}`, '_blank');
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
          {/* Clean pill-shaped chat bubble like your second image */}
          <div className="w-8 h-4 bg-white rounded-full flex items-center justify-center relative">
            {/* Small tail */}
            <div className="absolute -bottom-0.5 left-1.5 w-1.5 h-1.5 bg-white rounded-full transform rotate-45 translate-y-0.5"></div>
          </div>
        </button>
        
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
                placeholder={userInfo.hasProvidedInfo ? "Tapez votre message..." : "Nom Prénom - Numéro de téléphone"}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && userInput.trim()) {
                    addMessage(userInput, true);
                    
                    if (!userInfo.hasProvidedInfo) {
                      // Handle user info submission
                      if (handleUserInfoSubmission(userInput)) {
                        setUserInput('');
                      } else {
                        setTimeout(() => {
                          addMessage("Format incorrect. Merci de respecter le format : Nom Prénom - Numéro de téléphone", false);
                          addMessage("Exemple : Ahmed Bennani - 0661234567", false);
                        }, 1000);
                        setUserInput('');
                      }
                    } else {
                      // Handle regular messages
                      setUserInput('');
                      
                      // Check if it's a date input (for booking flow)
                      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                      if (dateRegex.test(userInput)) {
                        const inputDate = new Date(userInput);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        if (inputDate < today) {
                          setTimeout(() => {
                            addMessage("❌ La date d'arrivée ne peut pas être dans le passé.", false);
                            addMessage("Veuillez choisir une date à partir d'aujourd'hui.", false);
                          }, 1000);
                        } else {
                          const dates = handleDateSelection(userInput, 2);
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
                        setTimeout(() => {
                          addMessage("Merci pour votre message ! Un conseiller vous répondra sous peu. Pour une réponse immédiate, appelez le +212 652 88 192.", false);
                          setTimeout(() => {
                            showMainMenu();
                          }, 1000);
                        }, 1000);
                      }
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    addMessage(userInput, true);
                    
                    if (!userInfo.hasProvidedInfo) {
                      // Handle user info submission
                      if (handleUserInfoSubmission(userInput)) {
                        setUserInput('');
                      } else {
                        setTimeout(() => {
                          addMessage("Format incorrect. Merci de respecter le format : Nom Prénom - Numéro de téléphone", false);
                          addMessage("Exemple : Ahmed Bennani - 0661234567", false);
                        }, 1000);
                        setUserInput('');
                      }
                    } else {
                      // Handle regular messages
                      setUserInput('');
                      
                      // Check if it's a date input (for booking flow)
                      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                      if (dateRegex.test(userInput)) {
                        const inputDate = new Date(userInput);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        if (inputDate < today) {
                          setTimeout(() => {
                            addMessage("❌ La date d'arrivée ne peut pas être dans le passé.", false);
                            addMessage("Veuillez choisir une date à partir d'aujourd'hui.", false);
                          }, 1000);
                        } else {
                          const dates = handleDateSelection(userInput, 2);
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
                        setTimeout(() => {
                          addMessage("Merci pour votre message ! Un conseiller vous répondra sous peu. Pour une réponse immédiate, appelez le +212 652 88 192.", false);
                          setTimeout(() => {
                            showMainMenu();
                          }, 1000);
                        }, 1000);
                      }
                    }
                  }
                }}
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