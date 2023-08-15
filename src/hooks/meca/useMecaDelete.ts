import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import utilApi from '@/apis/utilApi';
import useMecaCheckValid from '@/hooks/meca/useMecaCheckValid';
import useUser from '@/hooks/user/useUser';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';
import { combineUUID } from '@/utils/uuidHandler';

const useMecaDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUser();

  const revalidate = async (categoryId: string, cardId: string) => {
    const { cached, needRevalidation } = await useMecaCheckValid.checkNeedRevalidate(categoryId, 0, queryClient);
    const revalidateUrls = [`/mecas/${combineUUID(user?.memberId ?? '', cardId)}`];
    needRevalidation && revalidateUrls.push('/');
    utilApi.revalidate(revalidateUrls);
    cached && useMecaCheckValid.updateQuery(categoryId, -1, queryClient);
  };

  const { mutate: deleteMeca } = useMutation<never, unknown, { cardId: string; categoryId: string }>(
    ({ cardId }) => mecaApi.deleteMeca(cardId),
    {
      onSuccess: async (_, { cardId, categoryId }) => {
        queryClient.invalidateQueries([queryKey.mecas, categoryId]);
        queryClient.setQueryData([queryKey.meca, cardId], null);
        alertToast('삭제 완료', 'success');
        revalidate(categoryId, cardId);
        const byCategoryIdPath = `/categories/${combineUUID(user?.memberId ?? '', categoryId)}`;
        router.pathname !== byCategoryIdPath && user && router.push(byCategoryIdPath);
      },
    },
  );

  return { deleteMeca };
};

export default useMecaDelete;
