import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_SHEET_EVASION_URL || '';

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
    const reservationData = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      numberOfPeople: data.numberOfPeople || '1',
      arrivalDate: data.arrivalDate || '',
      selectedOffer: data.selectedOffer || '3',
      orderId: data.orderId || '', // Add order ID
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

    // Send confirmation email
    try {
      const emailResponse = await fetch(`${request.nextUrl.origin}/api/email/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.email,
          fullName: data.fullName,
          selectedOffer: data.selectedOffer,
          arrivalDate: data.arrivalDate,
          numberOfPeople: data.numberOfPeople,
          orderId: data.orderId,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Email API error:', await emailResponse.text());
      } else {
        console.log('Confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails
    }

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
