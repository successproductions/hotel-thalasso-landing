import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Import the same email template from callback
// Email template for payment confirmation
const getPaymentConfirmationEmail = (customerName: string, orderId: string, packType: string, amount: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #ddd; }
    .header { background: #000; color: white; padding: 40px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
    .header p { margin: 10px 0 0; opacity: 0.8; font-size: 14px; font-weight: 300; letter-spacing: 1px; }
    .content { padding: 40px; }
    .success-box { border: 1px solid #000; padding: 25px; margin: 20px 0; text-align: center; background: #fff; }
    .success-box strong { color: #000; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; }
    .info-section { margin: 30px 0; border-top: 1px solid #111; border-bottom: 1px solid #111; padding: 20px 0; }
    .info-section h3 { margin: 0 0 20px; color: #111; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { color: #000; font-weight: 500; font-size: 14px; }
    .highlight { color: #000; font-weight: 600; }
    .hotel-box { background: #f9f9f9; border: 1px solid #ddd; padding: 30px; margin: 30px 0; text-align: center; }
    .hotel-box h3 { margin: 0 0 10px; color: #000; font-size: 18px; font-weight: 300; text-transform: uppercase; letter-spacing: 1px; }
    .hotel-box p { color: #666; font-weight: 300; margin-bottom: 25px; }
    .button { display: inline-block; background: #000; color: #fff !important; text-decoration: none; padding: 16px 32px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; transition: all 0.3s; border: 1px solid #000; }
    .button:hover { background: #333; }
    .footer { background: #f5f5f5; padding: 30px; text-align: center; border-top: 1px solid #ddd; color: #888; font-size: 12px; font-weight: 300; }
    .accent-text { color: #d6bb8e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Paiement Confirmé</h1>
      <p>Dakhla Club - DC Thermes</p>
    </div>
    
    <div class="content">
      <div class="success-box">
        <strong>Votre paiement a été accepté</strong>
      </div>

      <p style="font-size: 14px; color: #333; margin-top: 30px; line-height: 1.8;">
        Bonjour ${customerName},<br><br>
        Nous avons le plaisir de vous confirmer la réception de votre paiement. Votre programme <strong>${packType}</strong> est désormais validé.
      </p>

      <div class="info-section">
        <h3>Détails de la réservation</h3>
        <div class="info-row">
          <span class="info-label">Référence</span>
          <span class="info-value">${orderId}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Programme</span>
          <span class="info-value">${packType}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Montant</span>
          <span class="info-value">${amount} MAD</span>
        </div>
      </div>

      <div class="hotel-box">
        <h3>Hébergement</h3>
        <p>Pour parfaire votre expérience, réservez votre séjour au Dakhla Club.</p>
        <a href="https://direct-book.com/properties/DakhlaClubDIRECT" class="button">
          Réserver une chambre
        </a>
      </div>

      <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 40px; font-size: 13px; color: #666;">
        <strong style="color: #000; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Besoin d'assistance ?</strong>
        <p style="margin: 5px 0 0;">
          <a href="tel:+212652881921" style="color: #111; text-decoration: none; border-bottom: 1px solid #d6bb8e;">+212 652 88 19 21</a>
          <span style="margin: 0 10px; color: #ddd;">|</span>
          <a href="mailto:reservation@dakhlaclub.com" style="color: #111; text-decoration: none; border-bottom: 1px solid #d6bb8e;">reservation@dakhlaclub.com</a>
        </p>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 5px 0; text-transform: uppercase; letter-spacing: 1px; color: #111;">Dakhla Club - DC Thermes</p>
      <p style="margin: 5px 0;">POINT DE DRAGON PK 28, Dakhla 73000, Maroc</p>
      <p style="margin-top: 20px; opacity: 0.6;">© 2026 Dakhla Club</p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { customerEmail, customerName, orderId, amount } = data;

    console.log('Testing email sending with:', { customerEmail, customerName, orderId, amount });

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const results = {
      clientEmail: { success: false, error: null as string | null },
      adminEmail: { success: false, error: null as string | null },
    };

    // Determine pack type based on amount (used for both emails)
    // Determine pack type from Order ID (Format: EVA{type}-...)
    let packType = 'Programme Évasion';
    if (orderId && orderId.startsWith('EVA')) {
        const match = orderId.match(/^EVA(\d+)-/);
        if (match && match[1]) {
            const type = match[1];
            if (type === '3') packType = 'Évasion 3 Nuits';
            else if (type === '5') packType = 'Évasion 5 Nuits';
            else if (type === '7') packType = 'Évasion 7 Nuits';
        }
    }

    const amountFloat = parseFloat(amount);
    if (packType === 'Programme Évasion') {
        if (amountFloat === 4560) {
            packType = 'Évasion 3 Nuits';
        } else if (amountFloat === 9200) {
            packType = 'Évasion 5 Nuits';
        } else if (amountFloat === 11250) {
            packType = 'Évasion 7 Nuits';
        }
    }

    // Send email to customer
    if (customerEmail) {
      try {
        await transporter.sendMail({
          from: `"Dakhla Club - DC Thermes" <${process.env.EMAIL_USER}>`,
          to: customerEmail,
          subject: `✅ Paiement confirmé - Commande ${orderId}`,
          html: getPaymentConfirmationEmail(customerName, orderId, packType, amount),
        });
        console.log(`✅ Confirmation email sent to: ${customerEmail}`);
        results.clientEmail.success = true;
      } catch (emailError: unknown) {
        console.error('❌ Failed to send customer email:', emailError);
        results.clientEmail.error = (emailError as Error).message;
      }
    }

    // Send notification to admin
    const adminEmail = 'w.master@successproductions.ma';

    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #ddd; }
    .header { background: #000; color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
    .content { padding: 40px; }
    .alert-box { border: 1px solid #000; padding: 20px; margin-bottom: 30px; text-align: center; background: #fff; }
    .info-section { margin: 30px 0; border-top: 1px solid #111; border-bottom: 1px solid #111; padding: 20px 0; }
    .info-section h2 { margin: 0 0 20px; color: #111; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { color: #000; font-weight: 500; font-size: 14px; }
    .button { display: inline-block; background: #fff; color: #000 !important; text-decoration: none; padding: 14px 28px; border: 1px solid #000; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0; }
    .button:hover { background: #000; color: #fff !important; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #ddd; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouveau Paiement</h1>
      <p style="margin: 5px 0 0; font-size: 12px; opacity: 0.7;">Système de réservation</p>
    </div>
    
    <div class="content">
      <div class="alert-box">
        <strong>ACTION REQUISE</strong><br>
        Un paiement a été validé. Merci de traiter la réservation.
      </div>

      <div class="info-section">
        <h2>Détails Transaction</h2>
        <div class="info-row">
          <span class="info-label">Commande</span>
          <span class="info-value">${orderId}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Montant</span>
          <span class="info-value">${amount} MAD</span>
        </div>
        <div class="info-row">
          <span class="info-label">Programme</span>
          <span class="info-value">${packType}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date</span>
          <span class="info-value">${new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</span>
        </div>
      </div>

      <div class="info-section">
        <h2>Client</h2>
        <div class="info-row">
          <span class="info-label">Nom</span>
          <span class="info-value">${customerName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value"><a href="mailto:${customerEmail}" style="color: #000; text-decoration: none;">${customerEmail}</a></span>
        </div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://docs.google.com/spreadsheets/d/14OV3S9DgB56O0pS41BL-CPt3Drc_b9mMireh1xE_6hw/edit?gid=1039439884#gid=1039439884" class="button">
          Ouvrir Google Sheets
        </a>
      </div>
    </div>

    <div class="footer">
      <p>Dakhla Club - DC Thermes</p>
    </div>
  </div>
</body>
</html>
    `;

    try {
      await transporter.sendMail({
        from: `"Dakhla Club Payments" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `💰 Nouveau paiement reçu - ${orderId} - ${amount} MAD`,
        html: adminEmailHtml,
      });
      console.log(`✅ Admin notification sent to: ${adminEmail}`);
      results.adminEmail.success = true;
    } catch (emailError: unknown) {
      console.error('❌ Failed to send admin email:', emailError);
      results.adminEmail.error = (emailError as Error).message;
    }

    return NextResponse.json({
      success: true,
      message: 'Email test completed',
      results,
      config: {
        emailUser: process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS,
      },
    });

  } catch (error: unknown) {
    console.error('Email test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: (error as Error).message,
        config: {
          emailUser: process.env.EMAIL_USER,
          hasEmailPass: !!process.env.EMAIL_PASS,
        },
      },
      { status: 500 }
    );
  }
}
