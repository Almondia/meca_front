import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { PrivateCategoriesResponse } from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';
import { CategoryType } from '@/types/domain';

const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isSuccess } = useMutation<CategoryType, unknown, CategoryType>(
    (props) => axios.put('/api/category', { ...props }),
    {
      onSuccess: (data: CategoryType) => {
        queryClient.invalidateQueries([queryKey.mecas, data.categoryId]);
        queryClient.setQueriesData<InfiniteData<PrivateCategoriesResponse>>([queryKey.categories, 'me'], (prev) => {
          if (!prev) {
            return prev;
          }
          return {
            ...prev,
            pages: [...prev.pages].map((page) => ({
              ...page,
              contents: page.contents.map((content) =>
                content.categoryId === data.categoryId ? { ...content, ...data } : content,
              ),
            })),
          };
        });
      },
    },
  );
  return { updateCategory, isSuccess };
};

export default useCategoryUpdate;
