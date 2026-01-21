import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse form data from CMI failUrl redirect
    const formData = await request.formData();
    const params: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    const orderId = params['oid'] || '';
    const errorCode = params['ProcReturnCode'] || 'unknown';
    const errorMessage = params['ErrMsg'] || '';

    console.log(`Payment failed redirect - Order: ${orderId}, Code: ${errorCode}, Message: ${errorMessage}`);

    const locale = 'fr';
    
    // Redirect to payment error page
    return NextResponse.redirect(
      new URL(`/${locale}/evasion/payment-error?order=${orderId}&code=${errorCode}`, request.nextUrl.origin)
    );

  } catch (error) {
    console.error('Fail redirect error:', error);
    return NextResponse.redirect(
      new URL('/fr/evasion/payment-error', request.nextUrl.origin)
    );
  }
}

// Handle GET redirects as well
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('oid') || '';
  const errorCode = searchParams.get('ProcReturnCode') || 'unknown';
  const locale = 'fr';

  return NextResponse.redirect(
    new URL(`/${locale}/evasion/payment-error?order=${orderId}&code=${errorCode}`, request.nextUrl.origin)
  );
}
