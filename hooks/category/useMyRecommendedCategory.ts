import { useCallback, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useMyRecommendedCategory = (enabled?: boolean) => {
  const [query, setQuery] = useState<string>('');
  const {
    data: categoires,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.categories, 'me', 'recommended', query],
    ({ pageParam }) => {
      const props = {
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      return categoryApi.getMyRecommendedCategoryList({ ...props, containTitle: query });
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

export default useMyRecommendedCategory;
