import { NextRequest, NextResponse } from 'next/server';

import { getJWTPayload } from './utils/jwtHandler';
import { extractCombinedUUID } from './utils/uuidHandler';

const AUTH_PATHS = ['/write', '/quiz', '/mypage'] as const;

const PRIVATE_PATH_MATCHER = /\/[a-z]+\/me\//;

function getCurrentUserMecaId(token: string, pathname: string) {
  const combinedUUId = pathname.split('/')[2];
  const { uuid1: memberId, uuid2 } = extractCombinedUUID(combinedUUId);
  if (memberId && getJWTPayload(token, 'id') === memberId) {
    return uuid2;
  }
  return undefined;
}

/*
  redirect() - Returns a NextResponse with a redirect set
  rewrite() - Returns a NextResponse with a rewrite set
  next() - Returns a NextResponse that will continue the middleware chain
  - reference: 'https://nextjs.org/docs/api-reference/next/server'
 */
export function middleware(request: NextRequest) {
  const { cookies } = request;
  const accessToken = cookies.get('accessToken')?.value ?? '';

  if (request.nextUrl.pathname.match(PRIVATE_PATH_MATCHER)) {
    return NextResponse.rewrite(new URL('/404', request.nextUrl.origin));
  }

  if (!accessToken && AUTH_PATHS.some((path) => request.nextUrl.pathname.indexOf(path) !== -1)) {
    return NextResponse.rewrite(new URL('/401', request.nextUrl.origin));
  }

  if (request.nextUrl.pathname.startsWith('/mecas/')) {
    const requestId = getCurrentUserMecaId(accessToken, request.nextUrl.pathname);
    return requestId
      ? NextResponse.rewrite(new URL(`/mecas/me/${requestId}`, request.nextUrl.origin))
      : NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/mypage')) {
    const userId = getJWTPayload(accessToken, 'id');
    return userId
      ? NextResponse.rewrite(new URL(`/user/me/${userId}`, request.nextUrl.origin))
      : NextResponse.rewrite(new URL('/401', request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/mecas/:path*', '/:path*/write/:path*', '/quiz', '/mypage', '/:path/me/:path*'],
};
