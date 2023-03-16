import { useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory } = useMutation(categoryApi.deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
      alertToast('삭제 완료', 'success');
    },
  });

  return { deleteCategory };
};

export default useCategoryDelete;
