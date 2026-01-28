import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// CMI Configuration
const CMI_CONFIG = {
  storeKey: process.env.CMI_STORE_KEY || 'TEST1234',
};

// Generate hash for verification
function generateHash(params: Record<string, string>, storeKey: string): string {
  const sortedKeys = Object.keys(params).sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  let hashString = '';
  for (const key of sortedKeys) {
    const lowerKey = key.toLowerCase();
    if (lowerKey !== 'hash' && lowerKey !== 'encoding') {
      const value = params[key] || '';
      const escapedValue = value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
      hashString += escapedValue + '|';
    }
  }

  const escapedStoreKey = storeKey.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
  hashString += escapedStoreKey;

  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  const packedHash = Buffer.from(hash, 'hex').toString('base64');

  return packedHash;
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data from CMI
    const formData = await request.formData();
    const params: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    // Get the hash sent by CMI
    const receivedHash = params['HASH'] || params['hash'];
    
    // Generate our own hash for verification
    const calculatedHash = generateHash(params, CMI_CONFIG.storeKey);

    // Verify hash
    if (receivedHash !== calculatedHash) {
      console.error('Hash verification failed');
      return new NextResponse('FAILURE', { status: 200 });
    }

    // Check payment result
    const procReturnCode = params['ProcReturnCode'];
    const orderId = params['oid'];
    const amount = params['amount'];

    console.log(`Payment callback received - Order: ${orderId}, Amount: ${amount}, Result: ${procReturnCode}`);

    if (procReturnCode === '00') {
      // Payment successful - Auto capture
      console.log(`Payment successful for order: ${orderId}`);
      
      // Send confirmation emails
      try {
        // Extract customer info from callback params
        const customerEmail = params['email'];
        const customerName = params['BillToName'];
        
        // Send email to customer
        if (customerEmail) {
          const emailResponse = await fetch(`${request.nextUrl.origin}/api/email/send-confirmation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: customerEmail,
              fullName: customerName || 'Client',
              selectedOffer: '3', // Default, will be updated from stored data
              arrivalDate: new Date().toISOString(),
              numberOfPeople: '1',
              orderId: orderId,
            }),
          });

          if (emailResponse.ok) {
            console.log(`Confirmation email sent to: ${customerEmail}`);
          } else {
            console.error('Failed to send customer email:', await emailResponse.text());
          }
        }

        // Send notification to admin
        const adminEmail = 'w.master@successproductions.ma';
        const adminEmailResponse = await fetch(`${request.nextUrl.origin}/api/email/send-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: adminEmail,
            fullName: customerName || 'Client',
            selectedOffer: '3',
            arrivalDate: new Date().toISOString(),
            numberOfPeople: '1',
            orderId: orderId,
          }),
        });

        if (adminEmailResponse.ok) {
          console.log(`Admin notification sent to: ${adminEmail}`);
        } else {
          console.error('Failed to send admin email:', await adminEmailResponse.text());
        }

      } catch (emailError) {
        console.error('Error sending confirmation emails:', emailError);
        // Don't fail the callback if email fails
      }
      
      return new NextResponse('ACTION=POSTAUTH', { status: 200 });
    } else {
      // Payment failed
      console.log(`Payment failed for order: ${orderId} with code: ${procReturnCode}`);
      return new NextResponse('APPROVED', { status: 200 });
    }

  } catch (error) {
    console.error('Callback processing error:', error);
    return new NextResponse('FAILURE', { status: 200 });
  }
}

// Handle GET requests (not expected, but handle gracefully)
export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
