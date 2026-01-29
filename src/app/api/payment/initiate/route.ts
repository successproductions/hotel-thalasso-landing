import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// CMI Configuration
const CMI_CONFIG = {
  clientId: process.env.CMI_CLIENT_ID || '900010002',
  storeKey: process.env.CMI_STORE_KEY || 'TEST1234',
  gatewayUrl: process.env.CMI_GATEWAY_URL || 'https://test-alfilahicash.cmi.co.ma/fim/est3Dgate',
  currency: process.env.CMI_CURRENCY || '504',
};

// Offer prices in MAD - Update with actual prices
const OFFER_PRICES: Record<string, number> = {
  '3': 4560,
  '5': 9200,
  '7': 11250,
};

interface PaymentRequest {
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  arrivalDate: string;
  selectedOffer: string;
}

// Generate unique order ID
function generateOrderId(offerType: string): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `EVA${offerType}-${timestamp}${randomPart}`.toUpperCase();
}

// Generate random string for rnd parameter
function generateRnd(): string {
  return crypto.randomBytes(10).toString('hex');
}

// Clean string for billing info (remove special characters)
function cleanBillingString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .substring(0, 50);
}

// Generate CMI hash following the exact algorithm from the integration kit
function generateHash(params: Record<string, string>, storeKey: string): string {
  // Get all parameter keys and sort them alphabetically (case-insensitive)
  const sortedKeys = Object.keys(params).sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  // Build hash string
  let hashString = '';
  for (const key of sortedKeys) {
    const lowerKey = key.toLowerCase();
    // Exclude hash and encoding from the hash calculation
    if (lowerKey !== 'hash' && lowerKey !== 'encoding') {
      const value = params[key] || '';
      // Escape backslash first, then pipe
      const escapedValue = value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
      hashString += escapedValue + '|';
    }
  }

  // Add store key at the end
  const escapedStoreKey = storeKey.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
  hashString += escapedStoreKey;

  // Generate SHA512 hash
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  
  // Pack the hex string and encode as base64
  const packedHash = Buffer.from(hash, 'hex').toString('base64');

  return packedHash;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    const { fullName, email, phone, selectedOffer, arrivalDate, numberOfPeople } = body;

    // Get price for selected offer
    const basePrice = OFFER_PRICES[selectedOffer];
    if (!basePrice) {
      return NextResponse.json(
        { error: 'Invalid offer selected' },
        { status: 400 }
      );
    }

    // Calculate total amount based on number of people
    const count = parseInt(numberOfPeople, 10);
    if (isNaN(count) || count < 1) {
      return NextResponse.json(
        { error: 'Invalid number of people' },
        { status: 400 }
      );
    }
    const amount = basePrice * count;

    // Generate unique order ID and random string
    const orderId = generateOrderId(selectedOffer);
    const rnd = generateRnd();

    // Get base URL for callbacks - Support localhost for internal testing, force production for others
    const origin = request.nextUrl.origin;
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1');
    const baseUrl = isLocal ? origin : 'https://offer.dakhlaclub.com';

    // Build payment parameters - exact names from CMI documentation
    const params: Record<string, string> = {
      // Required fields
      clientid: CMI_CONFIG.clientId,
      amount: amount.toFixed(2),
      currency: CMI_CONFIG.currency,
      oid: orderId,
      rnd: rnd,
      lang: 'fr',
      storetype: '3D_PAY_HOSTING',
      hashAlgorithm: 'ver3',
      TranType: 'PreAuth',
      refreshtime: '5',
      
      // URLs - must be accessible from CMI servers
      okUrl: `${baseUrl}/api/payment/success`,
      failUrl: `${baseUrl}/api/payment/fail`,
      callbackUrl: `${baseUrl}/api/payment/callback`,
      shopurl: baseUrl,
      
      // Customer info
      email: email,
      tel: phone.replace(/\s/g, ''),
      
      // Billing info - cleaned
      BillToName: cleanBillingString(fullName),
      BillToCompany: 'Dakhla Club',
      BillToStreet1: 'Dakhla Evasion',
      BillToCity: 'Dakhla',
      BillToStateProv: 'Dakhla',
      BillToPostalCode: '73000',
      BillToCountry: '504',
      
      // Encoding
      encoding: 'UTF-8',
    };

    // Generate hash
    const hash = generateHash(params, CMI_CONFIG.storeKey);

    // Add hash to params
    const paramsWithHash = {
      ...params,
      HASH: hash,
    };

    console.log('CMI Payment initiated:', {
      orderId,
      amount,
      clientId: CMI_CONFIG.clientId,
      gatewayUrl: CMI_CONFIG.gatewayUrl,
    });

    // Return payment data for form submission
    return NextResponse.json({
      success: true,
      gatewayUrl: CMI_CONFIG.gatewayUrl,
      orderId: orderId,
      params: paramsWithHash,
      bookingInfo: {
        fullName,
        email,
        phone,
        selectedOffer,
        arrivalDate,
        numberOfPeople,
        amount,
        orderId,
      },
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
