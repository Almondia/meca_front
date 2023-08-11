import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Meca, MecaCreateRequest, MecaUpdateRequest } from '@/types/domain/meca';

import mecaApi from '@/apis/mecaApi';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';
import { combineUUID } from '@/utils/uuidHandler';

import useMecaCount from './useMecaCount';

const useMecaWrite = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const revalidateWithWrite = async (categoryId: string) => {
    const { count, cached } = await useMecaCount.fetchOrGetQuery(categoryId, queryClient);
    count === (cached ? 0 : 1) && utilApi.revalidate(['/']);
    cached && useMecaCount.updateQuery(categoryId, 1, queryClient);
  };

  const revalidateWithUpdate = (cardId: string, memberId: string) => {
    utilApi.revalidate([`/mecas/${combineUUID(memberId, cardId)}`]);
  };

  const successHandler = useCallback((categoryId: string, cardId: string, memberId: string, message: string) => {
    queryClient.invalidateQueries([queryKey.mecas, categoryId]);
    queryClient.invalidateQueries([queryKey.meca, cardId]);
    alertToast(message, 'success');
    router.replace(`/mecas/${combineUUID(memberId, cardId)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: createMeca } = useMutation<Meca, unknown, MecaCreateRequest>(
    async (props: MecaCreateRequest) => mecaApi.addMeca(props),
    {
      onSuccess: async ({ categoryId, cardId, memberId }) => {
        revalidateWithWrite(categoryId);
        successHandler(categoryId, cardId, memberId, '카드 등록 성공');
      },
    },
  );

  const { mutate: updateMeca } = useMutation<Meca, unknown, MecaUpdateRequest>(
    async (props: MecaUpdateRequest) => mecaApi.updateMeca(props),
    {
      onSuccess: ({ categoryId, cardId, memberId }) => {
        revalidateWithUpdate(cardId, memberId);
        successHandler(categoryId, cardId, memberId, '카드 수정 성공');
      },
    },
  );

  return { createMeca, updateMeca };
};

export default useMecaWrite;
