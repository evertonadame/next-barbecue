import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasValidToken = request.cookies.has("__session");

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  if (!hasValidToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }


  if (hasValidToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAuthPage) {
    return;
  }

  return NextResponse.next();

}

export const config = {
  matcher: ['/api/:path*', '/', '/auth/:path*', '/sign-in', '/sign-up'],
};
