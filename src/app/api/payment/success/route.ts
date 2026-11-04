import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { firstConfirmation, sendPaymentEmails } from '@/lib/paymentEmails';

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

// Detect source page from order ID prefix
function getPageFromOrderId(orderId: string): string {
  if (orderId.startsWith('REG')) return 'regeneration';
  if (orderId.startsWith('REN')) return 'renaissance';
  if (orderId.startsWith('VIT')) return 'vitalite';
  return 'evasion'; // default (EVA prefix or unknown)
}

// Page after payment. DC Luxury Thermes orders (DCT-…, from /dc-thermes) have their own pages, in that site's style.
function resultPath(orderId: string, paid: boolean, locale: string): string {
  if (orderId.startsWith('DCT-')) return `/dc-thermes/${paid ? 'merci' : 'paiement-echoue'}?order=${orderId}`;
  return `/${locale}/${getPageFromOrderId(orderId)}/${paid ? 'thank-you' : 'payment-error'}?order=${orderId}`;
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

    console.log('=== CMI SUCCESS REDIRECT RECEIVED ===');
    const procReturnCode = params['ProcReturnCode'];
    const orderId = params['oid'];

    // Determine Base URL correctly for production behind a proxy
    let baseUrl = 'https://offer.dakhlaclub.com';
    if (process.env.NODE_ENV === 'development') {
      const origin = request.nextUrl.origin;
      if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        baseUrl = origin;
      }
    }

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
          // The callback may already have sent them for this order: one email each for client and admin
          if (firstConfirmation(orderId)) await sendPaymentEmails(params);

          // Update lead status in Google Sheets to "Paiement confirmé"
          const googleScriptUrl = process.env.GOOGLE_SHEET_EVASION_URL;
          if (googleScriptUrl && orderId) {
            try {
              await fetch(googleScriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  action: 'updateStatus',
                  orderId: orderId,
                  status: 'Paiement confirmé',
                }),
                redirect: 'follow',
              });
              console.log(`✅ [Success Route] Status updated to "Paiement confirmé" for order ${orderId}`);
            } catch (statusError) {
              console.error('❌ [Success Route] Failed to update status in Google Sheets:', statusError);
            }
          }
      } else {
          console.error('❌ [Success Route] Hash verification failed. Emails not sent.', {
            receivedHash,
            calculatedHash,
            storeKeyUsed: CMI_CONFIG.storeKey
          });
      }
      
      // Redirect to thank you page with 303 See Other to force GET method
      return NextResponse.redirect(
        new URL(resultPath(orderId || '', true, locale), baseUrl),
        { status: 303 }
      );
    } else {
      // Payment failed
      return NextResponse.redirect(
        new URL(resultPath(orderId || '', false, locale), baseUrl),
        { status: 303 }
      );
    }

  } catch (error) {
    console.error('Success redirect error:', error);
    // Hard fallback just in case baseUrl isn't defined
    return NextResponse.redirect(
      new URL('/fr/evasion/payment-error', 'https://offer.dakhlaclub.com'),
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

  let baseUrl = 'https://offer.dakhlaclub.com';
  if (process.env.NODE_ENV === 'development') {
    const origin = request.nextUrl.origin;
    if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
      baseUrl = origin;
    }
  }

  return NextResponse.redirect(new URL(resultPath(orderId, procReturnCode === '00', locale), baseUrl));
}
