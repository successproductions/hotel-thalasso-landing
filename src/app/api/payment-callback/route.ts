import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const MID        = searchParams.get('MID')!;
  const ORDERID    = searchParams.get('ORDERID')!;
  const AMOUNT     = searchParams.get('AMOUNT')!;
  const CURRENCY   = searchParams.get('CURRENCY')!;
  const SIGNATURE  = searchParams.get('SIGNATURE')!;
  const RESPONSE   = searchParams.get('RESPONSECODE')!; // "00" = OK

  const expected = crypto
    .createHash('sha1')
    .update(MID + ORDERID + AMOUNT + CURRENCY + process.env.CMI_SHA1!)
    .digest('hex');

  const ok = expected === SIGNATURE && RESPONSE === '00';
  const target = ok ? process.env.SUCCESS_URL! : process.env.FAIL_URL!;

  return NextResponse.redirect(`${target}?order=${ORDERID}`, 302);
}
