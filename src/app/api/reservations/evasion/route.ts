import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ReservationData {
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  arrivalDate: string;
  selectedOffer: string;
  timestamp: string;
}

// Get offer label
const getOfferLabel = (offer: string) => {
  switch (offer) {
    case '3': return 'Évasion Holistique – 3 Nuits';
    case '5': return 'Évasion Holistique – 5 Nuits';
    case '7': return 'Évasion Holistique – 7 Nuits';
    default: return `Évasion Holistique – ${offer} Nuits`;
  }
};

// Email templates
const getClientEmailTemplate = (data: ReservationData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #139584 0%, #0d9488 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #139584; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .info-row { margin: 10px 0; padding: 8px 0; }
    .label { font-weight: bold; color: #139584; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #139584; color: #666; }
    .button { display: inline-block; padding: 12px 30px; background: #139584; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #139584; margin-top: 0; }
    h3 { color: #139584; margin-top: 0; font-size: 18px; }
    .next-step { background: #e6f7f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .note { font-size: 14px; color: #666; font-style: italic; margin-top: 15px; }
    .offer-badge { display: inline-block; background: #d6bb8e; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dakhla Club – DC Thermes</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Séjours Thalasso & Bien-Être Premium</p>
    </div>
    <div class="content">
      <h2>Votre demande de séjour Thalasso à Dakhla Club est bien reçue</h2>
      
      <p>Bonjour ${data.fullName},</p>
      
      <p>Nous avons bien reçu votre demande pour le programme<br>
      <span class="offer-badge">${getOfferLabel(data.selectedOffer)}</span><br>
      au Dakhla Club Hotel & Spa.</p>
      
      <p>🌿 <strong>Votre demande a été transmise à notre équipe bien-être.</strong><br>
      Chaque séjour est préparé de manière personnalisée afin de garantir<br>
      une expérience calme, efficace et adaptée à vos besoins.</p>

      <div class="info-box">
        <h3>Récapitulatif de votre demande :</h3>
        <div class="info-row">
          <span class="label">Programme :</span> ${getOfferLabel(data.selectedOffer)}
        </div>
        <div class="info-row">
          <span class="label">Nom :</span> ${data.fullName}
        </div>
        <div class="info-row">
          <span class="label">Email :</span> ${data.email}
        </div>
        <div class="info-row">
          <span class="label">Téléphone :</span> ${data.phone}
        </div>
        <div class="info-row">
          <span class="label">Nombre de personnes :</span> ${data.numberOfPeople}
        </div>
        <div class="info-row">
          <span class="label">Date d'arrivée souhaitée :</span> ${new Date(data.arrivalDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
        </div>
      </div>

      <div class="next-step">
        <strong>⏳ Prochaine étape :</strong><br>
        Un membre de notre équipe vous contactera sous 24 à 48 heures<br>
        afin de confirmer la disponibilité et finaliser votre séjour.
      </div>
      
      <p class="note">Nous limitons volontairement le nombre de curistes<br>
      pour préserver la qualité de l'expérience.</p>

      <div style="text-align: center;">
        <a href="https://offer.dakhlaclub.com/fr/evasion" class="button">Consulter les détails des séjours</a>
      </div>
      
      <p style="margin-top: 20px;">🌊 À très bientôt à Dakhla Club,<br>
      <strong>L'équipe Dakhla Club – DC Thermes</strong></p>

      <div class="footer">
        <p style="margin: 5px 0;"><strong>Dakhla Club - DC Thermes</strong></p>
        <p style="margin: 5px 0;">📍 POINT DE DRAGON PK 28, Dakhla 73000, Maroc</p>
        <p style="margin: 5px 0;">📞 +212 652 88 19 21 | ✉️ reservation@dakhlaclub.com</p>
        <p style="margin-top: 15px; font-size: 12px; color: #999;">
          Ce message vous a été envoyé car vous avez effectué une demande de réservation sur notre site.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;


const getAdminEmailTemplate = (data: ReservationData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e293b; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #d6bb8e; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .info-row { margin: 10px 0; padding: 8px; background: #f8f8f8; border-radius: 3px; }
    .label { font-weight: bold; color: #1e293b; display: inline-block; width: 180px; }
    .urgent { background: #fef3c7; border: 2px solid #d6bb8e; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .action-box { margin-top: 20px; padding: 15px; background: #e6f7f5; border-left: 4px solid #139584; border-radius: 5px; }
    .offer-highlight { background: #d6bb8e; color: white; padding: 10px 20px; border-radius: 5px; text-align: center; margin: 15px 0; }
    h1 { margin: 0; font-size: 24px; }
    h3 { color: #1e293b; margin-top: 0; font-size: 18px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 NOUVELLE RÉSERVATION</h1>
      <p style="margin: 10px 0 0 0;">Page Évasion - Demande de séjour</p>
    </div>
    <div class="content">
      <div class="offer-highlight">
        <strong>🏷️ ${getOfferLabel(data.selectedOffer)}</strong>
      </div>

      <div class="urgent">
        <strong>⚠️ Action requise:</strong> Un client attend une confirmation de réservation.
      </div>

      <div class="info-box">
        <h3>📋 Détails de la réservation</h3>
        <div class="info-row">
          <span class="label">📅 Date de demande:</span>
          ${new Date(data.timestamp).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}
        </div>
        <div class="info-row">
          <span class="label">🏷️ Programme choisi:</span> <strong>${getOfferLabel(data.selectedOffer)}</strong>
        </div>
        <div class="info-row">
          <span class="label">👤 Nom complet:</span> ${data.fullName}
        </div>
        <div class="info-row">
          <span class="label">✉️ Email:</span> <a href="mailto:${data.email}">${data.email}</a>
        </div>
        <div class="info-row">
          <span class="label">📞 Téléphone:</span> <a href="tel:${data.phone.replace(/\s/g, '')}">${data.phone}</a>
        </div>
        <div class="info-row">
          <span class="label">👥 Nombre de personnes:</span> ${data.numberOfPeople}
        </div>
        <div class="info-row">
          <span class="label">📆 Date d'arrivée:</span> ${new Date(data.arrivalDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
        </div>
      </div>

      <div class="action-box">
        <strong>💡 Action suivante:</strong> Contactez le client dans les 24h pour confirmer la disponibilité et finaliser la réservation.
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #139584;">
        <p style="color: #666; font-size: 12px; margin: 5px 0;">
          Ce message a été généré automatiquement par le système de réservation en ligne.<br>
          Dakhla Club - DC Thermes
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.numberOfPeople || !data.arrivalDate || !data.selectedOffer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add timestamp
    const timestamp = new Date().toISOString();
    const reservationData: ReservationData = {
      ...data,
      timestamp,
    };

    // Send emails
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to client
    try {
      await transporter.sendMail({
        from: `"Dakhla Club - DC Thermes" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: '✅ Votre demande de séjour Thalasso à Dakhla Club est bien reçue',
        html: getClientEmailTemplate(reservationData),
      });
    } catch (emailError) {
      console.error('Client email error:', emailError);
    }

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"Dakhla Club Reservations" <${process.env.EMAIL_USER}>`,
        to: 'w.master@successproductions.ma',
        subject: `🔔 Nouvelle demande - ${getOfferLabel(data.selectedOffer)}`,
        html: getAdminEmailTemplate(reservationData),
      });
    } catch (emailError) {
      console.error('Admin email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Réservation enregistrée avec succès',
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
