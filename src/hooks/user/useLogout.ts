import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import userApi from '@/apis/userApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

const useLogout = () => {
  const queryClient = useQueryClient();
  const setHasAuth = useSetRecoilState(hasAuthState);
  const router = useRouter();

  const logout = useCallback(async (pushUrl?: string) => {
    try {
      await userApi.logout();
      pushUrl && (await router.push(pushUrl));
      queryClient.setQueriesData([queryKey.me], null);
      setHasAuth(false);
    } catch {
      alertToast('로그아웃 실패', 'warning');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { logout };
};

export default useLogout;
