'use client';
import { useState } from 'react';

interface PaymentModalProps {
  open: boolean;           // affiche / masque le modal
  amount: number;          // en centimes (ex. 10000 = 100 MAD)
  onClose: () => void;
}

export default function PaymentModal({ open, amount, onClose }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: ''
  });

  if (!open) return null;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      alert('Veuillez saisir une adresse email valide');
      return false;
    }
    
    return true;
  };

  async function pay() {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Call the correct API endpoint
      const res = await fetch('/api/payment/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount,
          customerInfo: {
            email: customerInfo.email,
            name: customerInfo.name,
            phone: customerInfo.phone || undefined
          }
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const { success, gateway, fields, orderId } = await res.json();

      if (!success) {
        throw new Error('Payment request failed');
      }

      console.log('Payment request successful:', { orderId, gateway });
      
      // Store order ID for tracking
      sessionStorage.setItem('currentOrderId', orderId);

      /* ----- Construction du formulaire POST vers CMI ----- */
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = gateway;
      form.style.display = 'none';

      // Add all CMI parameters as hidden inputs
      Object.entries(fields as Record<string, string>).forEach(([k, v]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = k;
        input.value = v;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit(); // navigateur → POST CMI

    } catch (err) {
      console.error('Payment error:', err);
      alert('Erreur de paiement, veuillez réessayer.');
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 grid place-items-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Paiement sécurisé CMI</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-lg">
            Montant : <strong className="text-teal-600">{(amount / 100).toFixed(2)} MAD</strong>
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="votre.email@exemple.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Prénom Nom"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="+212 6XX XXX XXX"
            />
          </div>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-blue-800">Paiement 100% sécurisé</span>
          </div>
        </div>

        <button
          onClick={pay}
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Redirection vers le paiement...' : `Payer ${(amount / 100).toFixed(2)} MAD`}
        </button>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-3 w-full text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}