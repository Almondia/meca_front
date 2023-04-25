import { useCallback, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useSharedCategory = () => {
  const [query, setQuery] = useState<string>('');

  const {
    data: categories,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.categories, 'shared', query],
    ({ pageParam }) => {
      const props = {
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      return categoryApi.getSharedCategoryList({ ...props, containTitle: query });
    },
    {
      enabled: true,
      getNextPageParam: (lastPage) => lastPage.hasNext,
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

  return { categories, isLoading, isError, fetchNextPage, hasNextPage, changeSearchQuery };
};

export default useSharedCategory;
