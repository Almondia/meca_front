import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

const useLogout = () => {
  const queryClient = useQueryClient();
  const setHasAuth = useSetRecoilState(hasAuthState);
  const router = useRouter();
  const logout = useCallback(async () => {
    const { data } = await axios.get('/api/logout');
    if (data.deleted) {
      queryClient.setQueryData([queryKey.me], null);
      setHasAuth(false);
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { logout };
};

export default useLogout;
