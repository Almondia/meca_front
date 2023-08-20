import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { setAccessToken } from '@/apis/config/instance';
import userApi from '@/apis/userApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

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
    async () => {
      const result = await userApi.getMeFromServer().then((res) => (res.accessToken ? res : null));
      return result;
    },
    {
      enabled: true,
      staleTime: 600000,
      cacheTime: Infinity,
      onError: () => {
        queryClient.setQueryData([queryKey.me], null);
        router.replace('/');
      },
    },
  );

  useEffect(() => {
    if (user && user.accessToken) {
      const token = user.accessToken;
      setAccessToken(token);
      setHasAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { user, isLoading, isFetching };
};

useUser.fetchQuery = (accessToken: string, queryClient: QueryClient) =>
  queryClient.fetchQuery([queryKey.me], () => userApi.getMe().then((res) => ({ ...res, accessToken })));

export default useUser;
