import { NextRequest } from 'next/server';

/**
 * POST /[locale]/payment/failure-redirect
 * Handle POST requests from CMI redirect and convert to GET
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    
    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      params[key] = value.toString();
    }

    console.log('🔄 CMI POST redirect to failure redirect:', params);

    // Build query string from form data
    const queryString = new URLSearchParams(params).toString();
    
    // Get the base URL
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    // Extract locale from the URL path
    const pathSegments = url.pathname.split('/');
    const locale = pathSegments[1]; // Should be 'fr' or 'en'
    
    // Redirect to failure page with GET method and query parameters
    return Response.redirect(`${baseUrl}/${locale}/payment/failure?${queryString}`, 302);

  } catch (error) {
    console.error('❌ Failure redirect POST error:', error);
    // Redirect to failure page without params
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const pathSegments = url.pathname.split('/');
    const locale = pathSegments[1];
    
    return Response.redirect(`${baseUrl}/${locale}/payment/failure`, 302);
  }
}

/**
 * GET /[locale]/payment/failure-redirect
 * Handle GET requests from CMI redirect
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const pathSegments = url.pathname.split('/');
    const locale = pathSegments[1];
    
    // Forward query parameters
    const queryString = url.search;
    
    // Redirect to failure page with GET method
    return Response.redirect(`${baseUrl}/${locale}/payment/failure${queryString}`, 302);

  } catch (error) {
    console.error('❌ Failure redirect GET error:', error);
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const pathSegments = url.pathname.split('/');
    const locale = pathSegments[1];
    
    return Response.redirect(`${baseUrl}/${locale}/payment/failure`, 302);
  }
}