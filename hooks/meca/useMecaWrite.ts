import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';
import { combineUUID } from '@/utils/uuidHandler';

import useCachedOrFetchQuery from '../useCachedOrFetchQuery';

const useMecaWrite = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { fetchOrGetQuery } = useCachedOrFetchQuery();

  const successHandler = useCallback((categoryId: string, cardId: string, message: string) => {
    queryClient.invalidateQueries([queryKey.mecas, categoryId]);
    queryClient.invalidateQueries([queryKey.meca, cardId]);
    alertToast(message, 'success');
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: createMeca } = useMutation(mecaApi.addMeca, {
    onSuccess: async ({ categoryId, cardId }) => {
      const countQuery = [queryKey.mecas, categoryId, 'count'];
      const { data, isCachedData } = await fetchOrGetQuery(countQuery, () => mecaApi.getCountByCategoryId(categoryId));
      data.count === (isCachedData ? 0 : 1) && utilApi.revalidate('/');
      isCachedData &&
        queryClient.setQueryData<{ count: number }>(countQuery, (prev) => ({ count: (prev?.count ?? 0) + 1 }));
      successHandler(categoryId, cardId, '카드 등록 성공');
    },
  });

  const { mutate: updateMeca } = useMutation(mecaApi.updateMeca, {
    onSuccess: ({ categoryId, cardId, memberId }) => {
      successHandler(categoryId, cardId, '카드 수정 성공');
      utilApi.revalidate(`/${combineUUID(memberId, cardId)}`);
    },
  });

  return { createMeca, updateMeca };
};

export default useMecaWrite;
