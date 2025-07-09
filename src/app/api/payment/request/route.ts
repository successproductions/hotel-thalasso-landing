import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface PaymentRequestBody {
  amount: number; // in centimes (e.g., 10000 = 100.00 MAD)
  customerInfo?: {
    email: string;
    name: string;
    phone?: string;
  };
}

/**
 * Generate CMI hash using SHA-512 and Base64 encoding (as per CMI documentation)
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
 * POST /api/payment/request
 * Create a payment request for CMI gateway
 */
export async function POST(req: NextRequest) {
  try {
    const body: PaymentRequestBody = await req.json();
    
    // Validate required fields
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // CMI Configuration using your environment variables
    const clientId = process.env.CMI_CLIENT_ID!; // 600000294
    const storeKey = process.env.CMI_STORE_KEY!; // Dakhl@2025Test
    const currency = process.env.CMI_CURRENCY!; // 504
    const gateway = process.env.CMI_GATEWAY!; // https://testpayment.cmi.co.ma/fim/est3Dgate
    
    // Generate unique order ID
    const orderId = `HOTEL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const randomString = crypto.randomBytes(10).toString('hex');
    
    // Get base URL from environment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    
    // Prepare CMI parameters (as per documentation)
    const cmiParams: Record<string, string> = {
      // Required parameters
      clientid: clientId,
      storetype: '3d_pay_hosting',
      trantype: 'PreAuth',
      amount: (body.amount / 100).toFixed(2), // Convert centimes to MAD
      currency: currency,
      oid: orderId,
      okUrl: `${baseUrl}/fr/payment/success`,
      failUrl: `${baseUrl}/fr/payment/failure`,
      lang: 'fr',
      email: body.customerInfo?.email || 'test@example.com',
      BillToName: body.customerInfo?.name || 'Client Test',
      rnd: randomString,
      hashAlgorithm: 'ver3',
      
      // Optional but recommended parameters
      encoding: 'UTF-8',
      CallbackResponse: 'true',
      callbackUrl: `${baseUrl}/api/payment/callback`,
      shopurl: baseUrl,
    };

    // Add optional customer information
    if (body.customerInfo?.phone) {
      cmiParams.tel = body.customerInfo.phone;
    }

    // Add billing address (required by CMI)
    cmiParams.BillToCity = 'Dakhla';
    cmiParams.BillToCountry = '504';
    cmiParams.BillToPostalCode = '73000';

    // Generate hash
    const hash = generateCMIHash(cmiParams, storeKey);
    cmiParams.hash = hash;

    console.log('CMI Parameters:', cmiParams);
    console.log('Generated Hash:', hash);

    return NextResponse.json({
      success: true,
      gateway,
      orderId,
      fields: cmiParams
    });

  } catch (error) {
    console.error('Payment request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}