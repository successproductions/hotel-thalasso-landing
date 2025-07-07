// pages/api/payment-request.ts
import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { amount } = req.body as { amount: number }
  const merchantId  = process.env.CMI_MERCHANT_ID!
  const secretKey   = process.env.CMI_SECRET_KEY!
  const invoiceId   = Date.now().toString()
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment-callback`

  // replicate PHP’s signature logic: merchantId|invoiceId|amount|currency
  const raw = `${merchantId}|${invoiceId}|${amount}|MAD`
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(raw)
    .digest('hex')

  // build the payment request URL
  const paymentUrl = new URL('https://test.cmi.co.ma/portail/payment_request')
  paymentUrl.searchParams.set('merchant_id',   merchantId)
  paymentUrl.searchParams.set('invoice_id',    invoiceId)
  paymentUrl.searchParams.set('amount',        amount.toString())
  paymentUrl.searchParams.set('currency',      'MAD')
  paymentUrl.searchParams.set('callback_url',  callbackUrl)
  paymentUrl.searchParams.set('signature',     signature)

  return res.status(200).json({ paymentUrl: paymentUrl.toString() })
}
