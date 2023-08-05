import { useCallback, useState } from 'react';

import categoryApi from '@/apis/categoryApi';
import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';

const useSharedCategory = () => {
  const [query, setQuery] = useState<string>('');
  const {
    data: categoryList,
    isEmpty,
    hasNextPage,
    fetchNextPage,
  } = useFlatInfiniteQuery([queryKey.categories, 'shared', query], async ({ pageParam }) => {
    const props = {
      hasNext: pageParam,
    };
    !pageParam && delete props.hasNext;
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
  return { categoryList, fetchNextPage, hasNextPage, changeSearchQuery, isEmpty };
};

export default useSharedCategory;
