import { QueryClient, useQuery } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';

const useMecaCount = (categoryId: string) => {
  const fallback = { count: -1, cached: false };
  const { data: mecaCount = fallback } = useQuery([queryKey.mecas, categoryId, 'count'], () =>
    mecaApi.getCountByCategoryId(categoryId),
  );
  return { count: mecaCount, cached: true };
};

useMecaCount.fetchQuery = (categoryId: string, queryClient: QueryClient) =>
  queryClient.fetchQuery([queryKey.mecas, categoryId, 'count'], () => mecaApi.getCountByCategoryId(categoryId));

useMecaCount.fetchOrGetQuery = async (categoryId: string, queryClient: QueryClient) => {
  const mecaCount = queryClient.getQueryData<{ count: number; cached: boolean }>([queryKey.mecas, categoryId, 'count']);
  if (mecaCount === undefined) {
    try {
      const { count } = await queryClient.fetchQuery([queryKey.mecas, categoryId, 'count'], () =>
        mecaApi.getCountByCategoryId(categoryId),
      );
      return { count, cached: false };
    } catch {
      return { count: -1, cached: false };
    }
  }
  return { ...mecaCount, cached: true };
};

useMecaCount.updateQuery = (categoryId: string, value: number, queryClient: QueryClient) => {
  queryClient.setQueryData<{ count: number; cached: boolean }>([queryKey.mecas, categoryId, 'count'], (prev) => {
    if (!prev) {
      return prev;
    }
    return { ...prev, count: prev.count + value };
  });
};

export default useMecaCount;
