// pages/api/payment-request.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount } = req.body as { amount: number };   // centimes
  const MID      = process.env.CMI_MID!;
  const ORDERID  = 'CMD_' + Date.now();
  const CURRENCY = process.env.CMI_CURRENCY!;
  const KEY      = process.env.CMI_SHA1!;
  const SUCCESS  = process.env.SUCCESS_URL!;
  const FAILURE  = process.env.FAIL_URL!;

  // ➜ signature SHA-1 (pas HMAC)
  const signature = crypto
    .createHash('sha1')
    .update(MID + ORDERID + amount + CURRENCY + KEY)
    .digest('hex');

  const params = new URLSearchParams({
    MID: MID,
    ORDERID: ORDERID,
    AMOUNT: String(amount),
    CURRENCY: CURRENCY,
    LANGUAGE: 'fr',
    EMAIL: 'test@example.com',
    SIGNATURE: signature,
    URLOK: SUCCESS,
    URLKO: FAILURE,
  });

  // On renvoie l’URL finale
  res.status(200).json({
    paymentUrl: `${process.env.CMI_GATE}?${params.toString()}`
  });
}
