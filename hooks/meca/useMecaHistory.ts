import { useInfiniteQuery } from '@tanstack/react-query';

import queryKey from '@/query/queryKey';

const cardHistoryApiPromise = import('@/apis/cardHistoryApi');

const QUERY_FN = {
  cardId: cardHistoryApiPromise.then(({ default: cardHistoryApi }) => cardHistoryApi.getHistoriesByCardId),
  memberId: cardHistoryApiPromise.then(({ default: cardHistoryApi }) => cardHistoryApi.getHistoriesByMemberId),
} as const;

const useMecaHistory = (keyId: 'cardId' | 'memberId', id: string) => {
  const {
    data: cardHistoryList,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.history, id],
    async ({ pageParam }) => {
      const getHistoryList = await QUERY_FN[keyId];
      return getHistoryList({ id, hasNext: pageParam });
    },
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
      enabled: !!id,
    },
  );

  return { cardHistoryList, isLoading, hasNextPage, fetchNextPage };
};

export default useMecaHistory;
