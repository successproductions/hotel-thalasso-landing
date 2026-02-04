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

    // Construct safe redirect URL
    const targetUrl = `/${locale}/evasion/payment-error?order=${encodeURIComponent(orderId)}&code=${encodeURIComponent(errorCode)}`;
    return NextResponse.redirect(new URL(targetUrl, request.url));

  } catch (error) {
    console.error('Fail redirect error:', error);
    // Fallback safe redirect
    return NextResponse.redirect(new URL('/fr/evasion/payment-error', request.url));
  }
}

// Handle GET redirects as well
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('oid') || '';
  const errorCode = searchParams.get('ProcReturnCode') || 'unknown';
  const locale = 'fr';

  const targetUrl = `/${locale}/evasion/payment-error?order=${encodeURIComponent(orderId)}&code=${encodeURIComponent(errorCode)}`;
  return NextResponse.redirect(new URL(targetUrl, request.url));
}
