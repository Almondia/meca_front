import { useCallback, useState } from 'react';

import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';

const useSharedCategory = () => {
  const [query, setQuery] = useState<string>('');
  const {
    data: categories,
    isLoading,
    isEmpty,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useFlatInfiniteQuery([queryKey.categories, 'shared', query], async ({ pageParam }) => {
    const props = {
      hasNext: pageParam,
    };
    !pageParam && delete props.hasNext;
    const { default: categoryApi } = await import('@/apis/categoryApi');
    return categoryApi.getSharedCategoryList({ ...props, containTitle: query });
  });
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
  return { categories, fetchNextPage, hasNextPage, changeSearchQuery, isEmpty };
};

export default useSharedCategory;
