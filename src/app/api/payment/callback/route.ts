import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// CMI Configuration
const CMI_CONFIG = {
  storeKey: process.env.CMI_STORE_KEY || 'TEST1234',
};

// Generate hash for verification
function generateHash(params: Record<string, string>, storeKey: string): string {
  const sortedKeys = Object.keys(params).sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  let hashString = '';
  for (const key of sortedKeys) {
    const lowerKey = key.toLowerCase();
    if (lowerKey !== 'hash' && lowerKey !== 'encoding') {
      const value = params[key] || '';
      const escapedValue = value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
      hashString += escapedValue + '|';
    }
  }

  const escapedStoreKey = storeKey.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
  hashString += escapedStoreKey;

  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  const packedHash = Buffer.from(hash, 'hex').toString('base64');

  return packedHash;
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data from CMI
    const formData = await request.formData();
    const params: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    // Get the hash sent by CMI
    const receivedHash = params['HASH'] || params['hash'];
    
    // Generate our own hash for verification
    const calculatedHash = generateHash(params, CMI_CONFIG.storeKey);

    // Verify hash
    if (receivedHash !== calculatedHash) {
      console.error('Hash verification failed');
      return new NextResponse('FAILURE', { status: 200 });
    }

    // Check payment result
    const procReturnCode = params['ProcReturnCode'];
    const orderId = params['oid'];
    const amount = params['amount'];

    console.log(`Payment callback received - Order: ${orderId}, Amount: ${amount}, Result: ${procReturnCode}`);

    if (procReturnCode === '00') {
      // Payment successful - Auto capture
      console.log(`Payment successful for order: ${orderId}`);
      
      // TODO: Update database with payment status
      // TODO: Send confirmation email
      
      return new NextResponse('ACTION=POSTAUTH', { status: 200 });
    } else {
      // Payment failed
      console.log(`Payment failed for order: ${orderId} with code: ${procReturnCode}`);
      return new NextResponse('APPROVED', { status: 200 });
    }

  } catch (error) {
    console.error('Callback processing error:', error);
    return new NextResponse('FAILURE', { status: 200 });
  }
}

// Handle GET requests (not expected, but handle gracefully)
export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
