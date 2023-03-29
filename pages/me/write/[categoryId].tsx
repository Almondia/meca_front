/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import MecaWrite from '@/components/organisms/MecaWrite';
import { ssrAspect } from '@/libs/renderAspect';
import { PostSection } from '@/styles/layout';
import useMeca from '@/hooks/meca/useMeca';
import queryKey from '@/query/queryKey';

export interface MecaWritePageProps {
  categoryId: string;
  cardId?: string;
}

const MecaWritePage = ({ categoryId, cardId }: MecaWritePageProps) => {
  const { meca, isError } = useMeca(cardId);
  return (
    <PostSection>
      {isError ? <MecaWrite categoryId={categoryId} /> : <MecaWrite {...meca} categoryId={categoryId} />}
    </PostSection>
  );
};

// TODO: 카드 수정에 대한 처리도 필요하다.
export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const { categoryId, cardId } = context.query;
  if (!categoryId || typeof categoryId !== 'string') {
    throw { url: '/' };
  }
  const response = await Promise.allSettled([mecaApi.getMyMecaList({ categoryId, pageSize: 1 })]);
  if (response[0].status === 'rejected') {
    throw { url: '/' };
  }
  if (!cardId || typeof cardId !== 'string') {
    return {
      categoryId,
    };
  }
  await queryClient.prefetchQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId));
  return {
    categoryId,
    cardId,
  };
});

export default MecaWritePage;
