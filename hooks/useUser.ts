import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import userApi from '@/apis/userApi';
import queryKey from '@/query/queryKey';

import useDetactToken from './useDetactToken';

const useUser = () => {
  const { hasToken } = useDetactToken();
  const queryClient = useQueryClient();
  const {
    data: user,
    refetch,
    isStale,
    isLoading,
  } = useQuery([queryKey.me], userApi.getMe, {
    enabled: false,
    staleTime: 30000,
  });

  useEffect(() => {
    if (!hasToken) {
      queryClient.removeQueries([queryKey.me]);
      return;
    }
    isStale && refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken, user]);

  return { user, isLoading };
};

export default useUser;
