/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from 'next/server';
import { combineUUID } from '@/utils/uuidHandler';
import { middleware } from '@/middleware';

jest.unmock('@/utils/jwtHandler');

describe('middleware', () => {
  const mockNextRequest = {
    cookies: {
      get: jest.fn(),
    },
    nextUrl: {
      pathname: '/',
      origin: 'http://localhost:3000',
    },
    headers: {
      get: jest.fn(),
    },
  } as unknown as NextRequest;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const jwt =
    'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjAxODc5YzMzLWViZjMtNjA1Ni05NTJmLWQ2ZDgzMWQ0YjBiYiIsImV4cCI6MTY4MjAzOTI2MX0.5h4MeDu94mJIfNU3wvCODZYw1dWxJgrruFAkFdjNiYJlpwOm7WPBawo3Y76crwfrKXuo8D1LiDrc90Ys12l2Qg';

  it.each([['/category/123/write-card', '/quiz', '/category', '/me']])(
    '특정한 경로(인가가 필요한 페이지)[%s]로 요청했을 때 쿠키에 토큰이 없으면 401page로 rewrite 되어야 한다.',
    async (requestUrl: string) => {
      mockNextRequest.nextUrl.pathname = requestUrl;
      (mockNextRequest.cookies.get as jest.Mock).mockReturnValue('');
      const response = await middleware(mockNextRequest);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/401');
    },
  );

  it.each([['/category/123/write-card', '/quiz', '/category', '/me']])(
    '특정한 경로(인가가 필요한 페이지)[%s]로 요청했을 때 쿠키에 토큰이 있다면 그대로 응답한다.',
    async (requestUrl: string) => {
      mockNextRequest.nextUrl.pathname = requestUrl;
      (mockNextRequest.cookies.get as jest.Mock).mockReturnValue({ value: jwt });
      const response = await middleware(mockNextRequest);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-rewrite')).toBeFalsy();
      expect(response.headers.get('x-middleware-next')).toBe('1');
    },
  );

  it('인증되지 않은 사용자가 카드 상세 조회를 요청한다면 해당 카드 상세 조회 페이지로 그대로 응답한다..', async () => {
    const memberId = '01879c33-ebf3-6056-952f-d6d831d4b0bb';
    const cardId = '01879d27-361b-cbfb-c192-96fa68bc369b';
    const combinedUUID = combineUUID(memberId, cardId);
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue('');
    mockNextRequest.nextUrl.pathname = '/meca/' + combinedUUID;
    const response = await middleware(mockNextRequest);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-rewrite')).toBeFalsy();
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });

  it('본인의 카드 상세 조회를 요청한다면 본인 카드 상세 조회 페이지로 rewrite 되어야 한다.', async () => {
    const memberId = '01879c33-ebf3-6056-952f-d6d831d4b0bb';
    const cardId = '01879d27-361b-cbfb-c192-96fa68bc369b';
    const combinedUUID = combineUUID(memberId, cardId);
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue({ value: jwt });
    mockNextRequest.nextUrl.pathname = '/meca/' + combinedUUID;
    const response = await middleware(mockNextRequest);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBeFalsy();
    expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/meca/' + cardId + '/me');
  });

  it('Category Page 요청 시 해당 페이지로 rewrite 되어야 한다.', async () => {
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue({ value: jwt });
    mockNextRequest.nextUrl.pathname = '/category';
    const response = await middleware(mockNextRequest);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBeFalsy();
    expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/category/me');
  });

  it('Category Page 요청 시 토큰이 없다면 401 페이지로 rewrite된다.', async () => {
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue('');
    mockNextRequest.nextUrl.pathname = '/category';
    const response = await middleware(mockNextRequest);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/401');
  });

  it.each([['/meca/abc123/me', '/category/me']])(
    'Private Path에 직접 접근한다면 404 페이지로 rewrite된다.',
    async (requestUrl: string) => {
      mockNextRequest.nextUrl.pathname = requestUrl;
      const response = await middleware(mockNextRequest);
      expect(response.headers.get('x-middleware-next')).toBeFalsy();
      expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/404');
    },
  );
});
