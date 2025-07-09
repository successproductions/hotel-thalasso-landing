import { NextRequest } from 'next/server';
import crypto from 'crypto';

/**
 * Generate CMI hash using SHA-512 and Base64 encoding (same as request)
 */
function generateCMIHash(params: Record<string, string>, storeKey: string): string {
  // Sort parameters alphabetically (case-insensitive) excluding hash and encoding
  const sortedKeys = Object.keys(params)
    .filter(key => key.toLowerCase() !== 'hash' && key.toLowerCase() !== 'encoding')
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // Build hash string with escaped values
  let hashString = '';
  for (const key of sortedKeys) {
    const value = params[key] || '';
    // Escape special characters as per CMI documentation
    const escapedValue = value
      .replace(/\\/g, '\\\\')
      .replace(/\|/g, '\\|');
    hashString += escapedValue + '|';
  }

  // Add store key at the end
  const escapedStoreKey = storeKey
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|');
  hashString += escapedStoreKey;

  // Generate SHA-512 hash and encode to Base64
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  return Buffer.from(hash, 'hex').toString('base64');
}

/**
 * Verify CMI callback hash
 */
function verifyCMIHash(params: Record<string, string>, storeKey: string): boolean {
  const receivedHash = params.hash || params.HASH;
  if (!receivedHash) {
    console.error('No hash received in callback');
    return false;
  }

  const expectedHash = generateCMIHash(params, storeKey);
  const isValid = receivedHash === expectedHash;
  
  console.log('Hash verification:', {
    received: receivedHash,
    expected: expectedHash,
    isValid,
    storeKey: storeKey ? 'Present' : 'Missing'
  });
  
  return isValid;
}

/**
 * POST /api/payment/callback
 * Handle CMI server-to-server callback
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    
    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      params[key] = value.toString();
    }

    console.log('🔄 CMI Callback received:', params);

    const storeKey = process.env.CMI_STORE_KEY;
    
    if (!storeKey) {
      console.error('❌ CMI_STORE_KEY not found in environment');
      return new Response('FAILURE', { status: 200 });
    }

    // Verify hash
    if (!verifyCMIHash(params, storeKey)) {
      console.error('❌ CMI callback hash verification failed');
      return new Response('FAILURE', { status: 200 });
    }

    const orderId = params.oid || params.ReturnOid;
    const amount = params.amount;
    const procReturnCode = params.ProcReturnCode;
    const response = params.Response;

    // Log transaction details
    console.log('📊 Transaction details:', {
      orderId,
      amount,
      procReturnCode,
      response,
      transactionId: params.TransId,
      authCode: params.AuthCode,
      errorMessage: params.ErrMsg
    });

    // Check if payment was successful
    if (procReturnCode === '00' && response === 'Approved') {
      // Payment successful
      console.log(`✅ Payment successful for order ${orderId}`);
      
      // TODO: Update order status in your database
      // await updateOrderStatus(orderId, 'paid', {
      //   transactionId: params.TransId,
      //   authCode: params.AuthCode,
      //   amount: amount,
      //   paymentDate: new Date()
      // });

      // Respond with ACTION=POSTAUTH to auto-capture the payment
      console.log('✅ Responding with ACTION=POSTAUTH');
      return new Response('ACTION=POSTAUTH', { status: 200 });
    } else {
      // Payment failed
      console.log(`❌ Payment failed for order ${orderId}:`, {
        procReturnCode,
        response,
        errorMessage: params.ErrMsg
      });
      
      // TODO: Update order status in your database
      // await updateOrderStatus(orderId, 'failed', {
      //   errorCode: procReturnCode,
      //   errorMessage: params.ErrMsg,
      //   failureDate: new Date()
      // });

      // Acknowledge the callback
      console.log('✅ Responding with APPROVED');
      return new Response('APPROVED', { status: 200 });
    }

  } catch (error) {
    console.error('❌ CMI callback error:', error);
    return new Response('FAILURE', { status: 200 });
  }
}

/**
 * GET /api/payment/callback
 * Handle CMI redirect callback (for testing)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params: Record<string, string> = {};
    
    // Convert URL params to object
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    console.log('🔄 CMI GET callback received:', params);

    const procReturnCode = params.ProcReturnCode;
    const response = params.Response;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (procReturnCode === '00' && response === 'Approved') {
      // Redirect to success page
      return Response.redirect(`${baseUrl}/fr/payment/success?${searchParams.toString()}`);
    } else {
      // Redirect to failure page
      return Response.redirect(`${baseUrl}/fr/payment/failure?${searchParams.toString()}`);
    }

  } catch (error) {
    console.error('❌ CMI GET callback error:', error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return Response.redirect(`${baseUrl}/fr/payment/failure?error=callback_error`);
  }
}