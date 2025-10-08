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
      to: 'reservation@dakhlaclub.com',
      subject: `🎃 Nouvelle Réservation Halloween - ${name}`,
      html: emailHtml,
      replyTo: email,
    };

    // Send email to hotel
    await transporter.sendMail(mailOptions);

    // Send confirmation email to client
    const clientEmailHtml = `
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
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #5ea7aa 0%, #a0d2de 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 32px;
              font-weight: normal;
            }
            .pumpkin {
              font-size: 48px;
              margin: 10px 0;
              animation: bounce 2s infinite;
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 20px;
              color: #5ea7aa;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              line-height: 1.8;
              color: #555;
              margin-bottom: 30px;
            }
            .details-box {
              background: linear-gradient(to right, rgba(94, 167, 170, 0.1), rgba(160, 210, 222, 0.1));
              border-left: 4px solid #5ea7aa;
              padding: 20px;
              margin: 30px 0;
              border-radius: 8px;
            }
            .details-title {
              color: #5ea7aa;
              font-weight: bold;
              font-size: 18px;
              margin-bottom: 15px;
            }
            .detail-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: bold;
              color: #5ea7aa;
              min-width: 140px;
            }
            .detail-value {
              color: #333;
            }
            .cta-box {
              background: #f9f9f9;
              border: 2px dashed #5ea7aa;
              border-radius: 10px;
              padding: 25px;
              text-align: center;
              margin: 30px 0;
            }
            .cta-text {
              font-size: 16px;
              color: #555;
              margin-bottom: 15px;
            }
            .highlight {
              color: #5ea7aa;
              font-weight: bold;
              font-size: 18px;
            }
            .contact-info {
              background: linear-gradient(135deg, #5ea7aa 0%, #a0d2de 100%);
              color: white;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
            }
            .contact-item {
              padding: 8px 0;
              font-size: 15px;
            }
            .footer {
              background: #f9f9f9;
              padding: 25px 30px;
              text-align: center;
              color: #777;
              font-size: 13px;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #5ea7aa;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="pumpkin">🎃</div>
              <h1>Merci pour votre demande !</h1>
              <p style="margin: 0; font-size: 16px;">Dakhla Club - Séjour Halloween 2025</p>
            </div>

            <div class="content">
              <div class="greeting">Bonjour ${name},</div>

              <div class="message">
                Nous sommes ravis de vous accueillir à <strong>Dakhla Club</strong> pour notre événement Halloween exceptionnel ! 🎃
                <br><br>
                Votre demande de réservation a bien été reçue et notre équipe va vous contacter très prochainement pour confirmer tous les détails de votre séjour.
              </div>

              <div class="details-box">
                <div class="details-title">📋 Récapitulatif de votre réservation</div>
                <div class="detail-row">
                  <span class="detail-label">Nom:</span>
                  <span class="detail-value">${name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${email}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Téléphone:</span>
                  <span class="detail-value">${fullPhone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date d'arrivée:</span>
                  <span class="detail-value">${new Date(checkIn).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date de départ:</span>
                  <span class="detail-value">${new Date(checkOut).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Nombre de personnes:</span>
                  <span class="detail-value">${guests} ${guests === '1' ? 'personne' : 'personnes'}</span>
                </div>
              </div>

              <div class="cta-box">
                <div class="cta-text">
                  🎉 <strong>Prochaine étape</strong> 🎉
                </div>
                <p style="margin: 10px 0; font-size: 15px;">
                  Notre équipe vous contactera sous <span class="highlight">24-48 heures</span> pour finaliser votre réservation et répondre à toutes vos questions.
                </p>
              </div>

              <div class="message">
                <strong>Ce qui vous attend :</strong>
                <ul style="line-height: 2; padding-left: 20px;">
                  <li>🎃 Soirée costumée avec DJ</li>
                  <li>🍽️ Menu thématique Halloween</li>
                  <li>🏆 Concours de déguisements avec prix</li>
                  <li>👶 Animations et maquillage pour enfants</li>
                  <li>💆 Massage relaxant (500 DHS)</li>
                  <li>🎁 Bon d'achat de 500 DHS au Spa Shop</li>
                </ul>
              </div>

              <div class="contact-info">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">
                  📞 Besoin d'aide ?
                </div>
                <div class="contact-item">
                  <strong>Téléphone:</strong> +212 652 88 19 21
                </div>
                <div class="contact-item">
                  <strong>Email:</strong> reservation@dakhlaclub.com
                </div>
                <div class="contact-item">
                  <strong>Adresse:</strong> Point de Dragon PK 28, Dakhla 73000, Maroc
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 10px;">
                <p style="margin: 0; color: #555; font-size: 15px;">
                  Nous avons hâte de vous accueillir ! 🌟
                </p>
              </div>
            </div>

            <div class="footer">
              <div class="social-links">
                <a href="https://www.facebook.com/DakhlaClub/" target="_blank">Facebook</a> •
                <a href="https://www.instagram.com/hoteldakhlaclub/" target="_blank">Instagram</a> •
                <a href="https://youtube.com/@dakhlaclub1745" target="_blank">YouTube</a>
              </div>
              <p style="margin: 10px 0; color: #999;">
                © 2025 Dakhla Club. Tous droits réservés.
              </p>
              <p style="margin: 10px 0; font-size: 12px; color: #aaa;">
                Vous recevez cet email car vous avez effectué une demande de réservation sur offer.dakhlaclub.com
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const clientMailOptions = {
      from: `"Dakhla Club 🎃" <${process.env.EMAIL_USER}>`,
      to: email, // Send to client
      subject: `🎃 Confirmation de votre réservation Halloween - Dakhla Club`,
      html: clientEmailHtml,
      replyTo: 'reservation@dakhlaclub.com',
    };

    // Send confirmation email to client
    await transporter.sendMail(clientMailOptions);

    // Save to Google Sheets via Apps Script
    if (process.env.GOOGLE_SHEETS_URL) {
      try {
        console.log('Attempting to save to Google Sheets...');
        console.log('URL:', process.env.GOOGLE_SHEETS_URL);

        const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            countryCode,
            phoneNumber,
            fullPhone,
            checkIn,
            checkOut,
            guests,
          }),
          redirect: 'follow',
        });

        console.log('Response status:', sheetsResponse.status);
        console.log('Response headers:', Object.fromEntries(sheetsResponse.headers.entries()));

        const responseText = await sheetsResponse.text();
        console.log('Response text:', responseText.substring(0, 200)); // First 200 chars

        const sheetsResult = JSON.parse(responseText);
        console.log('Google Sheets result:', sheetsResult);

        if (sheetsResult.status === 'success') {
          console.log('✅ Data saved to Google Sheets successfully!');
        } else {
          console.log('⚠️ Google Sheets returned non-success:', sheetsResult);
        }
      } catch (sheetsError) {
        console.error('❌ Error saving to Google Sheets:', sheetsError);
        // Don't fail the request if Google Sheets fails
      }
    } else {
      console.log('⚠️ GOOGLE_SHEETS_URL not configured');
    }

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
