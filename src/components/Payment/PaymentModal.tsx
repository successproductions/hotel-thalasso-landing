// components/PaymentModal.tsx
'use client'

import React, { useEffect, useState } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  amount: number
  onClose: () => void
}

export function PaymentModal({ isOpen, amount, onClose }: PaymentModalProps) {
  const [paymentUrl, setPaymentUrl] = useState<string>('')

  useEffect(() => {
    if (!isOpen) return
    // call our Next.js API route to generate the CMI payment URL
    fetch('/api/payment-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setPaymentUrl(data.paymentUrl))
      .catch(console.error)
  }, [isOpen, amount])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl leading-none"
        >
          &times;
        </button>

        {!paymentUrl ? (
          <p>Loading payment...</p>
        ) : (
          <iframe
            src={paymentUrl}
            className="w-full h-80 border-none"
            title="CMI Payment"
          />
        )}
      </div>
    </div>
  )
}
