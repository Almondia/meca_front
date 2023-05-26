import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

import useCachedOrFetchQuery from '../useCachedOrFetchQuery';

const useMecaDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { fetchOrGetQuery } = useCachedOrFetchQuery();

  const { mutate: deleteMeca } = useMutation<never, unknown, { cardId: string; categoryId: string }>(
    ({ cardId }) => mecaApi.deleteMeca(cardId),
    {
      onSuccess: async (_, { cardId, categoryId }) => {
        queryClient.invalidateQueries([queryKey.mecas, categoryId]);
        queryClient.setQueryData([queryKey.meca, cardId], null);
        const countQuery = [queryKey.mecas, categoryId, 'count'];
        const { data, isCachedData } = await fetchOrGetQuery(countQuery, () =>
          mecaApi.getCountByCategoryId(categoryId),
        );
        data.count === (isCachedData ? 1 : 0) && utilApi.revalidate(['/']);
        isCachedData &&
          queryClient.setQueryData<{ count: number }>(countQuery, (prev) => ({ count: (prev?.count ?? 0) - 1 }));
        alertToast('삭제 완료', 'success');
        router.pathname.indexOf('/mecas/') !== -1 && router.push('/categories');
      },
    },
  );

  return { deleteMeca };
};

export default useMecaDelete;
