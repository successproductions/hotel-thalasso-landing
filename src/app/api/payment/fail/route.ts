import { NextRequest, NextResponse } from 'next/server';

// Detect source page from order ID prefix
function getPageFromOrderId(orderId: string): string {
  if (orderId.startsWith('REG')) return 'regeneration';
  if (orderId.startsWith('REN')) return 'renaissance';
  if (orderId.startsWith('VIT')) return 'vitalite';
  return 'evasion';
}

// Error page. DC Luxury Thermes orders (DCT-…, from /dc-thermes) have their own, in that site's style.
function errorPath(orderId: string, errorCode: string, locale: string): string {
  const query = `?order=${encodeURIComponent(orderId)}&code=${encodeURIComponent(errorCode)}`;
  if (orderId.startsWith('DCT-')) return `/dc-thermes/paiement-echoue${query}`;
  return `/${locale}/${getPageFromOrderId(orderId)}/payment-error${query}`;
}

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

    const locale = 'fr';
    
    // Redirect to evasion error page with error details the proper base URL from the request
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Construct safe redirect URL
    const targetUrl = `${baseUrl}${errorPath(orderId, errorCode, locale)}`;
    return NextResponse.redirect(targetUrl, { status: 302 });

  } catch (error) {
    console.error('Fail redirect error:', error);
    // Fallback safe redirect
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    return NextResponse.redirect(`${protocol}://${host}/fr/evasion/payment-error`, { status: 302 });
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

  const targetUrl = `${baseUrl}${errorPath(orderId, errorCode, locale)}`;
  return NextResponse.redirect(targetUrl, { status: 302 });
}
