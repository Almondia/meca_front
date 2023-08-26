import { NextRequest, NextResponse } from 'next/server';

import { UUID_PATTERN } from './utils/constants';
import { getJWTPayload } from './utils/jwtHandler';

const AUTH_PATHS = ['/write-card', '/quiz', '/me'] as const;
const PRIVATE_PATH_MATCHER = /[a-zA-Z0-9]+\/me/;
const MECA_PAGE_PATH_MATCHER = new RegExp(`^\\/meca\\/${UUID_PATTERN}/${UUID_PATTERN}$`, 'i');

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const accessToken = cookies.get('accessToken')?.value ?? '';
  const userId = getJWTPayload(accessToken, 'id');
  const { pathname, origin } = request.nextUrl;

  if (pathname.match(MECA_PAGE_PATH_MATCHER)) {
    const [, , cardId, memberId] = pathname.split('/');
    return cardId && memberId === userId
      ? NextResponse.rewrite(new URL(`/meca/${cardId}/me`, origin))
      : NextResponse.next();
  }

  if (pathname === '/category') {
    const query = request.nextUrl.search || '';
    return userId
      ? NextResponse.rewrite(new URL(`/category/me${query}`, origin))
      : NextResponse.rewrite(new URL('/401', origin));
  }

  if (pathname.match(PRIVATE_PATH_MATCHER)) {
    return NextResponse.rewrite(new URL('/404', origin));
  }

  if (!accessToken && AUTH_PATHS.some((path) => pathname.indexOf(path) !== -1)) {
    return NextResponse.rewrite(new URL('/401', origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/meca/:path/:path*',
    '/:path*/write-card/:path*',
    '/quiz',
    '/me',
    '/category',
    '/category/me',
    '/meca/:path/me',
  ],
};
