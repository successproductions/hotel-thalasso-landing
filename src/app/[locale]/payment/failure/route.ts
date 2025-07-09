import { NextRequest } from 'next/server';

/**
 * POST /[locale]/payment/failure
 * Handle POST requests from CMI redirect
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    
    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      params[key] = value.toString();
    }

    console.log('🔄 CMI POST redirect to failure page:', params);

    // Build query string from form data
    const queryString = new URLSearchParams(params).toString();
    
    // Get the current URL path
    const url = new URL(req.url);
    const currentPath = url.pathname;
    
    // Redirect to failure page with GET method and query parameters
    return Response.redirect(`${url.origin}${currentPath}?${queryString}`, 302);

  } catch (error) {
    console.error('❌ Failure page POST error:', error);
    // Redirect to failure page without params
    const url = new URL(req.url);
    return Response.redirect(`${url.origin}${url.pathname}`, 302);
  }
}