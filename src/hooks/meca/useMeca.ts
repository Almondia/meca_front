import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

const useMeca = (cardId: string, shared?: boolean, memberId?: string) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const queryClient = useQueryClient();
  const { data, isError } = useQuery(
    [queryKey.meca, cardId],
    async () => (shared ? mecaApi.getSharedCardById(cardId, memberId) : mecaApi.getMyCardById(cardId)),
    {
      enabled: !!cardId && (shared ? true : hasAuth),
      staleTime: 5,
      onError: () => {
        if (shared) {
          queryClient.setQueryData([queryKey.meca, cardId], undefined);
        }
      },
    },
  );
  const meca = isError ? undefined : data;
  return { meca, isError };
};

useMeca.fetchQuery = (shared: boolean, cardId: string, queryClient: QueryClient) => {
  if (shared) {
    return queryClient.fetchQuery([queryKey.meca, cardId], () => mecaApi.getSharedCardById(cardId));
  }
  return queryClient.fetchQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId));
};

export default useMeca;
