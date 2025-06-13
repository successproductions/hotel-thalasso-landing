import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If the request already includes `/fr` or `/en`, let it through
  const localePattern = /^\/(fr|en)(\/|$)/
  if (localePattern.test(request.nextUrl.pathname)) return

  // Otherwise redirect to preferred language (here: “fr”, change as needed)
  const url = request.nextUrl.clone()
  url.pathname = `/fr${request.nextUrl.pathname}`
  return NextResponse.redirect(url)
}
export const config = { matcher: ['/((?!_next|favicon.ico).*)'] }
