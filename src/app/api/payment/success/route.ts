import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// CMI Configuration (must match initiate/callback)
const CMI_CONFIG = {
  storeKey: process.env.CMI_STORE_KEY_PROD || 'TEST1234',
};

// Generate hash for verification (Exact same function as in callback)
function generateHash(params: Record<string, string>, storeKey: string): string {
  // Sort keys case-insensitively using direct code-point comparison
  // (same fix as callback/route.ts — avoids ICU locale collation differences)
  const sortedKeys = Object.keys(params).sort((a, b) => {
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    if (la < lb) return -1;
    if (la > lb) return 1;
    return 0;
  });

  let hashString = '';
  for (const key of sortedKeys) {
    const lowerKey = key.toLowerCase();
    if (lowerKey !== 'hash' && lowerKey !== 'encoding') {
      let value = (params[key] || '').replace(/\n$/, '');
      // Decode HTML entities (matches PHP html_entity_decode)
      value = value
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'");
      const escapedValue = value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
      hashString += escapedValue + '|';
    }
  }

  const escapedStoreKey = storeKey.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
  hashString += escapedStoreKey;

  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  return Buffer.from(hash, 'hex').toString('base64');
}

// PREMIUM EMAIL TEMPLATES (Exact copies from callback)
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
    .info-label { color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; min-width: 150px; padding-right: 15px; }
    .info-value { color: #000; font-weight: 500; font-size: 14px; text-align: right; margin-left: auto; }
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
          <a href="tel:+212652881921" style="color: #111; text-decoration: none; border-bottom: 1px solid #d6bb8e;">+212 661807293</a>
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

// Detect source page from order ID prefix
function getPageFromOrderId(orderId: string): string {
  if (orderId.startsWith('REG')) return 'regeneration';
  if (orderId.startsWith('REN')) return 'renaissance';
  if (orderId.startsWith('VIT')) return 'vitalite';
  return 'evasion'; // default (EVA prefix or unknown)
}

async function sendEmails(params: Record<string, string>) {
  const orderId = params['oid'];
  const amount = params['amount'];
  const customerEmail = params['email'];
  const customerName = params['BillToName'] || 'Client';

  // Determine pack type
  let packType = 'Programme Évasion';
  if (orderId && orderId.startsWith('EVA')) {
      const match = orderId.match(/^EVA(\d+)-/);
      if (match && match[1]) {
        const type = match[1];
        if (type === '3') packType = 'Thalasso Vitalité 3 Jours';
        else if (type === '5') packType = 'Thalasso Régénération 5 Jours';
        else if (type === '7') packType = 'Thalasso Renaissance 7 Jours';
      }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Client Email
  if (customerEmail) {
    try {
      await transporter.sendMail({
        from: `"Dakhla Club - DC Thermes" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `✅ Confirmation Réservation - ${packType}`,
        html: getPaymentConfirmationEmail(customerName, orderId, packType, amount),
      });

    } catch (error) {
      console.error('❌ [Success Route] Client email failed:', error);
    }
  }

  // Admin Email
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
    .info-label { color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; min-width: 150px; padding-right: 15px; }
    .info-value { color: #000; font-weight: 500; font-size: 14px; text-align: right; margin-left: auto; }
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

  } catch (error) {
    console.error('❌ [Success Route] Admin email failed:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data from CMI okUrl redirect
    const formData = await request.formData();
    const params: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    const procReturnCode = params['ProcReturnCode'];
    const orderId = params['oid'];

    // Get locale from stored booking info or default to 'fr'
    const locale = 'fr';

    if (procReturnCode === '00') {
      // Payment successful

      // Verify Hash
      const receivedHash = params['HASH'] || params['hash'];
      const calculatedHash = generateHash(params, CMI_CONFIG.storeKey);

      if (receivedHash === calculatedHash) {
          // Hash verified, proceed with emails sending asynchronously (don't block redirect too long, but ideally wait just a bit)
          // Since this is a serverless function, we should verify it completes or just fire and forget if platform allows.
          // For safety, we await it here to ensure it sends. The user can wait 1-2s.
          await sendEmails(params);
      } else {
          console.error('❌ Hash verification failed in Success Route. Emails not sent.');
      }
      
      // Redirect to thank you page with 303 See Other to force GET method
      const page = getPageFromOrderId(orderId || '');
      return NextResponse.redirect(
        `https://offer.dakhlaclub.com/${locale}/${page}/thank-you?order=${orderId}`,
        { status: 303 }
      );
    } else {
      // Payment failed
      const page = getPageFromOrderId(orderId || '');
      return NextResponse.redirect(
        `https://offer.dakhlaclub.com/${locale}/${page}/payment-error?order=${orderId}`,
        { status: 303 }
      );
    }

  } catch (error) {
    console.error('Success redirect error:', error);
    return NextResponse.redirect(
      'https://offer.dakhlaclub.com/fr/evasion/payment-error',
      { status: 303 }
    );
  }
}

// Handle GET redirects as well (Usually CMI is POST, but just in case)
export async function GET(request: NextRequest) {
  // GET requests are usually manual entry or user refreshing. 
  // We can't verify hash easily without params, and we shouldn't re-send email on refresh.
  // Just redirect.
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('oid') || '';
  const procReturnCode = searchParams.get('ProcReturnCode') || '';
  const locale = 'fr';

  if (procReturnCode === '00') {
    const page = getPageFromOrderId(orderId);
    return NextResponse.redirect(
      new URL(`/${locale}/${page}/thank-you?order=${orderId}`, request.nextUrl.origin)
    );
  } else {
    const page = getPageFromOrderId(orderId);
    return NextResponse.redirect(
      new URL(`/${locale}/${page}/payment-error?order=${orderId}`, request.nextUrl.origin)
    );
  }
}
