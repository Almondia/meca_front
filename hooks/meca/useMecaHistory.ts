import { useInfiniteQuery } from '@tanstack/react-query';

import queryKey from '@/query/queryKey';

const useMecaHistory = (resourceType: 'cards' | 'members', id: string) => {
  const {
    data: cardHistoryList,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.history, id],
    async ({ pageParam }) => {
      const { default: cardHistoryApi } = await import('@/apis/cardHistoryApi');
      return cardHistoryApi.getHistories({ id, hasNext: pageParam, resourceType });
    },
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
      enabled: !!id,
    },
  );

  return { cardHistoryList, isLoading, hasNextPage, fetchNextPage };
};

export default useMecaHistory;
