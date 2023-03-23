import { NextRequest, NextResponse } from 'next/server';

/*
  redirect() - Returns a NextResponse with a redirect set
  rewrite() - Returns a NextResponse with a rewrite set
  next() - Returns a NextResponse that will continue the middleware chain
  - reference: 'https://nextjs.org/docs/api-reference/next/server'
 */
export function middleware(request: NextRequest) {
  const { cookies } = request;
  if (!cookies.has('accessToken') && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
  if (cookies.has('accessToken') && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/me/categories', request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/me/:path*', '/write/:path*', '/'],
};
