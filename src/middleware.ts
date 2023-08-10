import { NextRequest, NextResponse } from 'next/server';

import { UUID_PATTERN } from './utils/constants';
import { getJWTPayload } from './utils/jwtHandler';
import { combineUUID, extractCombinedUUID } from './utils/uuidHandler';

const AUTH_PATHS = ['/write', '/quiz', '/mypage'] as const;

const PRIVATE_PATH_MATCHER = /\/[a-z]+\/me\//;
const SHARED_MECA_API_PATH_MATCHER = new RegExp(`^\\/api/v1/cards\\/${UUID_PATTERN}/share`, 'i');
const MECA_LIST_PAGE_PATH_MATCHER = new RegExp(`^\\/mecas\\/${UUID_PATTERN}-${UUID_PATTERN}$`, 'i');

function getCurrentUserMecaId(pathname: string, payloadUserId?: string) {
  const combinedUUId = pathname.split('/')[2];
  const { uuid1: memberId, uuid2 } = extractCombinedUUID(combinedUUId);
  if (memberId && payloadUserId === memberId) {
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
export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const accessToken = cookies.get('accessToken')?.value ?? '';
  const { pathname, origin } = request.nextUrl;
  if (pathname.match(PRIVATE_PATH_MATCHER)) {
    return NextResponse.rewrite(new URL('/404', origin));
  }

  if (!accessToken && AUTH_PATHS.some((path) => pathname.indexOf(path) !== -1)) {
    return NextResponse.rewrite(new URL('/401', origin));
  }

  const userId = getJWTPayload(accessToken, 'id');

  if (pathname.match(MECA_LIST_PAGE_PATH_MATCHER)) {
    const requestId = getCurrentUserMecaId(pathname, userId);
    return requestId ? NextResponse.rewrite(new URL(`/mecas/me/${requestId}`, origin)) : NextResponse.next();
  }

  if (pathname.startsWith('/mypage')) {
    return userId
      ? NextResponse.rewrite(new URL(`/user/me/${userId}`, origin))
      : NextResponse.rewrite(new URL('/401', origin));
  }

  if (pathname === '/categories') {
    const query = request.nextUrl.search || '';
    return userId
      ? NextResponse.rewrite(new URL(`/categories/me/${userId}${query}`, origin))
      : NextResponse.rewrite(new URL('/401', origin));
  }

  if (pathname.match(SHARED_MECA_API_PATH_MATCHER)) {
    const sharedCardResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + pathname);
    const xUserHeader = request.headers.get('x-user');
    const sharedCard = await sharedCardResponse.json();
    if (!sharedCardResponse.ok) {
      xUserHeader &&
        fetch(`${process.env.NEXT_ORIGIN}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`, {
          method: 'POST',
          body: JSON.stringify({
            type: 'public',
            urls: [`/mecas/${combineUUID(xUserHeader, pathname.split('/')[4])}`],
          }),
          headers: {
            'content-type': 'application/json',
          },
        });
      return new NextResponse(JSON.stringify({ ...sharedCard, status: 400 }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new NextResponse(JSON.stringify(sharedCard), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/mecas/:path*',
    '/:path*/write/:path*',
    '/quiz',
    '/mypage',
    '/:path/me/:path*',
    '/categories',
    '/api/v1/cards/:cardId/share',
  ],
};
