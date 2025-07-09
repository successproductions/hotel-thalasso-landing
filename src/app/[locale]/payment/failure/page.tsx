'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaymentFailureContent() {
  const searchParams = useSearchParams();
  type FailureDetails = {
    orderId: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    amount: string | null;
    response: string | null;
  } | null;
  const [failureDetails, setFailureDetails] = useState<FailureDetails>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('oid') || searchParams.get('ReturnOid') || sessionStorage.getItem('currentOrderId');
    const errorCode = searchParams.get('ProcReturnCode');
    const errorMessage = searchParams.get('ErrMsg');
    const amount = searchParams.get('amount');
    const response = searchParams.get('Response');

    console.log('Failure page params:', {
      orderId,
      errorCode,
      errorMessage,
      amount,
      response
    });

    setFailureDetails({
      orderId,
      errorCode,
      errorMessage,
      amount: amount ? `${amount} MAD` : null,
      response
    });

    setLoading(false);
    
    // Clear order ID from session storage
    sessionStorage.removeItem('currentOrderId');
  }, [searchParams]);

  const getErrorMessage = (code?: string): string => {
    const errorMessages: { [key: string]: string } = {
      '99': 'Erreur technique. Veuillez réessayer.',
      '05': 'Paiement refusé par votre banque.',
      '51': 'Fonds insuffisants.',
      '54': 'Carte expirée.',
      '57': 'Transaction non autorisée.',
      '82': 'Code CVV incorrect.',
      '3D-1004': 'Erreur de sécurité. Veuillez réessayer.',
      '3D-1005': 'Échec de l\'authentification.',
      'CORE-5110': 'Données incorrectes.'
    };

    return errorMessages[code || ''] || 'Une erreur est survenue lors du paiement.';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Failure Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-8 text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Paiement Échoué</h1>
          <p className="text-red-100">Votre transaction n a pas pu être complétée</p>
        </div>

        {/* Failure Details */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Error Information */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                Raison de l échec
              </h2>
              <p className="text-red-700 text-sm">
                {getErrorMessage(failureDetails?.errorCode ?? undefined)}
              </p>
              
              {failureDetails?.errorMessage && (
                <p className="text-red-600 text-xs mt-2">
                  Message: {failureDetails.errorMessage}
                </p>
              )}
              
              {failureDetails?.errorCode && (
                <p className="text-red-600 text-xs mt-1">
                  Code d erreur: {failureDetails.errorCode}
                </p>
              )}
            </div>

            {/* Order Details */}
            {failureDetails?.orderId && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Détails de la commande
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Numéro de commande:</span>
                    <span className="font-mono text-gray-900">{failureDetails.orderId}</span>
                  </div>
                  {failureDetails.amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant:</span>
                      <span className="text-gray-900">{failureDetails.amount}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What to do next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Que faire maintenant ?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Vérifiez les informations de votre carte</li>
                <li>• Assurez-vous d avoir des fonds suffisants</li>
                <li>• Contactez votre banque si nécessaire</li>
                <li>• Réessayez le paiement</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/fr/evasion-holistique-3-jours"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Réessayer le paiement</span>
              </Link>

              <Link
                href="/fr"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Retour à l accueil</span>
              </Link>
            </div>

            {/* Contact Support */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">
                Besoin d aide ?
              </p>
              <a
                href="tel:+212528820000"
                className="inline-flex items-center space-x-1 text-teal-600 hover:text-teal-700 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Contactez notre support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}