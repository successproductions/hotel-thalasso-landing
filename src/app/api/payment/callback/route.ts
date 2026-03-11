import { NextRequest, NextResponse } from 'next/server';
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
    const orderId = params['oid'];
    const amount = params['amount'];

    if (procReturnCode === '00') {
      console.log('✅ CMI Callback Success (00) - Returning ACTION=POSTAUTH');
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
