import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import categoryApi from '@/apis/categoryApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

const useCategory = () => {
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
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
    },
  );

  return { categoires, isLoading, isError, fetchNextPage, hasNextPage: hasNextPage && hasAuth };
};

export default useCategory;
