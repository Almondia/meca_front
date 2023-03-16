import { useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory } = useMutation(categoryApi.deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
    },
  });

  return { deleteCategory };
};

export default useCategoryDelete;
