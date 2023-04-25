import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';
import { UserProfile } from '@/types/domain';

const useMecaList = (categoryId: string, isMine: boolean) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const isEnabled = isMine ? hasAuth : true;
  const queryClient = useQueryClient();
  const {
    data: mecaList,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey.mecas, categoryId],
    async ({ pageParam }) => {
      const props = {
        categoryId,
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      if (isMine) {
        const user = queryClient.getQueryData([queryKey.me]) as UserProfile;
        const response = await mecaApi.getMyMecaList(props);
        return { ...response, contents: response.contents.map((content) => ({ ...content, ...user })) };
      }
      return mecaApi.getSharedMecaList(props);
    },
    {
      enabled: isEnabled,
      getNextPageParam: (lastPage) => lastPage.hasNext,
    },
  );

  return { mecaList, hasNextPage: hasNextPage && isEnabled, fetchNextPage, isLoading, isError };
};

export default useMecaList;
