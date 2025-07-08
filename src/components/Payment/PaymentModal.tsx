'use client';
import { useState } from 'react';

interface PaymentModalProps {
  open: boolean;           // affiche / masque le modal
  amount: number;          // en centimes (ex. 10000 = 100 MAD)
  onClose: () => void;
}

export default function PaymentModal({ open, amount, onClose }: PaymentModalProps) {
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
      if (!res.ok) throw new Error('API error');
      const { gateway, fields } = await res.json();

      /* ----- Construction du formulaire POST vers CMI ----- */
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = gateway;
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
      console.error(err);
      alert('Erreur de paiement, veuillez réessayer.');
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 grid place-items-center bg-black/50 z-50">
      <div className="bg-white rounded p-8 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Paiement sécurisé CMI</h2>

        <p className="mb-6">
          Montant&nbsp;: <strong>{(amount / 100).toFixed(2)} MAD</strong>
        </p>

        <button
          onClick={pay}
          disabled={loading}
          className="w-full bg-amber-700 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? 'Redirection…' : 'Payer maintenant'}
        </button>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-4 w-full text-sm underline"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
