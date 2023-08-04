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
    async ({ pageParam }) => {
      const { default: cardHistoryApi } = await import('@/apis/cardHistoryApi');
      return cardHistoryApi.getHistories({ id, hasNext: pageParam, resourceType });
    },
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
      enabled: !!id,
    },
  );
  return { cardHistoryList, isEmpty, isFetching, hasNextPage, fetchNextPage };
};

export default useMecaHistory;
