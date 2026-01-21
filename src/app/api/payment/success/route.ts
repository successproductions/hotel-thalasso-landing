import { NextRequest, NextResponse } from 'next/server';

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
      console.log(`Payment success redirect for order: ${orderId}`);
      
      // Redirect to thank you page
      return NextResponse.redirect(
        `https://offer.dakhlaclub.com/${locale}/evasion/thank-you?order=${orderId}`
      );
    } else {
      // Payment failed
      console.log(`Payment failed redirect for order: ${orderId}`);
      return NextResponse.redirect(
        new URL(`/${locale}/evasion/payment-error?order=${orderId}`, request.nextUrl.origin)
      );
    }

  } catch (error) {
    console.error('Success redirect error:', error);
    return NextResponse.redirect(
      new URL('/fr/evasion/payment-error', request.nextUrl.origin)
    );
  }
}

// Handle GET redirects as well
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('oid') || '';
  const procReturnCode = searchParams.get('ProcReturnCode') || '';
  const locale = 'fr';

  if (procReturnCode === '00') {
    return NextResponse.redirect(
      new URL(`/${locale}/evasion/thank-you?order=${orderId}`, request.nextUrl.origin)
    );
  } else {
    return NextResponse.redirect(
      new URL(`/${locale}/evasion/payment-error?order=${orderId}`, request.nextUrl.origin)
    );
  }
}
