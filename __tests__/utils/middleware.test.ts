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

  it.each([['/mecas/write/123', '/mecas/write/123?cardId=123a', '/quiz', '/categories', '/mypage']])(
    '특정한 경로(인가가 필요한 페이지)[%s]로 요청했을 때 쿠키에 토큰이 없으면 루트로 rewrite 되어야 한다.',
    async (requestUrl: string) => {
      mockNextRequest.nextUrl.pathname = requestUrl;
      (mockNextRequest.cookies.get as jest.Mock).mockReturnValue('');
      const response = await middleware(mockNextRequest);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/401');
    },
  );

  it('인증되지 않은 사용자가 카드 상세 조회를 요청한다면 해당 카드 상세 조회 페이지로 그대로 응답한다..', async () => {
    const memberId = '01879c33-ebf3-6056-952f-d6d831d4b0bb';
    const cardId = '01879d27-361b-cbfb-c192-96fa68bc369b';
    const combinedUUID = combineUUID(memberId, cardId);
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue('');
    mockNextRequest.nextUrl.pathname = '/mecas/' + combinedUUID;
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
    const jwt =
      'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjAxODc5YzMzLWViZjMtNjA1Ni05NTJmLWQ2ZDgzMWQ0YjBiYiIsImV4cCI6MTY4MjAzOTI2MX0.5h4MeDu94mJIfNU3wvCODZYw1dWxJgrruFAkFdjNiYJlpwOm7WPBawo3Y76crwfrKXuo8D1LiDrc90Ys12l2Qg';
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue({ value: jwt });
    mockNextRequest.nextUrl.pathname = '/mecas/' + combinedUUID;
    const response = await middleware(mockNextRequest);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBeFalsy();
    expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/mecas/me/' + cardId);
  });

  it('myPage 요청 시 userpage로 rewrite 되어야 한다.', async () => {
    const memberId = '01879c33-ebf3-6056-952f-d6d831d4b0bb';
    const jwt =
      'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjAxODc5YzMzLWViZjMtNjA1Ni05NTJmLWQ2ZDgzMWQ0YjBiYiIsImV4cCI6MTY4MjAzOTI2MX0.5h4MeDu94mJIfNU3wvCODZYw1dWxJgrruFAkFdjNiYJlpwOm7WPBawo3Y76crwfrKXuo8D1LiDrc90Ys12l2Qg';
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue({ value: jwt });
    mockNextRequest.nextUrl.pathname = '/mypage';
    const response = await middleware(mockNextRequest);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBeFalsy();
    expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/user/me/' + memberId);
  });

  it('내 Category 목록 요청 시 해당 페이지로 rewrite 되어야 한다.', async () => {
    const memberId = '01879c33-ebf3-6056-952f-d6d831d4b0bb';
    const jwt =
      'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjAxODc5YzMzLWViZjMtNjA1Ni05NTJmLWQ2ZDgzMWQ0YjBiYiIsImV4cCI6MTY4MjAzOTI2MX0.5h4MeDu94mJIfNU3wvCODZYw1dWxJgrruFAkFdjNiYJlpwOm7WPBawo3Y76crwfrKXuo8D1LiDrc90Ys12l2Qg';
    (mockNextRequest.cookies.get as jest.Mock).mockReturnValue({ value: jwt });
    mockNextRequest.nextUrl.pathname = '/categories';
    const response = await middleware(mockNextRequest);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBeFalsy();
    expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/categories/me/' + memberId);
  });

  it.each([
    ['/mecas/me/abc123-abc123', '/user/me?abc=123', '/user/me', '/categories/me/ab1234-abc116', '/categories/me'],
  ])('Private Path에 직접 접근한다면 404 페이지로 rewrite된다.', async (requestUrl: string) => {
    mockNextRequest.nextUrl.pathname = requestUrl;
    const response = await middleware(mockNextRequest);
    expect(response.headers.get('x-middleware-next')).toBeFalsy();
    expect(response.headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/404');
  });

  it('meca 상세 조회 api 호출을 가로채 요청하고 응답 성공 시 리턴한다.', async () => {
    const memberId = '01893fe7-8924-bf6d-c795-2bcabe746db6';
    const cardId = '01879d27-361b-cbfb-c192-96fa68bc369b';
    const mockResponse = new Response(JSON.stringify({ body: 'body' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    mockNextRequest.nextUrl.pathname = `/api/v1/cards/${cardId}/share`;
    const response = await middleware(mockNextRequest);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('status', mockResponse.status);
    expect(response).toHaveProperty('headers', mockResponse.headers);
  });

  it('meca 상세 조회 api 호출을 가로채 요청하고 실패 시 revalidate api를 호출하고 응답한다.', async () => {
    const cardId = '01879d27-361b-cbfb-c192-96fa68bc369b';
    const mockMecaApiResponse = new Response(JSON.stringify({ message: 'error' }), {
      status: 403,
    });
    const mockRevalidateApiResponse = new Response('', {
      status: 200,
    });
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockMecaApiResponse)
      .mockResolvedValueOnce(mockRevalidateApiResponse);
    (mockNextRequest.headers.get as jest.Mock).mockReturnValue(cardId);
    mockNextRequest.nextUrl.pathname = `/api/v1/cards/${cardId}/share`;
    const response = await middleware(mockNextRequest);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(response).toHaveProperty('status', 400);
  });
});
