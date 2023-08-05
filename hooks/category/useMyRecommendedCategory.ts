import { useCallback, useState } from 'react';

import categoryApi from '@/apis/categoryApi';
import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';

const useMyRecommendedCategory = (enabled?: boolean) => {
  const [query, setQuery] = useState<string>('');
  const {
    data: categoryList,
    hasNextPage,
    isEmpty,
    fetchNextPage,
  } = useFlatInfiniteQuery(
    [queryKey.categories, 'me', 'recommended', query],
    async ({ pageParam }) => {
      const props = {
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      return categoryApi.getMyRecommendedCategoryList({ ...props, containTitle: query });
    },
    {
      enabled: !!enabled,
    },
  );

  const changeSearchQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  return { categoryList, fetchNextPage, hasNextPage, query, changeSearchQuery, isEmpty };
};

export default useMyRecommendedCategory;
