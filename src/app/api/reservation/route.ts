import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const g = await fetch(process.env.NEXT_PUBLIC_GSCRIPT_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await g.json();
  return NextResponse.json(json, { status: json.status === 'success' ? 200 : 500 });
}
