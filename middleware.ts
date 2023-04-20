import { NextRequest, NextResponse } from 'next/server';

import { getJWTPayload } from './utils/jwtHandler';
import { extractCombinedUUID } from './utils/uuidHandler';

const authorizedPaths = ['/write', '/quiz', '/mypage', '/categories'];

function isMyMecaRequest(token: string, pathname: string) {
  if (!pathname.startsWith('/mecas')) {
    return undefined;
  }
  const combinedUUId = pathname.replace('/mecas/', '');
  const { uuid1: memberId, uuid2: cardId } = extractCombinedUUID(combinedUUId);
  if (memberId && getJWTPayload(token).id === memberId) {
    return cardId;
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
  const cardId = isMyMecaRequest(accessToken, request.nextUrl.pathname);
  if (cardId) {
    return NextResponse.rewrite(new URL(`/mecas/me/${cardId}`, request.nextUrl.origin));
  }
  if (!accessToken && authorizedPaths.some((path) => request.nextUrl.pathname.indexOf(path) !== -1)) {
    return NextResponse.rewrite(new URL('/401', request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/mecas/:path*', '/:path*/write/:path*', '/quiz', '/mypage/:path*', '/categories'],
};
