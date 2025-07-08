import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { amount } = await req.json();          // centimes
  const MID      = process.env.CMI_MID!;
  const ORDERID  = 'CMD_' + Date.now();
  const CURRENCY = process.env.CMI_CURRENCY!;
  const KEY      = process.env.CMI_SHA1!;

  const signature = crypto
    .createHash('sha1')
    .update(MID + ORDERID + amount + CURRENCY + KEY)
    .digest('hex');

  const params = new URLSearchParams({
    MID,
    ORDERID,
    AMOUNT: String(amount),
    CURRENCY,
    LANGUAGE: 'fr',
    SIGNATURE: signature,
    URLOK: process.env.SUCCESS_URL!,
    URLKO: process.env.FAIL_URL!,
  });

  return NextResponse.json({
    paymentUrl: `${process.env.CMI_GATE}?${params.toString()}`,
  });
}
