import { useCallback, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import categoryApi from '@/apis/categoryApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

const useCategory = () => {
  // TODO: 검색어 서버 api 구현 안되면 지울 것
  const [query, setQuery] = useState<string>('');
  const hasAuth = useRecoilValue(hasAuthState);
  const {
    data: categoires,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.categories, 'me'],
    ({ pageParam }) => {
      const props = {
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      return categoryApi.getMyCategoryList(props);
    },
    {
      enabled: hasAuth,
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

  return { categoires, isLoading, isError, fetchNextPage, hasNextPage: hasNextPage && hasAuth, changeSearchQuery };
};

export default useCategory;
