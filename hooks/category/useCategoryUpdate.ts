import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi, { PrivateCategoriesResponse } from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCategory } = useMutation(categoryApi.updateCategory, {
    onSuccess: (data) => {
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
  });
  return { updateCategory };
};

export default useCategoryUpdate;
