import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Map country codes to phone prefixes
const countryCodeMap: Record<string, string> = {
  MA: '+212',
  FR: '+33',
  ES: '+34',
  US: '+1',
  GB: '+44',
  DE: '+49',
  IT: '+39',
  BE: '+32',
  NL: '+31',
  SA: '+966',
  AE: '+971',
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, countryCode, phoneNumber, checkIn, checkOut, guests } = data;

    // Get phone prefix from country code
    const phonePrefix = countryCodeMap[countryCode] || countryCode;
    const fullPhone = `${phonePrefix} ${phoneNumber}`;

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(to right, #5ea7aa, #a0d2de);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: normal;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 2px solid #5ea7aa;
              border-top: none;
              border-radius: 0 0 10px 10px;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              color: #5ea7aa;
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 10px;
              text-transform: uppercase;
            }
            .info-row {
              display: flex;
              margin-bottom: 12px;
              padding: 10px;
              background: white;
              border-radius: 5px;
            }
            .info-label {
              font-weight: bold;
              color: #5ea7aa;
              min-width: 150px;
            }
            .info-value {
              color: #333;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #5ea7aa;
              color: #666;
              font-size: 14px;
            }
            .pumpkin {
              font-size: 24px;
              margin: 0 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1><span class="pumpkin">🎃</span> Nouvelle Réservation Halloween <span class="pumpkin">🎃</span></h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Dakhla Club - Séjour Halloween 2025</p>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-title">👤 Informations Client</div>
              <div class="info-row">
                <span class="info-label">Nom complet:</span>
                <span class="info-value">${name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${email}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Téléphone:</span>
                <span class="info-value">${fullPhone}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">📅 Détails du Séjour</div>
              <div class="info-row">
                <span class="info-label">Date d'arrivée:</span>
                <span class="info-value">${new Date(checkIn).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Date de départ:</span>
                <span class="info-value">${new Date(checkOut).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Nombre de personnes:</span>
                <span class="info-value">${guests} ${guests === '1' ? 'personne' : 'personnes'}</span>
              </div>
            </div>

            <div class="section" style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35;">
              <strong style="color: #ff6b35;">⚠️ Action requise:</strong>
              <p style="margin: 10px 0 0 0;">Veuillez contacter le client dans les plus brefs délais pour confirmer sa réservation Halloween.</p>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 5px 0;"><strong>Dakhla Club</strong></p>
            <p style="margin: 5px 0;">Point de Dragon PK 28, Dakhla 73000, Maroc</p>
            <p style="margin: 5px 0;">📞 +212 652 88 19 21 | ✉️ reservation@dakhlaclub.com</p>
            <p style="margin: 15px 0 5px 0; font-size: 12px; color: #999;">
              Cette réservation a été effectuée via le formulaire Halloween sur offer.dakhlaclub.com
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email via Gmail
    const mailOptions = {
      from: `"Dakhla Club - Halloween 🎃" <${process.env.EMAIL_USER}>`,
      to: 'daali.22.ss@gmail.com',
      subject: `🎃 Nouvelle Réservation Halloween - ${name}`,
      html: emailHtml,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      status: 'success',
      message: 'Réservation envoyée avec succès!'
    }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Erreur lors de l\'envoi de la réservation.'
    }, { status: 500 });
  }
}
