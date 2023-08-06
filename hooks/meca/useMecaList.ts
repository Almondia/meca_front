import { QueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import { hasAuthState } from '@/atoms/common';
import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';

const getMecaList = async (isMine: boolean, categoryId: string, hasNext?: string) =>
  isMine ? mecaApi.getMyMecaList({ categoryId, hasNext }) : mecaApi.getSharedMecaList({ categoryId, hasNext });

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
    async ({ pageParam }) => getMecaList(isMine, categoryId, pageParam),
    {
      enabled: isEnabled,
    },
  );

  return { mecaList, isEmpty, hasNextPage, fetchNextPage };
};

useMecaList.fetchInfiniteQuery = (categoryId: string, isMine: boolean, queryClient: QueryClient) =>
  queryClient.fetchInfiniteQuery([queryKey.mecas, categoryId], async () => getMecaList(isMine, categoryId), {
    getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
  });

export default useMecaList;
