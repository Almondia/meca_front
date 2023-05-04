import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import userApi from '@/apis/userApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

const useLogout = () => {
  const queryClient = useQueryClient();
  const setHasAuth = useSetRecoilState(hasAuthState);
  const router = useRouter();
  const logout = useCallback(async (pushUrl?: string) => {
    const { deleted } = await userApi.logout();
    if (deleted) {
      queryClient.setQueryData([queryKey.me], null);
      setHasAuth(false);
      pushUrl && router.push(pushUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { logout };
};

export default useLogout;
