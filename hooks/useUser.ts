import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import { setAccessToken } from '@/apis/config/instance';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';
import { MyProfile } from '@/types/domain';

const useUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setHasAuth = useSetRecoilState(hasAuthState);
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery(
    [queryKey.me],
    () => axios.get<never, MyProfile>('/api/user').then((res) => (res.accessToken ? res : null)),
    {
      enabled: true,
      staleTime: 30000,
      onError: () => {
        queryClient.setQueryData([queryKey.me], null);
        router.replace('/');
      },
    },
  );
  useEffect(() => {
    if (user && user.accessToken) {
      setAccessToken(user.accessToken);
      setHasAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { user, isLoading, isFetching };
};

export default useUser;
