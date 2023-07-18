/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import AuthPageProvider from '@/components/common/AuthPageProvider';
import MetaHead from '@/components/common/MetaHead';
import MecaWrite from '@/components/organisms/MecaWrite';
import useMeca from '@/hooks/meca/useMeca';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { PostSection } from '@/styles/layout';

export interface MecaWritePageProps {
  categoryId: string;
  cardId?: string;
}

const MecaWritePage = ({ categoryId, cardId = '' }: MecaWritePageProps) => {
  const { meca } = useMeca(cardId);
  return (
    <AuthPageProvider>
      <MetaHead title="Meca Card 작성하기" />
      <PostSection>
        {cardId ? <MecaWrite {...meca} categoryId={categoryId} /> : <MecaWrite categoryId={categoryId} />}
      </PostSection>
    </AuthPageProvider>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const categoryId = context.params?.categoryId;
  if (!categoryId || typeof categoryId !== 'string') {
    throw { message: '적절하지 않은 Meca Category로의 수정 페이지 접근' };
  }
  const cardId = context.query?.cardId;
  await Promise.all([
    queryClient.fetchQuery([queryKey.mecas, categoryId, 'count'], () => mecaApi.getCountByCategoryId(categoryId)),
    cardId &&
      typeof cardId === 'string' &&
      queryClient.prefetchQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId)),
  ]);
  if (!queryClient.getQueryData([queryKey.meca, cardId])) {
    return {
      categoryId,
    };
  }
  return {
    categoryId,
    cardId,
  };
});

export default MecaWritePage;
