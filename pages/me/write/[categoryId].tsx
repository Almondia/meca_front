/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import MecaWrite from '@/components/organisms/MecaWrite';
import useMeca from '@/hooks/meca/useMeca';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { PostSection } from '@/styles/layout';

export interface MecaWritePageProps {
  categoryId: string;
  cardId?: string;
}

const MecaWritePage = ({ categoryId, cardId }: MecaWritePageProps) => {
  const { meca } = useMeca(cardId);
  return (
    <PostSection>
      {cardId ? <MecaWrite {...meca} categoryId={categoryId} /> : <MecaWrite categoryId={categoryId} />}
    </PostSection>
  );
};

// TODO: 카드 수정에 대한 처리도 필요하다.
export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const { categoryId, cardId } = context.query;
  if (!categoryId || typeof categoryId !== 'string') {
    throw { message: '적절하지 않은 Meca Category로의 수정 페이지 접근' };
  }
  const response = await Promise.allSettled([mecaApi.getMyMecaList({ categoryId, pageSize: 1 })]);
  if (response[0].status === 'rejected') {
    throw { message: '적절하지 않은 Meca Category로의 수정 페이지 접근' };
  }
  if (!cardId || typeof cardId !== 'string') {
    return {
      categoryId,
    };
  }
  await queryClient.prefetchQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId));
  if (!queryClient.getQueryData([queryKey.meca, cardId])) {
    throw { message: '적절하지 않은 Meca Card로의 수정 페이지 접근' };
  }
  return {
    categoryId,
    cardId,
  };
});

export default MecaWritePage;
