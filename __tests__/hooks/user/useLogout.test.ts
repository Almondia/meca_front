import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedPostLogoutApi } from '@/mock/api';
import { MOCK_MEMBER } from '@/mock/data';
import mockRouter from 'next-router-mock';

import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import { useSetRecoilState } from 'recoil';
import alertToast from '@/utils/toastHandler';

import useLogout from '@/hooks/user/useLogout';

jest.mock('recoil', () => ({
  useSetRecoilState: jest.fn(),
}));

jest.mock('@/atoms/common', () => ({
  hasAuthState: jest.fn(),
}));

jest.mock('@/utils/toastHandler', () => {
  return jest.fn();
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('useLogout', () => {
  const mockSetHasAuth = jest.fn();
  beforeEach(() => {
    implementServer([restHandler(mockedPostLogoutApi)]);
    (useSetRecoilState as jest.Mock).mockReturnValue(mockSetHasAuth);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logout 성공 시 회원 상태가 초기화된다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], MOCK_MEMBER);
    const { result } = renderHook(() => useLogout(), { wrapper: createQueryClientWrapper(queryClient) });
    await result.current.logout();
    expect(queryClient.getQueryData([queryKey.me])).toBeNull();
    expect(mockSetHasAuth).toHaveBeenCalledWith(false);
  });

  it('logout 성공 시 경로이동 정보가 있다면 해당 경로로 이동한다.', async () => {
    const { result } = renderHook(() => useLogout(), { wrapper: createQueryClientWrapper() });
    await result.current.logout('/path');
    expect(mockRouter.asPath).toEqual('/path');
  });

  it('logout 실패 시 error toast가 식별된다.', async () => {
    (alertToast as jest.Mock).mockReturnValueOnce(jest.fn());
    implementServer([restHandler(mockedPostLogoutApi, { status: 400 })]);
    const { result } = renderHook(() => useLogout(), { wrapper: createQueryClientWrapper() });
    await result.current.logout();
    expect(alertToast).toHaveBeenCalledWith('로그아웃 실패', 'warning');
  });
});
