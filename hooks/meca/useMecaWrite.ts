import { useRouter } from 'next/router';

import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddMecaRequest, MecaWriteResponse, UpdateMecaRequest } from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';
import { combineUUID } from '@/utils/uuidHandler';

import useCachedOrFetchQuery from '../useCachedOrFetchQuery';

const mecaApiPromise = import('@/apis/mecaApi');
const utilApiPromise = import('@/apis/utilApi');

const useMecaWrite = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { fetchOrGetQuery } = useCachedOrFetchQuery();
  const mecaApiRef = useRef<Awaited<typeof mecaApiPromise>['default']>() as MutableRefObject<
    Awaited<typeof mecaApiPromise>['default']
  >;
  const utilApiRef = useRef<Awaited<typeof utilApiPromise>['default']>() as MutableRefObject<
    Awaited<typeof utilApiPromise>['default']
  >;

  useEffect(() => {
    (async () => {
      const { default: mecaApi } = await mecaApiPromise;
      const { default: utilApi } = await utilApiPromise;
      mecaApiRef.current = mecaApi;
      utilApiRef.current = utilApi;
    })();
  }, []);

  const successHandler = useCallback((categoryId: string, cardId: string, message: string) => {
    queryClient.invalidateQueries([queryKey.mecas, categoryId]);
    queryClient.invalidateQueries([queryKey.meca, cardId]);
    alertToast(message, 'success');
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: createMeca } = useMutation<MecaWriteResponse, unknown, AddMecaRequest>(
    async (props: AddMecaRequest) => mecaApiRef.current.addMeca(props),
    {
      onSuccess: async ({ categoryId, cardId }) => {
        const countQuery = [queryKey.mecas, categoryId, 'count'];
        const { data, isCachedData } = await fetchOrGetQuery(countQuery, () =>
          mecaApiRef.current.getCountByCategoryId(categoryId),
        );
        data.count === (isCachedData ? 0 : 1) && utilApiRef.current.revalidate(['/']);
        isCachedData &&
          queryClient.setQueryData<{ count: number }>(countQuery, (prev) => ({ count: (prev?.count ?? 0) + 1 }));
        successHandler(categoryId, cardId, '카드 등록 성공');
      },
    },
  );

  const { mutate: updateMeca } = useMutation<MecaWriteResponse, unknown, UpdateMecaRequest>(
    async (props: UpdateMecaRequest) => mecaApiRef.current.updateMeca(props),
    {
      onSuccess: ({ categoryId, cardId, memberId }) => {
        successHandler(categoryId, cardId, '카드 수정 성공');
        utilApiRef.current.revalidate([`/mecas/${combineUUID(memberId, cardId)}`]);
      },
    },
  );

  return { createMeca, updateMeca };
};

export default useMecaWrite;
