import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const localePattern = /^\/(fr|en)(\/|$)/
  if (localePattern.test(request.nextUrl.pathname)) return


  const url = request.nextUrl.clone()
  url.pathname = `/fr${request.nextUrl.pathname}`
  return NextResponse.redirect(url)
}
export const config = { matcher: ['/((?!_next).*)'] }
