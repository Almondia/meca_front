/**
 * @jest-environment node
 */
import { middleware } from '../../middleware';
import { NextRequest, NextResponse } from 'next/server';

describe('middleware', () => {
  const mockNextRequest = {
    cookies: {
      has: jest.fn(),
    },
    nextUrl: {
      pathname: '/',
      origin: 'http://localhost:3000',
    },
  } as unknown as NextRequest;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('특정한 경로(인가가 필요한 페이지)로 요청했을 때 쿠키에 토큰이 없으면 루트로 redirect 되어야 한다.', () => {
    mockNextRequest.nextUrl.pathname = '/me/categories';
    (mockNextRequest.cookies.has as jest.Mock).mockReturnValue(false);
    const response = middleware(mockNextRequest);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toEqual('http://localhost:3000/');
  });

  // TODO: router 추가 시 접근 테스트 케이스 추가
});
