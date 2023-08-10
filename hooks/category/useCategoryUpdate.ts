import { useCallback } from 'react';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import categoryApi, { PrivateCategoriesResponse, UpdateCategoryType } from '@/apis/categoryApi';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import { CategoryType, IMAGE_EXTENTIONS } from '@/types/domain';

import useFetchImage from '../useFetchImage';

interface CategoryUpdateType {
  categoryId?: string;
  title: string;
  thumbnail: string;
  shared: boolean;
  prevShared?: boolean;
}

const useCategoryUpdate = (successHandler?: () => void) => {
  const queryClient = useQueryClient();
  const { uploadImage } = useFetchImage();

  const { mutate: putCategory } = useMutation<CategoryType, unknown, UpdateCategoryType & { prevShared: boolean }>(
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
        successHandler?.();
      },
    },
  );

  const uploadThumbnail = useCallback(async (image: string | File | undefined) => {
    if (typeof image === 'string' || !image) {
      return image;
    }
    const uploadedImage = await uploadImage(
      {
        purpose: 'thumbnail',
        extension: image.type.replace('image/', '') as (typeof IMAGE_EXTENTIONS)[number],
        fileName: `${Date.now()}-category-thumbnail`,
      },
      image as File,
    );
    return uploadedImage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: postCategory } = useMutation(categoryApi.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
      successHandler?.();
    },
  });

  const updateCategory = ({ categoryId, title, thumbnail, shared, prevShared }: CategoryUpdateType) => {
    if (categoryId) {
      putCategory({
        categoryId,
        title,
        thumbnail,
        shared,
        prevShared: prevShared ?? false,
      });
      return;
    }
    postCategory({ title, thumbnail });
  };

  return { updateCategory, uploadThumbnail };
};

export default useCategoryUpdate;
