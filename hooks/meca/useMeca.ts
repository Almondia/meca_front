import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';
import { MecaType, UserProfile } from '@/types/domain';

const useMeca = (cardId: string, shared?: boolean, memberId?: string) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, isError } = useQuery(
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
  const meca: (typeof shared extends boolean ? MecaType & UserProfile : MecaType) | undefined = isError
    ? undefined
    : data;
  return { meca, isSuccess, isLoading, isError };
};

export default useMeca;
