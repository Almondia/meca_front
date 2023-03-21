import { NextRequest, NextResponse } from 'next/server';

/*
  redirect() - Returns a NextResponse with a redirect set
  rewrite() - Returns a NextResponse with a rewrite set
  next() - Returns a NextResponse that will continue the middleware chain
  - reference: 'https://nextjs.org/docs/api-reference/next/server'
 */
export function middleware(request: NextRequest) {
  const { cookies } = request;
  if (cookies.has('accessToken')) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/me/:path*', '/write/:path*'],
};
