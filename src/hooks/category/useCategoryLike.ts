import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import categoryApi from '@/apis/categoryApi';
import { hasAuthState } from '@/atoms/common';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

interface LikeQueryType {
  likeCount: number;
  hasLike: boolean;
}

const useCategoryLike = (categoryId: string, initialLikeCount: number) => {
  const queryClient = useQueryClient();
  const hasAuth = useRecoilValue(hasAuthState);
  const fallbackLikeQueryData: LikeQueryType = { likeCount: initialLikeCount, hasLike: false };
  const { data = fallbackLikeQueryData } = useQuery<LikeQueryType>(
    [queryKey.categories, categoryId, 'like'],
    async () => {
      const hasLike = await categoryApi.getCategoryLikeState(categoryId);
      return {
        likeCount: initialLikeCount,
        hasLike,
      };
    },
    {
      refetchOnMount: false,
      onError: () => {
        queryClient.setQueryData<LikeQueryType>([queryKey.categories, categoryId, 'like'], fallbackLikeQueryData);
      },
      enabled: hasAuth,
    },
  );

  const { mutate, isLoading: isLikeUpdateLoading } = useMutation<{ hasLike: boolean; count: number }, never, string>(
    ['updateCategoryLike'],
    async (id: string) => (data.hasLike ? categoryApi.postCategoryUnlike(id) : categoryApi.postCategoryLike(id)),
    {
      onSuccess: ({ hasLike, count }) => {
        queryClient.setQueryData<LikeQueryType>([queryKey.categories, categoryId, 'like'], (prev) => {
          if (!prev) {
            return prev;
          }
          return { hasLike, likeCount: prev.likeCount + count };
        });
        queryClient.invalidateQueries([queryKey.categories, 'recommended']);
      },
    },
  );

  const postLike = () => {
    if (!hasAuth) {
      alertToast('로그인 후 이용해주세요', 'warning');
      return;
    }
    if (!isLikeUpdateLoading) {
      mutate(categoryId);
    }
  };

  return { ...data, postLike };
};

export default useCategoryLike;
