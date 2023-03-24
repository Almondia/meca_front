import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';
import { PAGINATION_NUM } from '@/utils/constants';
import { hasAuthState } from '@/atoms/common';

// TODO: 커서 페이지네이션으로 변경해주면 반영해야한다.
const useCategory = () => {
  const [query, setQuery] = useState<string>('');
  const hasAuth = useRecoilValue(hasAuthState);
  const {
    data: categoires,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.categories, 'me', query],
    async ({ pageParam = 0 }) => {
      const response = await categoryApi.getMyCategoryList({
        offset: pageParam,
        query,
      });
      return response;
    },
    {
      enabled: hasAuth,
      // TODO: cursor 페이지네이션으로 변경 시 hasNextPage 응답 데이터를 이용한다.
      getNextPageParam: (lastPage) => (lastPage.contents.length < PAGINATION_NUM ? false : lastPage.pageNumber + 1),
    },
  );

  const changeSearchQuery = useCallback(
    (newQuery: string) => {
      if (query === newQuery) {
        return;
      }
      setQuery(newQuery);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query],
  );

  return { categoires, isLoading, isError, fetchNextPage, hasNextPage: hasNextPage && hasAuth, changeSearchQuery };
};

export default useCategory;
