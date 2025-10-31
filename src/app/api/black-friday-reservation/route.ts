import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, guests, checkIn } = data;

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Client Email Template
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
            }
            .banner {
              width: 100%;
              display: block;
            }
            .content {
              padding: 40px 0px;
            }
            .welcome {
              font-size: 24px;
              color: #5ba6a9;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              color: #5ba6a9;
              font-weight: bold;
              font-size: 18px;
              margin-bottom: 15px;
              text-transform: uppercase;
              border-bottom: 2px solid #d7c9ad;
              padding-bottom: 10px;
            }
            .info-box {
              background: #f9f9f9;
              border-left: 4px solid #5ba6a9;
              padding: 15px 20px;
              margin: 10px 0;
              border-radius: 5px;
            }
            .info-label {
              font-weight: bold;
              color: #5ba6a9;
              display: inline-block;
              min-width: 150px;
            }
            .info-value {
              color: #333;
            }
            .footer {
              background: #f9f9f9;
              padding: 30px;
              text-align: center;
              border-top: 3px solid #5ba6a9;
            }
            .footer-logo {
              font-size: 24px;
              font-weight: bold;
              color: #5ba6a9;
              margin-bottom: 15px;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #5ba6a9;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header Banner -->
            <img src="cid:banner" alt="Black Friday Dakhla Club" class="banner" />

            <!-- Content -->
            <div class="content">
              <div class="welcome">Bonjour ${name},</div>

              <p style="font-size: 16px; line-height: 1.8;">
                Merci d'avoir réservé votre séjour exclusif <strong>Black Friday</strong> au <strong>Dakhla Club</strong> !
                Nous sommes ravis de vous accueillir pour une expérience inoubliable.
              </p>

              <!-- Reservation Details -->
              <div class="section">
                <div class="section-title">Détails de votre réservation</div>

                <div class="info-box">
                  <div><span class="info-label">Nom :</span> <span class="info-value">${name}</span></div>
                </div>

                <div class="info-box">
                  <div><span class="info-label">Email :</span> <span class="info-value">${email}</span></div>
                </div>

                <div class="info-box">
                  <div><span class="info-label">Téléphone :</span> <span class="info-value">${phone}</span></div>
                </div>

                <div class="info-box">
                  <div><span class="info-label">Nombre de personnes :</span> <span class="info-value">${guests} personne(s)</span></div>
                </div>

                <div class="info-box">
                  <div><span class="info-label">Date d'arrivée :</span> <span class="info-value">${new Date(checkIn).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                </div>
              </div>

              <!-- Next Steps -->
              <div class="section">
                <div class="section-title">Prochaines étapes</div>
                <p style="background: #fff9e6; border-left: 4px solid #d7c9ad; padding: 15px; border-radius: 5px;">
                  Notre équipe vous contactera dans les <strong>24 heures</strong> pour confirmer votre réservation
                  et finaliser tous les détails de votre séjour.
                </p>
              </div>

              <p style="font-size: 16px; margin-top: 30px;">
                À très bientôt au <strong>Dakhla Club</strong> !<br>
                <span style="color: #5ba6a9; font-weight: bold;">L'équipe Dakhla Club</span>
              </p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="footer-logo">DAKHLA CLUB</div>
              <p style="color: #666; font-size: 14px;">
                Lagune de Dakhla, Maroc<br>
                Email: reservation@dakhlaclub.com<br>
                Tél: +212 528 89 80 87
              </p>
              <div class="social-links">
                <a href="https://www.facebook.com/DakhlaClub/">Facebook</a> |
                <a href="https://www.instagram.com/hoteldakhlaclub/">Instagram</a> |
                <a href="https://dakhlaclub.com/">Website</a>
              </div>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                © ${new Date().getFullYear()} Dakhla Club. Tous droits réservés.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Admin Email Template
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
            }
            .banner {
              width: 100%;
              display: block;
            }
            .content {
              padding: 30px 0px;
            }
            .info-box {
              background: #f9f9f9;
              border-left: 4px solid #5ba6a9;
              padding: 15px;
              margin: 10px 0;
              border-radius: 5px;
            }
            .info-label {
              font-weight: bold;
              color: #5ba6a9;
              display: inline-block;
              min-width: 150px;
            }
            .priority {
              background: #ff6b8a;
              color: white;
              padding: 15px;
              border-radius: 10px;
              text-align: center;
              font-weight: bold;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="cid:banner" alt="Black Friday Dakhla Club" class="banner" />

            <div class="content">
              <div class="priority">
                RÉSERVATION BLACK FRIDAY - Action requise
              </div>

              <h2 style="color: #5ba6a9;">Détails du client</h2>

              <div class="info-box">
                <div><span class="info-label">Nom complet :</span> ${name}</div>
              </div>

              <div class="info-box">
                <div><span class="info-label">Email :</span> ${email}</div>
              </div>

              <div class="info-box">
                <div><span class="info-label">Téléphone :</span> ${phone}</div>
              </div>

              <div class="info-box">
                <div><span class="info-label">Nombre de personnes :</span> ${guests}</div>
              </div>

              <div class="info-box">
                <div><span class="info-label">Date d'arrivée :</span> ${new Date(checkIn).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>

              <div class="info-box">
                <div><span class="info-label">Date de réservation :</span> ${new Date().toLocaleString('fr-FR')}</div>
              </div>

              <p style="background: #fff9e6; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <strong>Action requise :</strong> Contacter le client dans les 24h pour confirmer la disponibilité.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to client
    await transporter.sendMail({
      from: `"Dakhla Club" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Confirmation de votre réservation Black Friday - Dakhla Club',
      html: clientEmailHtml,
      attachments: [
        {
          filename: 'email-banner.png',
          path: './public/images/black-friday/email-banner.png',
          cid: 'banner'
        }
      ]
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"Réservations Dakhla Club" <${process.env.EMAIL_USER}>`,
      to: 'reservation@dakhlaclub.com',
      subject: `Nouvelle réservation BLACK FRIDAY - ${name}`,
      html: adminEmailHtml,
      attachments: [
        {
          filename: 'email-banner.png',
          path: './public/images/black-friday/email-banner.png',
          cid: 'banner'
        }
      ]
    });

    return NextResponse.json({ success: true, message: 'Reservation submitted successfully' });
  } catch (error) {
    console.error('Error processing reservation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process reservation' },
      { status: 500 }
    );
  }
}
