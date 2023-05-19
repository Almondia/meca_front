/**
 * @jest-environment node
 */
import { middleware } from '../../middleware';
import { NextRequest, NextResponse } from 'next/server';
import { combineUUID } from '@/utils/uuidHandler';

describe('middleware', () => {
  const mockNextRequest = {
    cookies: {
      get: jest.fn(),
    },
    nextUrl: {
      pathname: '/',
      origin: 'http://localhost:3000',
    },
  } as unknown as NextRequest;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([['/mecas/write/123', '/mecas/write/123?cardId=123a', '/quiz', '/categories']])(
    '특정한 경로(인가가 필요한 페이지)[%s]로 요청했을 때 쿠키에 토큰이 없으면 루트로 rewrite 되어야 한다.',
    (requestUrl: string) => {
      mockNextRequest.nextUrl.pathname = requestUrl;
      (mockNextRequest.cookies.get as jest.Mock).mockReturnValue('');
      const response = middleware(mockNextRequest);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/401');
    },
  );

  it('인증되지 않은 사용자가 카드 상세 조회를 요청한다면 해당 카드 상세 조회 페이지로 그대로 응답한다..', () => {
    const memberId = '01879c33-ebf3-6056-952f-d6d831d4b0bb';
    const cardId = '01879d27-361b-cbfb-c192-96fa68bc369b';
    const combinedUUID = combineUUID(memberId, cardId);
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue('');
    mockNextRequest.nextUrl.pathname = '/mecas/' + combinedUUID;
    const response = middleware(mockNextRequest);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-rewrite')).toBeFalsy();
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });
});
