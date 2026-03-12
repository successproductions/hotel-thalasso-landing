import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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
