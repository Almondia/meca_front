import { QueryClient, useQuery } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';

interface MecaCheckValidType {
  count: number;
  shared: boolean;
  cached: boolean;
}

const useMecaCheckValid = (categoryId: string) => {
  const fallback: MecaCheckValidType = { count: -1, shared: false, cached: false };
  const { data: mecaCount = fallback } = useQuery(
    [queryKey.mecas, categoryId, 'count'],
    () => mecaApi.getCountByCategoryId(categoryId),
    {
      select: (data) => ({ ...data, cached: true }),
    },
  );
  return { mecaCount };
};

useMecaCheckValid.checkValid = (categoryId: string, queryClient: QueryClient) =>
  queryClient.fetchQuery([queryKey.mecas, categoryId, 'count'], () => mecaApi.getCountByCategoryId(categoryId));

export default useMecaCheckValid;
