import { useCallback, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';

const useMyCategory = (enabled?: boolean) => {
  const [query, setQuery] = useState<string>('');
  const hasAuth = useRecoilValue(hasAuthState);
  const {
    data: categoryList,
    isEmpty,
    hasNextPage,
    fetchNextPage,
  } = useFlatInfiniteQuery(
    [queryKey.categories, 'me', query],
    async ({ pageParam }) => {
      const props = {
        hasNext: pageParam,
      };
      const { default: categoryApi } = await import('@/apis/categoryApi');
      return categoryApi.getMyCategoryList({ ...props, containTitle: query });
    },
    {
      enabled: !!enabled && hasAuth,
    },
  );

  const changeSearchQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);
  return { categoryList, isEmpty, hasNextPage, fetchNextPage, query, changeSearchQuery };
};

export default useMyCategory;
