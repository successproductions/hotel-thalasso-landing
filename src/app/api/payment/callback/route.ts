import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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

// Email template for payment confirmation
const getPaymentConfirmationEmail = (customerName: string, orderId: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #139584 0%, #0d9488 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .success-box { background: #d1fae5; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #139584; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .info-row { margin: 10px 0; padding: 8px 0; }
    .label { font-weight: bold; color: #139584; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #139584; color: #666; }
    h1 { margin: 0; font-size: 28px; }
    h2 { color: #139584; margin-top: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Paiement Confirmé</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Dakhla Club - DC Thermes</p>
    </div>
    <div class="content">
      <div class="success-box">
        <strong>🎉 Votre paiement a été accepté avec succès !</strong>
      </div>

      <h2>Bonjour ${customerName},</h2>
      <p>Nous avons bien reçu votre paiement. Votre réservation est maintenant confirmée.</p>

      <div class="info-box">
        <h3 style="color: #139584; margin-top: 0;">📋 Numéro de commande</h3>
        <div class="info-row">
          <span class="label">Référence:</span> ${orderId}
        </div>
      </div>

      <p>Notre équipe vous contactera dans les plus brefs délais pour finaliser les détails de votre séjour.</p>

      <div class="footer">
        <p style="margin: 5px 0;"><strong>Dakhla Club - DC Thermes</strong></p>
        <p style="margin: 5px 0;">📍 POINT DE DRAGON PK 28, Dakhla 73000, Maroc</p>
        <p style="margin: 5px 0;">📞 +212 652 88 19 21 | ✉️ reservation@dakhlaclub.com</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

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
      
      // Send confirmation emails using nodemailer
      try {
        // Extract customer info from callback params
        const customerEmail = params['email'];
        const customerName = params['BillToName'] || 'Client';
        
        // Setup nodemailer transporter (same as offer3)
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Send email to customer
        if (customerEmail) {
          try {
            await transporter.sendMail({
              from: `"Dakhla Club - DC Thermes" <${process.env.EMAIL_USER}>`,
              to: customerEmail,
              subject: `✅ Paiement confirmé - Commande ${orderId}`,
              html: getPaymentConfirmationEmail(customerName, orderId),
            });
            console.log(`Confirmation email sent to: ${customerEmail}`);
          } catch (emailError) {
            console.error('Failed to send customer email:', emailError);
          }
        }

        // Send notification to admin
        const adminEmail = 'w.master@successproductions.ma';
        try {
          await transporter.sendMail({
            from: `"Dakhla Club Payments" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `💰 Nouveau paiement reçu - ${orderId}`,
            html: `
              <h2>Nouveau paiement confirmé</h2>
              <p><strong>Commande:</strong> ${orderId}</p>
              <p><strong>Montant:</strong> ${amount} MAD</p>
              <p><strong>Client:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            `,
          });
          console.log(`Admin notification sent to: ${adminEmail}`);
        } catch (emailError) {
          console.error('Failed to send admin email:', emailError);
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
