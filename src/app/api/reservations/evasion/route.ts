import { NextRequest, NextResponse } from 'next/server';
import { upsertBrevoContact } from '@/lib/brevo';

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_SHEET_EVASION_URL || '';

/**
 * Human-readable programme name, mirroring the label the Apps Script writes to
 * the sheet so the CRM and the spreadsheet agree. Brevo resolves the WhatsApp
 * template's {{PROGRAMME}} from this value.
 */
function getProgrammeLabel(pageSlug: string, selectedOffer: string): string {
  switch (pageSlug) {
    case 'vitalite':
      return 'Thalasso Vitalité 3 Jours';
    case 'regeneration':
      return `Thalasso Régénération ${selectedOffer} Jours`;
    case 'renaissance':
      return `Thalasso Renaissance ${selectedOffer} Jours`;
    default:
      return `Évasion ${selectedOffer} Nuits`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add timestamp and format data for Google Sheets
    // orderId is generated upfront in the panier page and passed here
    // so it can be used later to update the status after payment confirmation
    const reservationData = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      numberOfPeople: data.numberOfPeople || '1',
      arrivalDate: data.arrivalDate || '',
      selectedOffer: data.selectedOffer || '3',
      pageSlug: data.pageSlug || 'evasion',
      orderId: data.orderId || '',
      status: 'En attente', // Initial status — updated to "Paiement confirmé" after CMI confirms
    };

    console.log('Sending to Google Sheets:', reservationData);

    // Send to Google Sheets
    if (GOOGLE_APPS_SCRIPT_URL) {
      try {
        const sheetsResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
          redirect: 'follow',
        });

        const sheetsResult = await sheetsResponse.text();
        console.log('Google Sheets response:', sheetsResult);
      } catch (sheetsError) {
        console.error('Google Sheets error:', sheetsError);
        // Continue even if sheets fail - don't block the response
      }
    }

    // Create/update the contact in Brevo and add it to the leads list (never
    // throws). The list membership is what starts the WhatsApp journey: a Brevo
    // automation owns the sequence from there, the same one the evasion-3 form
    // feeds.
    await upsertBrevoContact({
      fullName: reservationData.fullName,
      email: reservationData.email,
      phone: reservationData.phone,
      numberOfPeople: reservationData.numberOfPeople,
      arrivalDate: reservationData.arrivalDate,
      selectedPack: getProgrammeLabel(
        reservationData.pageSlug,
        reservationData.selectedOffer
      ),
    });

    // Email confirmation will be sent after successful payment via callback/success route
    return NextResponse.json({
      success: true,
      message: 'Reservation saved successfully',
    });
  } catch (error) {
    console.error('Reservation API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
