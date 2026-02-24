import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// CMI Configuration
const CMI_CONFIG = {
  clientId: process.env.CMI_CLIENT_ID_PROD || '900010002',
  storeKey: process.env.CMI_STORE_KEY_PROD || 'TEST1234',
  gatewayUrl: process.env.CMI_GATEWAY_URL_PROD || 'https://test-alfilahicash.cmi.co.ma/fim/est3Dgate',
  currency: process.env.CMI_CURRENCY_PROD || '504',
};

// Offer prices in MAD - Update with actual prices
const OFFER_PRICES: Record<string, number> = {
  '3': 1, // ⚠️ TEST ONLY — revert to 5450 before going live
  '5': 10350,
  '7': 11700,
};

interface PaymentRequest {
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  arrivalDate: string;
  selectedOffer: string;
  pageSlug?: string; // 'evasion' | 'regeneration' | 'renaissance' | 'vitalite'
}

// Page slug → order ID prefix mapping
const PAGE_PREFIXES: Record<string, string> = {
  'evasion': 'EVA',
  'regeneration': 'REG',
  'renaissance': 'REN',
  'vitalite': 'VIT',
};

// Generate unique order ID with page-specific prefix
function generateOrderId(offerType: string, pageSlug?: string): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  const prefix = PAGE_PREFIXES[pageSlug || 'evasion'] || 'EVA';
  return `${prefix}${offerType}-${timestamp}${randomPart}`.toUpperCase();
}

// Generate random string for rnd parameter
function generateRnd(): string {
  return crypto.randomBytes(10).toString('hex');
}

// Clean string for billing info (remove special characters)
// Returns a fallback if the result is empty (e.g. user entered only special chars)
function cleanBillingString(str: string, fallback: string = 'Client'): string {
  const cleaned = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .substring(0, 50);
  return cleaned || fallback;
}

// Generate CMI hash following the exact algorithm from the integration kit
function generateHash(params: Record<string, string>, storeKey: string): string {
  // Get all parameter keys and sort them alphabetically (case-insensitive)
  const sortedKeys = Object.keys(params).sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  // Build hash string (exclude 'hash' and 'encoding' for outgoing payment request)
  let hashString = '';
  for (const key of sortedKeys) {
    const lowerKey = key.toLowerCase();
    // Exclude hash and encoding from the hash calculation for payment initiation
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
    const { fullName, email, phone, selectedOffer, arrivalDate, numberOfPeople, pageSlug } = body;

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
    const orderId = generateOrderId(selectedOffer, pageSlug);
    const rnd = generateRnd();

    // Get base URL for callbacks
    // STRICT: In production, ALWAYS use the official domain.
    // In development, detect localhost to allow local testing.
    let baseUrl = 'https://offer.dakhlaclub.com';

    if (process.env.NODE_ENV === 'development') {
      const origin = request.nextUrl.origin;
      if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        baseUrl = origin;
      }
    }

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
      shopurl: `${baseUrl}/fr/${pageSlug || 'evasion'}`,
      
      // Customer info
      email: email,
      tel: phone.replace(/\s/g, ''),
      
      // Billing info - client personal info (street not collected, using city)
      BillToName: cleanBillingString(fullName),
      BillToStreet1: 'Dakhla',
      BillToCity: 'Dakhla',
      BillToStateProv: 'Dakhla-Oued Ed-Dahab',
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
