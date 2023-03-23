import { useRouter } from 'next/router';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import queryKey from '@/query/queryKey';
import { setAccessToken } from '@/apis/config/instance';
import { MyProfile } from '@/types/domain';
import { hasAuthState } from '@/atoms/common';

const useUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setHasAuth = useSetRecoilState(hasAuthState);
  const {
    data: user,
    isLoading,
    isFetching,
    isFetched,
    refetch,
  } = useQuery(
    [queryKey.me],
    () =>
      axios.get<any, AxiosResponse<MyProfile>>('/api/user').then((res) => {
        const accessToken = res.headers['access-token'];
        accessToken && setAccessToken(accessToken);
        return res.data;
      }),
    {
      enabled: true,
      staleTime: 30000,
      onSuccess: (data) => {
        data && setHasAuth(true);
      },
      onError: () => {
        queryClient.setQueryData([queryKey.me], null);
        router.replace('/');
      },
    },
  );

  useEffect(() => {
    if (isFetched) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isLoading, isFetching };
};

export default useUser;
