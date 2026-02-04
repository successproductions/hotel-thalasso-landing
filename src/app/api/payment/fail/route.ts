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
    
    // Get the proper base URL from the request
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Construct safe redirect URL
    const targetUrl = `${baseUrl}/${locale}/evasion/payment-error?order=${encodeURIComponent(orderId)}&code=${encodeURIComponent(errorCode)}`;
    return NextResponse.redirect(targetUrl);

  } catch (error) {
    console.error('Fail redirect error:', error);
    // Fallback safe redirect
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    return NextResponse.redirect(`${protocol}://${host}/fr/evasion/payment-error`);
  }
}

// Handle GET redirects as well
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('oid') || '';
  const errorCode = searchParams.get('ProcReturnCode') || 'unknown';
  const locale = 'fr';

  // Get the proper base URL from the request
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const targetUrl = `${baseUrl}/${locale}/evasion/payment-error?order=${encodeURIComponent(orderId)}&code=${encodeURIComponent(errorCode)}`;
  return NextResponse.redirect(targetUrl);
}
