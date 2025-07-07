// pages/api/payment-callback.ts
import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { invoice_id, amount, currency, status, signature } = req.query as Record<string,string>
  const secretKey = process.env.CMI_SECRET_KEY!

  // re-compute signature to verify
  const raw = `${invoice_id}|${amount}|${currency}|${status}`
  const expected = crypto.createHmac('sha256', secretKey).update(raw).digest('hex')

  if (signature !== expected) {
    return res.status(400).send('Invalid signature')
  }

  // redirect based on status
  if (status === 'OK') {
    return res.redirect(`/success?invoice=${invoice_id}`)
  } else {
    return res.redirect(`/failure?invoice=${invoice_id}`)
  }
}
