import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory } = useMutation<never, unknown, { id: string; shared: boolean }>(
    (props) =>
      axios.delete(`/api/category`, {
        params: {
          ...props,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKey.categories, 'me']);
        alertToast('삭제 완료', 'success');
      },
    },
  );

  return { deleteCategory };
};

export default useCategoryDelete;
