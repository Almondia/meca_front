import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';

const useMecaWrite = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const successHandler = useCallback((categoryId: string) => {
    queryClient.invalidateQueries([queryKey.mecas, 'me', categoryId]);
    router.push('/cate');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: createMeca } = useMutation(mecaApi.addMeca, {
    onSuccess: (data) => {
      successHandler(data.categoryId);
    },
  });

  return { createMeca };
};

export default useMecaWrite;
