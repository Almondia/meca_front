import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import userApi from '@/apis/userApi';
import queryKey from '@/query/queryKey';

const useUser = (hasToken: boolean) => {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isFetching,
    isStale,
    refetch,
  } = useQuery([queryKey.me], userApi.getMe, {
    enabled: false,
    staleTime: 30000,
  });

  useEffect(() => {
    if (!hasToken && user === undefined) {
      return;
    }
    if (!hasToken) {
      queryClient.setQueryData([queryKey.me], null);
      return;
    }
    isStale && refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken, user, isStale]);

  return { user, isLoading, isFetching };
};

export default useUser;
