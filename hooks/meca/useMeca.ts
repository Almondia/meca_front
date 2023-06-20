import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';
import { MecaType, UserProfile } from '@/types/domain';

const useMeca = (cardId: string, shared?: boolean) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const router = useRouter();

  const { data, isLoading, isSuccess, isError } = useQuery(
    [queryKey.meca, cardId],
    shared ? () => mecaApi.getSharedCardById(cardId) : () => mecaApi.getMyCardById(cardId),
    {
      enabled: !!cardId && (shared ? true : hasAuth),
      onError: () => {
        (async () => {
          if (shared) {
            const { default: utilApi } = await import('@/apis/utilApi');
            utilApi.revalidate([router.asPath]);
          }
        })();
      },
    },
  );
  const meca: (typeof shared extends boolean ? MecaType & UserProfile : MecaType) | undefined = data;
  return { meca, isSuccess, isLoading, isError };
};

export default useMeca;
