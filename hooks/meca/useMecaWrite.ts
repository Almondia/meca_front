import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

const useMecaWrite = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const successHandler = useCallback((categoryId: string, message: string) => {
    queryClient.invalidateQueries([queryKey.mecas, 'me', categoryId]);
    alertToast(message, 'success');
    router.replace(`/me/categories/${categoryId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: createMeca } = useMutation(mecaApi.addMeca, {
    onSuccess: (data) => {
      successHandler(data.categoryId, '카드 등록 성공');
    },
  });

  const { mutate: updateMeca } = useMutation(mecaApi.updateMeca, {
    onSuccess: (data) => {
      successHandler(data.categoryId, '카드 수정 성공');
    },
  });

  return { createMeca, updateMeca };
};

export default useMecaWrite;
