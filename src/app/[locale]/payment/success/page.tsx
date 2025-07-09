'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  type PaymentDetails = {
    orderId: string | null;
    amount: string;
    transactionId: string | null;
    authCode: string | null;
    response: string | null;
    date: string;
  } | null;
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract payment details from URL parameters
    const orderId = searchParams.get('oid') || searchParams.get('ReturnOid') || sessionStorage.getItem('currentOrderId');
    const amount = searchParams.get('amount');
    const transactionId = searchParams.get('TransId');
    const authCode = searchParams.get('AuthCode');
    const response = searchParams.get('Response');

    console.log('Success page params:', {
      orderId,
      amount,
      transactionId,
      authCode,
      response
    });

    if (orderId) {
      setPaymentDetails({
        orderId,
        amount: amount ? `${amount} MAD` : 'N/A',
        transactionId,
        authCode,
        response,
        date: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    }

    setLoading(false);
    
    // Clear order ID from session storage
    sessionStorage.removeItem('currentOrderId');
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-8 text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Paiement Réussi !</h1>
          <p className="text-green-100">Votre réservation a été confirmée</p>
        </div>

        {/* Payment Details */}
        <div className="p-6">
          {paymentDetails ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Détails du paiement
                </h2>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Numéro de commande:</span>
                    <span className="font-mono text-gray-900">{paymentDetails.orderId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant:</span>
                    <span className="font-semibold text-gray-900">{paymentDetails.amount}</span>
                  </div>
                  
                  {paymentDetails.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID Transaction:</span>
                      <span className="font-mono text-gray-900">{paymentDetails.transactionId}</span>
                    </div>
                  )}
                  
                  {paymentDetails.authCode && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Code d autorisation:</span>
                      <span className="font-mono text-gray-900">{paymentDetails.authCode}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">{paymentDetails.date}</span>
                  </div>
                </div>
              </div>

              {/* Confirmation Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  Prochaines étapes
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Vous recevrez un email de confirmation</li>
                  <li>• Notre équipe vous contactera sous 24h</li>
                  <li>• Gardez ce numéro pour vos références</li>
                </ul>
              </div>

              {/* Action Button */}
              <Link
                href="/fr"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>Retour à l accueil</span>
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Aucun détail de paiement trouvé.
              </p>
              <Link
                href="/fr"
                className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700"
              >
                <span>Retour à l accueil</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}