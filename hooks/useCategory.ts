import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';
import { PAGINATION_NUM } from '@/utils/constants';

// TODO: 커서 페이지네이션으로 변경해주면 반영해야한다.
const useCategory = () => {
  const [offset, setOffset] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const {
    data: categoires,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [queryKey.categories, 'me'],
    async ({ pageParam = offset }) => {
      const response = await categoryApi.getMyCategoryList({
        offset: pageParam,
        query,
      });
      return response.contents;
    },
    {
      // TODO: offset이 cursor가 되면 로직이 변경되어야 한다.
      onSuccess: () => setOffset((prev) => prev + 1),
      // TODO: cursor 페이지네이션으로 변경 시 hasNextPage 응답 데이터를 이용한다.
      getNextPageParam: (lastPage) => (lastPage.length < PAGINATION_NUM ? false : offset),
    },
  );

  const changeSearchQuery = (newQuery: string) => {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery);
    setOffset(0);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { categoires, isLoading, isError, fetchNextPage, hasNextPage, changeSearchQuery };
};

export default useCategory;
