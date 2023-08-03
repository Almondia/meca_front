import { useRecoilValue } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';

const useMecaList = (categoryId: string, isMine: boolean) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const isEnabled = isMine ? hasAuth : true;

  const {
    data: mecaList,
    isEmpty,
    hasNextPage,
    fetchNextPage,
  } = useFlatInfiniteQuery(
    [queryKey.mecas, categoryId],
    async ({ pageParam }) => {
      const props = {
        categoryId,
        hasNext: pageParam,
      };
      !pageParam && delete props.hasNext;
      const { default: mecaApi } = await import('@/apis/mecaApi');
      if (isMine) {
        return mecaApi.getMyMecaList(props);
      }
      return mecaApi.getSharedMecaList(props);
    },
    {
      enabled: isEnabled,
    },
  );

  return { mecaList, isEmpty, hasNextPage: hasNextPage && isEnabled, fetchNextPage };
};

export default useMecaList;
