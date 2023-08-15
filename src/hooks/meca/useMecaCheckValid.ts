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

useMecaCheckValid.checkNeedRevalidate = async (categoryId: string, findVal: number, queryClient: QueryClient) => {
  const mecaCount = queryClient.getQueryData<MecaCheckValidType>([queryKey.mecas, categoryId, 'count']);
  if (mecaCount === undefined) {
    try {
      const { count, shared } = await queryClient.fetchQuery([queryKey.mecas, categoryId, 'count'], () =>
        mecaApi.getCountByCategoryId(categoryId),
      );
      return { needRevalidation: shared && findVal === count, cached: false };
    } catch {
      return { needRevalidation: false, cached: false };
    }
  }
  const { shared, count } = mecaCount;
  return { needRevalidation: shared && count <= 1, cached: true };
};

useMecaCheckValid.updateQuery = (categoryId: string, value: number, queryClient: QueryClient) => {
  queryClient.setQueryData<MecaCheckValidType>([queryKey.mecas, categoryId, 'count'], (prev) => {
    if (!prev) {
      return prev;
    }
    return { ...prev, count: prev.count + value };
  });
};

export default useMecaCheckValid;
