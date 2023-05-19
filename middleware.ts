import { NextRequest, NextResponse } from 'next/server';

const authorizedPaths = ['/write', '/quiz', '/mypage'];

/*
  redirect() - Returns a NextResponse with a redirect set
  rewrite() - Returns a NextResponse with a rewrite set
  next() - Returns a NextResponse that will continue the middleware chain
  - reference: 'https://nextjs.org/docs/api-reference/next/server'
 */
export function middleware(request: NextRequest) {
  const { cookies } = request;
  const accessToken = cookies.get('accessToken')?.value ?? '';
  if (!accessToken && authorizedPaths.some((path) => request.nextUrl.pathname.indexOf(path) !== -1)) {
    return NextResponse.rewrite(new URL('/401', request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*/write/:path*', '/quiz', '/mypage/:path*'],
};
