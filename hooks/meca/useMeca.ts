import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import { hasAuthState } from '@/atoms/common';

const useMeca = (cardId?: string) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const {
    data: meca,
    isLoading,
    isSuccess,
    isError,
  } = useQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId as string), {
    enabled: hasAuth && !!cardId,
    onError: () => {
      //
    },
  });

  return { meca, isSuccess, isLoading, isError };
};

export default useMeca;
