import { NextResponse } from 'next/server';

const GSCRIPT_URL = process.env.NEXT_PUBLIC_GSCRIPT_URL!; 

export async function POST(req: Request) {
  try {

    const payload = await req.json();

   
    const googleRes = await fetch(GSCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    
    const googleJson = await googleRes.json();

    const status = googleJson.status === 'success' ? 200 : 500;
    return NextResponse.json(googleJson, { status });
  } catch (err: unknown) {
    return NextResponse.json(
      { status: 'error', error: (err as Error).message },
      { status: 500 }
    );
  }
}
