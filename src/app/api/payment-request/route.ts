import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 *  POST  /api/payment-request
 *  Body : { amount: number }  // centimes
 *  Répond : { gateway, fields } pour construire le <form> vers CMI
 */
export async function POST(req: NextRequest) {
  const { amount } = await req.json() as { amount: number };

  const MID      = process.env.CMI_MID!;
  const ORDERID  = 'CMD_' + Date.now();
  const CURRENCY = process.env.CMI_CURRENCY!;
  const KEY      = process.env.CMI_SHA1!;

  /* SHA-1 (pas HMAC) : MID + ORDERID + AMOUNT + CURRENCY + KEY */
  const signature = crypto
    .createHash('sha1')
    .update(MID + ORDERID + amount + CURRENCY + KEY)
    .digest('hex');

  return NextResponse.json({
    gateway: process.env.CMI_GATE!,            // ex. https://testpayment.cmi.co.ma/fim/est3Dgate
    fields: {
      MID,
      ORDERID,
      AMOUNT: String(amount),
      CURRENCY,
      LANGUAGE: 'fr',
      SIGNATURE: signature,
      URLOK: process.env.SUCCESS_URL!,
      URLKO: process.env.FAIL_URL!,
    },
  });
}
