import { useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useCategoryPost = (successHandler?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: addCategory } = useMutation(categoryApi.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
      successHandler?.();
    },
  });
  return { addCategory };
};

export default useCategoryPost;
