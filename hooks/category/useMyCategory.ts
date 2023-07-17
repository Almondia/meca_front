import { useCallback, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useMyCategory = (enabled?: boolean) => {
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
      enabled: !!enabled,
    },
  );

  const changeSearchQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  return { categoires, fetchNextPage, hasNextPage, query, changeSearchQuery };
};

export default useMyCategory;
