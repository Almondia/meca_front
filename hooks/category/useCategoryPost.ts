import { useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useCategoryPost = (successHandler?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: addCategory, isSuccess } = useMutation(categoryApi.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
      successHandler?.();
    },
  });
  return { addCategory, isSuccess };
};

export default useCategoryPost;
