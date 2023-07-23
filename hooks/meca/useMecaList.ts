import { useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

const useMecaList = (categoryId: string, isMine: boolean) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const isEnabled = isMine ? hasAuth : true;

  const {
    data: mecaList,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.mecas, categoryId],
    async ({ pageParam }) => {
      const props = {
        categoryId,
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      const { default: mecaApi } = await import('@/apis/mecaApi');
      if (isMine) {
        return mecaApi.getMyMecaList(props);
      }
      return mecaApi.getSharedMecaList(props);
    },
    {
      enabled: isEnabled,
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
    },
  );

  const [writerInfo, category] = useMemo(
    () => [mecaList?.pages[0].member, mecaList?.pages[0].category],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [!!mecaList?.pages],
  );

  return { mecaList, writerInfo, category, hasNextPage: hasNextPage && isEnabled, fetchNextPage, isLoading };
};

export default useMecaList;
