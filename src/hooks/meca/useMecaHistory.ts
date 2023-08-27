import { QueryClient } from '@tanstack/react-query';

import cardHistoryApi from '@/apis/cardHistoryApi';
import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';

const useMecaHistory = (resourceType: 'cards' | 'members', id: string) => {
  const {
    data: cardHistoryList,
    hasNextPage,
    fetchNextPage,
    isEmpty,
    isFetching,
  } = useFlatInfiniteQuery(
    [queryKey.history, id],
    async ({ pageParam }) => cardHistoryApi.getHistories({ id, hasNext: pageParam, resourceType }),
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
      enabled: !!id,
      refetchOnMount: false,
    },
  );
  return { cardHistoryList, isEmpty, isFetching, hasNextPage, fetchNextPage };
};

useMecaHistory.prefetchInfiniteQuery = (resourceType: 'cards' | 'members', id: string, queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery([queryKey.history, id], () => cardHistoryApi.getHistories({ id, resourceType }), {
    getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
  });

export default useMecaHistory;
