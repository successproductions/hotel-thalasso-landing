'use client';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  amount: number;   // en centimes
};
export default function PaymentModal({ open, onClose, amount }: Props) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function pay() {
    setLoading(true);
    try {
      const res = await fetch('/api/payment-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const { paymentUrl } = await res.json();
      window.location.href = paymentUrl;            // redirection CMI
    } catch (e) {
      console.error(e);
      alert('Erreur de paiement.');                 // à personnaliser
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 grid place-items-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Paiement sécurisé CMI</h2>

        <p className="mb-6">Montant : {(amount / 100).toFixed(2)} MAD</p>

        <button
          onClick={pay}
          disabled={loading}
          className="w-full bg-amber-700 text-white py-3 rounded disabled:opacity-50">
          {loading ? 'Redirection…' : 'Payer maintenant'}
        </button>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-4 w-full text-sm underline">
          Annuler
        </button>
      </div>
    </div>
  );
}
