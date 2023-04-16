import { useInfiniteQuery } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useSharedCategory = () => {
  const {
    data: categories,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.categories, 'shared'],
    ({ pageParam }) => {
      const props = {
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      return categoryApi.getSharedCategoryList(props);
    },
    {
      enabled: true,
      getNextPageParam: (lastPage) => lastPage.hasNext,
    },
  );

  return { categories, isLoading, isError, fetchNextPage, hasNextPage };
};

export default useSharedCategory;
