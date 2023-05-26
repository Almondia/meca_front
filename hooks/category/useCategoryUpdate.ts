import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi, { PrivateCategoriesResponse } from '@/apis/categoryApi';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import { CategoryType } from '@/types/domain';

const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isSuccess } = useMutation<
    CategoryType,
    unknown,
    CategoryType & { prevShared: boolean }
  >(
    ({ categoryId, title, thumbnail, shared }) => categoryApi.updateCategory({ categoryId, title, thumbnail, shared }),
    {
      onSuccess: (data: CategoryType, { prevShared, shared }) => {
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
        if (shared || prevShared !== shared) {
          utilApi.revalidate(['/']);
        }
      },
    },
  );
  return { updateCategory, isSuccess };
};

export default useCategoryUpdate;
