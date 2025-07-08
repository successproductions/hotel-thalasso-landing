import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 *  GET  /api/payment-callback   (appelé par CMI)
 *  Vérifie la signature, redirige /success ou /failure
 */
export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;

  const MID   = sp.get('MID')!;
  const ORDER = sp.get('ORDERID')!;
  const AMT   = sp.get('AMOUNT')!;
  const CURR  = sp.get('CURRENCY')!;
  const SIGN  = sp.get('SIGNATURE')!;
  const RESP  = sp.get('RESPONSECODE')!;     

  const expected = crypto
    .createHash('sha1')
    .update(MID + ORDER + AMT + CURR + process.env.CMI_SHA1!)
    .digest('hex');

  const ok = expected === SIGN && RESP === '00';
  const target = ok ? process.env.SUCCESS_URL! : process.env.FAIL_URL!;
  return NextResponse.redirect(`${target}?order=${ORDER}`, 302);
}
