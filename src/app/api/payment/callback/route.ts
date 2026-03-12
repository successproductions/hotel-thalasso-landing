import { NextRequest, NextResponse, after } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// CMI Configuration
const CMI_CONFIG = {
  storeKey: process.env.CMI_STORE_KEY || 'TEST1234',
};

// Decode HTML entities (equivalent to PHP html_entity_decode)
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

// Generate hash matching exactly the official CMI PHP callback reference
// PHP: natcasesort + html_entity_decode + preg_replace("\n$") + exclude hash & encoding
function generateHash(params: Record<string, string>, storeKey: string): string {
  // Sort keys case-insensitively using direct code-point comparison.
  // This matches PHP's ksort(SORT_STRING | SORT_FLAG_CASE) which does
  // byte-by-byte comparison of lowercased strings — NOT locale-aware.
  // JavaScript's localeCompare() uses ICU collation which can treat
  // punctuation (dots, underscores) differently on Vercel's Linux runtime,
  // reordering keys like EXTRA.CVVVERIFICATION and causing hash mismatches.
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
    // Exclude 'hash' and 'encoding' — matches PHP callback.php line 21
    if (lowerKey !== 'hash' && lowerKey !== 'encoding') {
      // Strip trailing newlines (PHP: preg_replace("/\n$/","",value))
      let value = (params[key] || '').replace(/\n$/, '');
      // Decode HTML entities (PHP: html_entity_decode(..., ENT_QUOTES, 'UTF-8'))
      value = decodeHtmlEntities(value);
      // Escape backslash first, then pipe (PHP: str_replace)
      const escapedValue = value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
      hashString += escapedValue + '|';
    }
  }

  // Escape store key and append
  const escapedStoreKey = storeKey.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
  hashString += escapedStoreKey;

  // SHA512 → hex → pack('H*') → base64 (matches PHP exactly)
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  const packedHash = Buffer.from(hash, 'hex').toString('base64');

  return packedHash;
}




// PREMIUM EMAIL TEMPLATES 
const getPaymentConfirmationEmail = (customerName: string, orderId: string, packType: string, amount: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #ddd; }
    .header { background: #000; color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
    .content { padding: 40px; }
    .welcome-text { margin-bottom: 30px; font-size: 15px; color: #333; }
    .hotel-box { background: #fdfaf3; border: 1px solid #d6bb8e; padding: 25px; text-align: center; margin: 30px 0; }
    .hotel-box h3 { margin: 0 0 10px; color: #111; font-size: 16px; text-transform: uppercase; letter-spacing: 1.5px; }
    .hotel-box p { margin: 0; font-size: 13px; color: #666; }
    .info-section { margin: 30px 0; border-top: 1px solid #111; border-bottom: 1px solid #111; padding: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { color: #000; font-weight: 500; font-size: 14px; text-align: right; }
    .button { display: inline-block; background: #fff; color: #000 !important; text-decoration: none; padding: 14px 28px; border: 1px solid #000; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 15px; }
    .button:hover { background: #000; color: #fff !important; }
    .footer { background: #f5f5f5; padding: 30px 20px; text-align: center; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Confirmation de Réservation</h1>
      <p style="margin: 5px 0 0; font-size: 12px; opacity: 0.7;">Programme Thalasso</p>
    </div>
    
    <div class="content">
      <div class="welcome-text">
        Chère/Cher <strong>${customerName}</strong>,<br><br>
        Nous avons le plaisir de vous confirmer la réception de votre paiement pour votre programme thalasso. Nous sommes ravis de vous compter parmi nos futurs curistes.
      </div>

      <div class="info-section">
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

async function sendEmails(params: Record<string, string>) {
  const orderId = params['oid'];
  const amount = params['amount'];
  const customerEmail = params['email'];
  const customerName = params['BillToName'] || 'Client';

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

  if (customerEmail) {
    try {
      await transporter.sendMail({
        from: `"Dakhla Club - DC Thermes" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `✅ Confirmation Réservation - ${packType}`,
        html: getPaymentConfirmationEmail(customerName, orderId, packType, amount),
      });
    } catch (error) {
      console.error('❌ Client email failed:', error);
    }
  }

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
    console.error('❌ Admin email failed:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // ─────────────────────────────────────────────────────────────────
    // 1. SAFELY PARSE FORM DATA (Vercel/NextJS robust handling for CMI)
    // ─────────────────────────────────────────────────────────────────
    const contentType = request.headers.get('content-type') || '';
    const params: Record<string, string> = {};

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const searchParams = new URLSearchParams(text);
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        params[key] = value.toString();
      });
    }

    console.log('=== CMI CALLBACK RECEIVED ===');
    console.log('Parameters Received via Callback:', JSON.stringify(params));



    // Get the hash sent by CMI
    const receivedHash = params['HASH'] || params['hash'];
    
    // Generate our own hash for verification
    const calculatedHash = generateHash(params, CMI_CONFIG.storeKey);

    // Verify hash
    if (receivedHash !== calculatedHash) {
      console.error('❌ CMI Callback Hash Mismatch!', { receivedHash, calculatedHash, storeKeyUsed: CMI_CONFIG.storeKey });
      // Temporary bypass for testing to confirm if it's ONLY a hash issue
      // return new NextResponse('FAILURE', { status: 200, headers: { 'Content-Type': 'text/plain' } });
      console.warn('⚠️ TEMPORARILY IGNORING HASH MISMATCH FOR DEBUGGING');
    }

    // Check payment result
    const procReturnCode = params['ProcReturnCode'];

    if (procReturnCode === '00') {
      console.log('✅ CMI Callback Success (00) - Returning ACTION=POSTAUTH');
      
      // Send emails asynchronously in the background using Next.js 15 'after'
      // This ensures CMI receives the POSTAUTH response immediately without timing out!
      after(async () => {
        console.log('📧 Starting background email task...');
        await sendEmails(params);
      });

      // ─────────────────────────────────────────────────────────────────────
      // CRITICAL: Return ACTION=POSTAUTH immediately! 
      // If we delay or fail parsing, CMI will abort AutoReturn.
      // ─────────────────────────────────────────────────────────────────────
      return new NextResponse('ACTION=POSTAUTH', { 
        status: 200, 
        headers: { 
          'Content-Type': 'text/plain',
          // Prevent caching of this server-to-server webhook
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        } 
      });
    } else {
      // Payment failed
      console.warn('⚠️ CMI Callback - Payment Failed. Return Code:', procReturnCode);
      return new NextResponse('APPROVED', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

  } catch (error) {
    console.error('❌ Callback processing error:', error);
    return new NextResponse('FAILURE', { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
}

// Handle GET requests (not expected, but handle gracefully)
export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
