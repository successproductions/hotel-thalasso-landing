import { NextResponse } from 'next/server';
import { env } from '@/env';

export async function POST(req: Request) {
  const data = await req.json();
  const response = await fetch(env.GSCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return NextResponse.json(json, { status: json.status === 'success' ? 200 : 500 });
}
