import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import useUser from '@/hooks/user/useUser';
import { MOCK_MEMBER } from '@/mock/data';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedGetUserWithServerApi } from '@/mock/api';
import { useSetRecoilState } from 'recoil';

jest.mock('recoil', () => ({
  useSetRecoilState: jest.fn(),
}));

jest.mock('@/atoms/common', () => ({
  hasAuthState: jest.fn(),
}));

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('useUser', () => {
  const setHasAuth = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('회원에 대한 정보가 조회 된다.', async () => {
    implementServer([restHandler(mockedGetUserWithServerApi)]);
    (useSetRecoilState as jest.Mock).mockReturnValue(setHasAuth);
    const { result } = renderHook(() => useUser(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.user).toEqual(MOCK_MEMBER);
    });
    expect(setHasAuth).toHaveBeenCalledWith(true);
  });

  it('회원에 대한 정보 조회 실패 시 메인페이지로 이동된다.', async () => {
    await mockRouter.push('/me');
    implementServer([restHandler(mockedGetUserWithServerApi, { status: 400 })]);
    const { result } = renderHook(() => useUser(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.user).toEqual(null);
    });
    expect(mockRouter.asPath).toEqual('/');
  });

  it('회원 조회에서 토큰 정보를 얻지 못한 경우 회원 상태는 null 처리 된다.', async () => {
    implementServer([restHandler(() => mockedGetUserWithServerApi({ ...MOCK_MEMBER, accessToken: '' }))]);
    (useSetRecoilState as jest.Mock).mockReturnValue(setHasAuth);
    const { result } = renderHook(() => useUser(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.user).toEqual(null);
    });
    expect(setHasAuth).not.toHaveBeenCalled();
  });
});
