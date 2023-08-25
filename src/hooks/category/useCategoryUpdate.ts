import { useCallback } from 'react';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import type { Category, CategoryListPaginationResponse } from '@/types/domain/category';

import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';
import { IMAGE_EXTENTIONS } from '@/utils/constants';

import useFetchImage from '../useFetchImage';

const useCategoryUpdate = (successHandler?: () => void) => {
  const queryClient = useQueryClient();
  const { uploadImage } = useFetchImage();

  const { mutate: updateCategory } = useMutation(categoryApi.updateCategory, {
    onSuccess: (data: Category) => {
      const { categoryId } = data;
      queryClient.invalidateQueries([queryKey.mecas, categoryId]);
      queryClient.setQueriesData<InfiniteData<CategoryListPaginationResponse>>([queryKey.categories, 'me'], (prev) => {
        if (!prev) {
          return prev;
        }
        return {
          ...prev,
          pages: [...prev.pages].map((page) => ({
            ...page,
            contents: page.contents.map((content) => ({
              ...content,
              category:
                content.category.categoryId === categoryId ? { ...content.category, ...data } : content.category,
            })),
          })),
        };
      });
      successHandler?.();
    },
  });

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

  const { mutate: addCategory } = useMutation(categoryApi.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
      successHandler?.();
    },
  });

  return { addCategory, updateCategory, uploadThumbnail };
};

export default useCategoryUpdate;
