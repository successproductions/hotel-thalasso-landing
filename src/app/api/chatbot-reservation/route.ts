
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('Received chatbot reservation data:', data);
    
    //  URL Google Apps Script
    const gscriptUrl = process.env.NEXT_PUBLIC_GSCRIPT_URL!;
    
    if (!gscriptUrl) {
      return NextResponse.json(
        { status: 'error', message: 'URL Google Apps Script non configurée' }, 
        { status: 500 }
      );
    }
    
    // Faire la requête vers Google Apps Script depuis le serveur Next.js
    const response = await fetch(gscriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Google Apps Script responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Google Apps Script response:', result);
    
    return NextResponse.json(result, { 
      status: 200,
      headers: {
        // Ajouter des headers CORS si nécessaire
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    
  } catch (error) {
    console.error('Erreur API chatbot-reservation:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Erreur lors de la sauvegarde des données de réservation',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      }, 
      { status: 500 }
    );
  }
}

// Gérer les requêtes OPTIONS pour CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}