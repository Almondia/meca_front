import { useInfiniteQuery } from '@tanstack/react-query';

import cardHistoryApi from '@/apis/cardHistoryApi';
import queryKey from '@/query/queryKey';

const QUERY_FN = {
  cardId: cardHistoryApi.getHistoriesByCardId,
  memberId: cardHistoryApi.getHistoriesByMemberId,
} as const;

const useMecaHistory = (keyId: 'cardId' | 'memberId', id: string) => {
  const {
    data: cardHistoryList,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery([queryKey.history, id], ({ pageParam }) => QUERY_FN[keyId]({ id, hasNext: pageParam }), {
    getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
  });

  return { cardHistoryList, isLoading, hasNextPage, fetchNextPage };
};

export default useMecaHistory;
