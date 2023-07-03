import { useCallback, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useCategory = () => {
  const [query, setQuery] = useState<string>('');
  const {
    data: categoires,
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

  return { categoires, fetchNextPage, hasNextPage, changeSearchQuery };
};

export default useCategory;
