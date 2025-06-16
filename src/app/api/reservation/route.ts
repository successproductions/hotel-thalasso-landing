import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const APPSCRIPT_URL = process.env.APPSCRIPT_URL!;

export async function POST(req: NextRequest) {
  const formData = await req.json();

  const res = await fetch(APPSCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const payload = await res.json();

  if (!res.ok || payload.status !== 'success') {
    return NextResponse.json(
      { error: payload.error || 'Apps Script error' },
      { status: 500 }
    );
  }


  return NextResponse.json({ success: true });
}
