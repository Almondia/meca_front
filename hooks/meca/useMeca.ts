import { useQuery } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';

const useMeca = (cardId: string) => {
  const { data: meca, isLoading, isSuccess } = useQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId));

  return { meca, isSuccess, isLoading };
};

export default useMeca;
