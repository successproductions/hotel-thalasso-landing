import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


interface ReservationData {
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  arrivalDate: string;
  timestamp: string;
}

// Email templates
const getClientEmailTemplate = (data: ReservationData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); color: white; padding: 40px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
    .header p { margin: 10px 0 0; opacity: 0.9; font-size: 16px; font-weight: 400; }
    .content { padding: 40px; }
    .info-section { margin: 30px 0; background: #f9fafb; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; }
    .info-section h3 { margin: 0 0 20px; color: #0f766e; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #666; font-size: 14px; font-weight: 500; min-width: 150px; padding-right: 15px; }
    .info-value { color: #111; font-weight: 600; font-size: 14px; text-align: right; margin-left: auto; }
    .button { display: inline-block; background: #0f766e; color: #fff !important; text-decoration: none; padding: 16px 32px; font-size: 14px; font-weight: 600; border-radius: 8px; transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(15, 118, 110, 0.2); }
    .button:hover { background: #0d9488; transform: translateY(-1px); box-shadow: 0 4px 6px rgba(15, 118, 110, 0.3); }
    .footer { background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dakhla Club - DC Thermes</h1>
      <p>Évasion Holistique 3 Jours</p>
    </div>
    <div class="content">
      <p>Bonjour ${data.fullName},</p>
      <p>Nous avons bien reçu votre demande de réservation pour notre programme <strong>Évasion Holistique 3 Jours</strong>.</p>

      <div class="info-section">
        <h3>Récapitulatif de votre demande</h3>
        <div class="info-row">
          <span class="info-label">Nom complet</span>
          <span class="info-value">${data.fullName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${data.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Téléphone</span>
          <span class="info-value">${data.phone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Personnes</span>
          <span class="info-value">${data.numberOfPeople}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date d'arrivée</span>
          <span class="info-value">${data.arrivalDate}</span>
        </div>
      </div>

      <p>Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation et finaliser les détails de votre séjour.</p>

      <div style="text-align: center; margin-top: 40px;">
        <a href="https://offer.dakhlaclub.com" class="button">Découvrir nos offres</a>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 5px 0; font-weight: 600; color: #111;">Dakhla Club - DC Thermes</p>
      <p style="margin: 5px 0;">POINT DE DRAGON PK 28, Dakhla 73000, Maroc</p>
      <p style="margin-top: 20px; opacity: 0.8;">© 2026 Dakhla Club</p>
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
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
    .content { padding: 40px; }
    .alert-box { border: 1px solid #fcd34d; background: #fffbeb; color: #92400e; padding: 15px; margin-bottom: 30px; text-align: center; border-radius: 8px; }
    .info-section { margin: 30px 0; background: #f9fafb; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; }
    .info-section h3 { margin: 0 0 20px; color: #0f766e; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #666; font-size: 13px; font-weight: 500; min-width: 150px; padding-right: 15px; }
    .info-value { color: #111; font-weight: 600; font-size: 14px; text-align: right; margin-left: auto; }
    .button { display: inline-block; background: #fff; color: #0f766e !important; text-decoration: none; padding: 14px 28px; border: 1px solid #0f766e; font-size: 13px; font-weight: 600; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0; transition: all 0.3s; }
    .button:hover { background: #0f766e; color: #fff !important; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouvelle Réservation</h1>
      <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.9;">Évasion Holistique 3 Jours</p>
    </div>
    
    <div class="content">
      <div class="alert-box">
        <strong>ACTION REQUISE</strong><br>
        Un client attend une confirmation de réservation.
      </div>

      <div class="info-section">
        <h3>Détails du client</h3>
        <div class="info-row">
          <span class="info-label">Nom complet</span>
          <span class="info-value">${data.fullName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value"><a href="mailto:${data.email}" style="color: #111; text-decoration: none;">${data.email}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Téléphone</span>
          <span class="info-value"><a href="tel:${data.phone.replace(/\s/g, '')}" style="color: #111; text-decoration: none;">${data.phone}</a></span>
        </div>
      </div>

      <div class="info-section">
        <h3>Détails de la réservation</h3>
        <div class="info-row">
          <span class="info-label">Date (demande)</span>
          <span class="info-value">${new Date(data.timestamp).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Personnes</span>
          <span class="info-value">${data.numberOfPeople}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date d'arrivée</span>
          <span class="info-value">${new Date(data.arrivalDate).toLocaleDateString('fr-FR', { dateStyle: 'short' })}</span>
        </div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <span style="display: block; font-size: 12px; color: #666; mb: 10px;">Vérifiez les détails dans Google Sheets</span>
      </div>
    </div>

    <div class="footer">
      <p>Dakhla Club - DC Thermes</p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.numberOfPeople || !data.arrivalDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add timestamp
    const timestamp = new Date().toISOString();
    const reservationData = {
      ...data,
      timestamp,
    };

    // Step 1: Send data to Google Sheets
    const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL_OFFER3;
    if (sheetsUrl) {
      try {
        await fetch(sheetsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        });
      } catch (sheetsError) {
        console.error('Google Sheets error:', sheetsError);
        
      }
    }

    // Step 2: Send emails
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
        subject: '✅ Confirmation de votre demande de réservation - Dakhla Club',
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
        subject: '🔔 Nouvelle demande de réservation - Évasion Holistique 3 Jours',
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
