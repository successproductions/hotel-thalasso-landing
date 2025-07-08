// pages/api/payment-callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { MID, ORDERID, AMOUNT, CURRENCY, RESPONSECODE, SIGNATURE } = req.query as Record<string,string>;

  const KEY = process.env.CMI_SHA1!;
  const expected = crypto
    .createHash('sha1')
    .update(MID + ORDERID + AMOUNT + CURRENCY + KEY)
    .digest('hex');

  if (expected !== SIGNATURE) return res.status(400).send('Signature invalide');

  const ok = RESPONSECODE === '00';
  res.redirect(ok ? `/success?order=${ORDERID}` : `/failure?order=${ORDERID}`);
}
