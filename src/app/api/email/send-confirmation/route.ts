import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend client only when the route is called
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data = await request.json();
    const { to, fullName, selectedOffer, arrivalDate, numberOfPeople, orderId } = data;

    const offerLabels: Record<string, string> = {
      '3': 'Évasion 3 Nuits',
      '5': 'Évasion 5 Nuits',
      '7': 'Évasion 7 Nuits',
    };

    const offerLabel = offerLabels[selectedOffer] || `Évasion ${selectedOffer} Nuits`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de réservation - Dakhla Club</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f9f9f9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #139584 0%, #0f7a6d 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: 1px;">
                Confirmation de Réservation
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                Dakhla Club - Wellness & Thalasso
              </p>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <div style="width: 64px; height: 64px; margin: 0 auto; background-color: #d1fae5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 22px; font-weight: 400;">
                Bonjour ${fullName},
              </h2>
              <p style="margin: 0 0 20px; color: #404040; font-size: 16px; line-height: 1.6;">
                Merci pour votre réservation ! Nous avons bien reçu votre paiement et votre séjour est confirmé.
              </p>
              
              <!-- Order Details -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #d6bb8e; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Détails de votre réservation
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Numéro de commande:</td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 500; text-align: right;">${orderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Programme:</td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 500; text-align: right;">${offerLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Date d'arrivée:</td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 500; text-align: right;">${new Date(arrivalDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Nombre de personnes:</td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 500; text-align: right;">${numberOfPeople} personne(s)</td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                  Prochaines étapes
                </h3>
                <ol style="margin: 0; padding-left: 20px; color: #404040; font-size: 14px; line-height: 1.8;">
                  <li style="margin-bottom: 8px;">Réservez votre hébergement à l'hôtel Dakhla Club</li>
                  <li style="margin-bottom: 8px;">Notre équipe vous contactera sous 24h pour confirmer les détails</li>
                  <li style="margin-bottom: 8px;">Préparez-vous pour une expérience inoubliable</li>
                </ol>
              </div>

              <!-- Hotel Booking CTA -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://direct-book.com/properties/DakhlaClubDIRECT" style="display: inline-block; background-color: #139584; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 500; transition: background-color 0.3s;">
                  Réserver l'hôtel maintenant
                </a>
              </div>

              <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Si vous avez des questions, n'hésitez pas à nous contacter.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #1a1a1a; font-size: 16px; font-weight: 500;">
                Dakhla Club
              </p>
              <p style="margin: 0 0 15px; color: #6b7280; font-size: 14px;">
                Point de Dragon PK 28, Dakhla 73000, Maroc
              </p>
              <p style="margin: 0 0 5px; color: #6b7280; font-size: 14px;">
                📧 <a href="mailto:reservation@dakhlaclub.com" style="color: #139584; text-decoration: none;">reservation@dakhlaclub.com</a>
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                📞 <a href="tel:+212652881921" style="color: #139584; text-decoration: none;">+212 652 88 19 21</a>
              </p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                  © 2026 Dakhla Club - Tous droits réservés
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: 'Dakhla Club <noreply@dakhlaclub.com>',
      to: [to],
      subject: `Confirmation de réservation - ${offerLabel} - ${orderId}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
