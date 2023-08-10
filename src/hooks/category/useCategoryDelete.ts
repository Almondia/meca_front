import { useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory } = useMutation<never, unknown, { id: string; shared: boolean }>(
    ({ id }) => categoryApi.deleteCategory(id),
    {
      onSuccess: (_, { shared }) => {
        queryClient.invalidateQueries([queryKey.categories, 'me']);
        alertToast('삭제 완료', 'success');
        shared && utilApi.revalidate(['/']);
      },
    },
  );

  return { deleteCategory };
};

export default useCategoryDelete;
