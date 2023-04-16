import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';

const useMecaList = (categoryId: string, memberId: string) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const {
    data: mecaList,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.mecas, memberId],
    ({ pageParam }) => {
      const props = {
        categoryId,
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      return mecaApi.getMyMecaList(props);
    },
    {
      enabled: hasAuth,
      getNextPageParam: (lastPage) => lastPage.hasNext,
    },
  );

  return { mecaList, hasNextPage: hasNextPage && hasAuth, fetchNextPage, isLoading, isError };
};

export default useMecaList;
