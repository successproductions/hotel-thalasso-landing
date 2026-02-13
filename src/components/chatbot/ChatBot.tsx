'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import styles from './ChatBot.module.css';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  buttons?: Button[];
  timestamp: Date;
}

interface Button {
  id: string;
  label: string;
  emoji?: string;
  action: string;
  data?: { programId?: string };
}

interface ChatBotProps {
  onOpenReservation?: (programId?: string) => void;
}

export default function ChatBot({ onOpenReservation }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<'3' | '5' | '7' | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const hadNotificationRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start session timer on component mount (page load)
  useEffect(() => {
    setSessionStart(new Date());
  }, []);

  // Welcome message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        // Check ref (not state) because state is already cleared by onClick
        if (hadNotificationRef.current) {
          hadNotificationRef.current = false;
          addBotMessage(getRelanceMessage());
        } else {
          addBotMessage(getWelcomeMessage());
        }
      }, 500);
    }
  }, [isOpen]);

  // Auto-relance after 10 minutes of inactivity
  useEffect(() => {
    if (!sessionStart) return;

    const checkAbandonment = setInterval(() => {
      const now = new Date();
      const timeDiff = now.getTime() - sessionStart.getTime();
      const minutesPassed = timeDiff / 1000 / 60;

      if (minutesPassed >= 1 && !isOpen && !hasNotification) {
        setHasNotification(true);
        hadNotificationRef.current = true;
        clearInterval(checkAbandonment);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkAbandonment);
  }, [sessionStart, isOpen, hasNotification]);

  const addBotMessage = (messageData: Omit<Message, 'id' | 'type' | 'timestamp'>) => {
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const newMessage: Message = {
        ...messageData,
        id: Date.now().toString(),
        type: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000); // 1 second typing delay
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleButtonClick = (button: Button) => {
    // Add user message
    addUserMessage(button.label);

    // Handle action
    setTimeout(() => {
      switch (button.action) {
        case 'main_menu':
          addBotMessage(getWelcomeMessage());
          break;
        case 'programs':
          addBotMessage(getProgramsMessage());
          break;
        case 'program_3':
        case 'program_5':
        case 'program_7':
          const programId = button.action.split('_')[1] as '3' | '5' | '7';
          setSelectedProgram(programId);
          addBotMessage(getEmailCapturePrompt(programId));
          break;
        case 'program_details_3':
        case 'program_details_5':
        case 'program_details_7':
          const detailsId = button.action.split('_')[2] as '3' | '5' | '7';
          addBotMessage(getProgramDetails(detailsId));
          break;
        case 'tarifs':
          addBotMessage(getTarifsMessage());
          break;
        case 'faq':
          addBotMessage(getFAQMessage());
          break;
        case 'reserver':
          if (onOpenReservation) {
            onOpenReservation(button.data?.programId);
          }
          addBotMessage({ text: '✅ Ouverture du formulaire de réservation...'});
          
          // Close chatbot on mobile after opening reservation
          if (window.innerWidth <= 768) {
            setTimeout(() => {
              setIsOpen(false);
            }, 500);
          }
          break;
        case 'conseiller':
          // Open WhatsApp with pre-filled message
          window.open('https://wa.me/212661807293?text=Bonjour,%20je%20souhaite%20être%20conseillé(e)%20pour%20un%20séjour%20thalasso%20au%20Dakhla%20Club.', '_blank');
          break;
        case 'capture_whatsapp':
          // Open WhatsApp directly with pre-filled message
          const programName = selectedProgram === '3' ? 'Vitalité 3 jours' : 
                             selectedProgram === '5' ? 'Régénération 5 jours' : 
                             'Renaissance 7 jours';
          const message = `Bonjour, je suis intéressé(e) par le programme ${programName}. Pouvez-vous m'envoyer plus d'informations ?`;
          window.open(`https://wa.me/212661807293?text=${encodeURIComponent(message)}`, '_blank');
          addBotMessage({ text: '✅ Redirection vers WhatsApp...' });
          break;
        case 'qualification':
          addBotMessage(getQualificationMessage());
          break;
        case 'objective_detente':
          addBotMessage(getProgramDetails('3'));
          break;
        case 'objective_recuperation':
          addBotMessage(getProgramDetails('5'));
          break;
        case 'objective_transformation':
          addBotMessage(getProgramDetails('7'));
          break;
        case 'qualification_detendre':
          addBotMessage(getProgramDetails('3'));
          break;
        case 'qualification_recuperer':
          addBotMessage(getProgramDetails('5'));
          break;
        case 'qualification_transformer':
          addBotMessage(getProgramDetails('7'));
          break;
        default:
          break;
      }
    }, 300);
  };



  // Message templates
  const getWelcomeMessage = (): Omit<Message, 'id' | 'type' | 'timestamp'> => ({
    text: '👋 Bienvenue au DC Thermes Spa\n🌊 Des séjours thalasso conçus pour relâcher, régénérer et transformer le corps et l\'esprit.\n\n👉 Dites-moi ce que vous souhaitez faire, je vous guide.',
    buttons: [
      { id: '1', label: 'Découvrir les programmes', emoji: '🔹', action: 'programs' },
      { id: '2', label: 'Voir les tarifs', emoji: '🔹', action: 'tarifs' },
      { id: '3', label: 'Questions fréquentes', emoji: '🔹', action: 'faq' },
      { id: '4', label: 'Réserver mon séjour', emoji: '🔹', action: 'reserver' },
    ],
  });

  const getProgramsMessage = (): Omit<Message, 'id' | 'type' | 'timestamp'> => ({
    text: 'Nous avons conçu 3 séjours thalasso, selon le temps dont vous disposez et le niveau de transformation recherché.\n\n👉 Sélectionnez celui qui vous correspond le plus :',
    buttons: [
      { id: '1', label: 'Vitalité — 3 jours', emoji: '🌿', action: 'program_3' },
      { id: '2', label: 'Régénération — 5 jours', emoji: '🌊', action: 'program_5' },
      { id: '3', label: 'Renaissance — 7 jours', emoji: '🔥', action: 'program_7' },
      { id: '4', label: 'Retour au menu', emoji: '🔙', action: 'main_menu' },
    ],
  });

  const getEmailCapturePrompt = (programId: '3' | '5' | '7'): Omit<Message, 'id' | 'type' | 'timestamp'> => ({
    text: 'Souhaitez-vous que je vous accompagne jusqu\'à la réservation ou vous envoyer les informations détaillées sur nos séjours ?',
    buttons: [
      { id: '1', label: 'Recevoir les infos par WhatsApp', emoji: '📱', action: 'capture_whatsapp' },
      { id: '2', label: 'Voir les détails maintenant', emoji: '👀', action: `program_details_${programId}` },
    ],
  });

  const getProgramDetails = (programId: '3' | '5' | '7'): Omit<Message, 'id' | 'type' | 'timestamp'> => {
    const programs = {
      '3': {
        emoji: '🌿',
        title: 'THALASSO VITALITÉ — 3 jours',
        intro: 'Idéal si vous manquez de temps mais ressentez le besoin de souffler, dénouer les tensions et relancer votre énergie.',
        results: '• Corps détendu\n• Esprit apaisé\n• Sensation de légèreté immédiate',
        soins: '🧖 14 soins inclus, dont :\nBol d\'air Jacquier, piscine thermale, hammam, massage relaxant, enveloppement aux algues, bain magnésium, cupping & serviette de feu…',
      },
      '5': {
        emoji: '🌊',
        title: 'THALASSO RÉGÉNÉRATION — 5 jours',
        intro: 'Une cure progressive pour défatiguer en profondeur, relancer les fonctions vitales et retrouver un équilibre durable.',
        results: '• Récupération physique complète\n• Stress fortement réduit\n• Énergie plus stable au quotidien',
        soins: '🧖 29 soins inclus, dont :\nMorning Flow, ice bath, massages detox, scrub sel Himalaya, spiruline, bain magnésium, cupping & serviette de feu…',
      },
      '7': {
        emoji: '🔥',
        title: 'THALASSO RENAISSANCE — 7 jours',
        intro: 'Une immersion complète pour remettre les compteurs à zéro.\nIci, on ne fait pas une pause : on se transforme.',
        results: '• Corps régénéré\n• Énergie renouvelée\n• Clarté mentale et ancrage durable',
        soins: '🧖 33 soins inclus, dont :\nCoaching sportif, Morning Flow, marche méditative marine, massages ciblés, ice bath, soins visage, spiruline, bains thérapeutiques…',
      },
    };

    const program = programs[programId];

    return {
      text: `${program.emoji} ${program.title}\n\n${program.intro}\n\n🎯 Résultat recherché :\n${program.results}\n\n${program.soins}`,
      buttons: [
        { id: '1', label: 'Réserver ce séjour', emoji: '🗓️', action: 'reserver', data: { programId } },
        { id: '2', label: 'Être conseillé(e)', emoji: '📞', action: 'conseiller' },
        { id: '3', label: 'Retour aux programmes', emoji: '🔙', action: 'programs' },
      ],
    };
  };

  const getTarifsMessage = (): Omit<Message, 'id' | 'type' | 'timestamp'> => ({
    text: 'Voici les tarifs de nos séjours thalasso :\n\n🌿 Vitalité — 3 jours : 5 450 MAD / 545 €\n🌊 Régénération — 5 jours : 10 350 MAD / 1 035 €\n🔥 Renaissance — 7 jours : 11 700 MAD / 1 170 €\n\n💡 Les soins sont inclus. L\'hébergement est choisi séparément selon vos préférences.',
    buttons: [
      { id: '1', label: 'Réserver maintenant', emoji: '🗓️', action: 'reserver' },
      { id: '2', label: 'Parler à un conseiller', emoji: '📞', action: 'conseiller' },
      { id: '3', label: 'Retour au menu', emoji: '🔙', action: 'main_menu' },
    ],
  });

  const getFAQMessage = (): Omit<Message, 'id' | 'type' | 'timestamp'> => ({
    text: '**Qu\'est-ce qu\'un séjour thalasso au Dakhla Club ?**\n👉 Une expérience complète combinant eau de mer, soins marins et accompagnement bien-être pour relancer le corps et apaiser l\'esprit.\n\n**Quelle durée choisir ?**\n👉 3 jours pour décompresser, 5 jours pour récupérer en profondeur, 7 jours pour une transformation globale.\n\n**En combien de temps je peux ressentir les effets du programme ?**\n👉 Certaines client(e)s perçoivent un apaisement dès les premiers jours, notamment grâce au cadre, aux soins et au rythme du séjour. Le programme est conçu pour accompagner progressivement la détente et la récupération tout au long de votre expérience \n\n**Comment réserver ?**\n👉 Choisissez votre programme, réservez en ligne de façon sécurisée et recevez votre confirmation immédiate.',
    buttons: [
      { id: '1', label: 'Réserver mon séjour', emoji: '🗓️', action: 'reserver' },
      { id: '2', label: 'Être conseillé(e)', emoji: '📞', action: 'conseiller' },
      { id: '3', label: 'Retour au menu', emoji: '🔙', action: 'main_menu' },
    ],
  });

  const getRelanceMessage = (): Omit<Message, 'id' | 'type' | 'timestamp'> => ({
    text: '👋 Je me permets de revenir vers vous.\n\nVous avez consulté nos séjours thalasso au Dakhla Club, mais vous n\'avez pas encore finalisé votre réservation.\n\n💡 Si vous hésitez entre plusieurs programmes ou si vous avez une question, je suis là pour vous aider à faire le bon choix, simplement.',
    buttons: [
      { id: '1', label: 'Voir les programmes', emoji: '�', action: 'programs' },
      { id: '2', label: 'Réserver maintenant', emoji: '�', action: 'reserver' },
    ],
  });

  const getQualificationMessage = (): Omit<Message, 'id' | 'type' | 'timestamp'> => ({
    text: '🎯 Pour vous orienter au mieux, quel est votre objectif principal aujourd\'hui ?',
    buttons: [
      { id: '1', label: 'Me détendre et décompresser', emoji: '🌿', action: 'objective_detente' },
      { id: '2', label: 'Récupérer physiquement et mentalement', emoji: '🌊', action: 'objective_recuperation' },
      { id: '3', label: 'Vivre une vraie transformation', emoji: '🔥', action: 'objective_transformation' },
    ],
  });

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setHasNotification(false); // Clear notification when opening
          }}
          className={styles.floatingButton}
          aria-label="Ouvrir le chat"
        >
          <MessageCircle size={24} />
          <span className={styles.pulse}></span>
          {hasNotification && (
            <span className={styles.notificationBadge}>1</span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <MessageCircle size={20} />
              <span>Assistant DC Thermes Spa</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Fermer le chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.type === 'bot' ? styles.botMessage : styles.userMessage
                }`}
              >
                <div className={styles.messageText}>{message.text}</div>
                {message.buttons && message.buttons.length > 0 && (
                  <div className={styles.buttonGroup}>
                    {message.buttons.map((button) => (
                      <button
                        key={button.id}
                        onClick={() => handleButtonClick(button)}
                        className={styles.actionButton}
                      >
                        {button.emoji && <span className={styles.emoji}>{button.emoji}</span>}
                        {button.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}



            {/* Typing Indicator */}
            {isTyping && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
}
