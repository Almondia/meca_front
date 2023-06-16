import { useCallback, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import categoryApi from '@/apis/categoryApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

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
    ({ pageParam }) => {
      const props = {
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      return categoryApi.getMyCategoryList({ ...props, containTitle: query });
    },
    {
      enabled: hasAuth,
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
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
