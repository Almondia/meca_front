import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi, { CategoriesResponse } from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';

const useCategoryUpdate = (successHandler?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: updateCategory } = useMutation(categoryApi.updateCategory, {
    onSuccess: (data) => {
      successHandler?.();
      queryClient.setQueriesData<InfiniteData<CategoriesResponse>>([queryKey.categories, 'me'], (prev) => {
        if (!prev) {
          return prev;
        }
        return {
          ...prev,
          pages: [...prev.pages].map((page) => ({
            ...page,
            contents: page.contents.map((content) =>
              content.categoryId === data.categoryId ? { ...content, title: data.title } : content,
            ),
          })),
        };
      });
    },
  });
  return { updateCategory };
};

export default useCategoryUpdate;
