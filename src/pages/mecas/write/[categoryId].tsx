/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import MetaHead from '@/components/@util/MetaHead';
import MecaWrite from '@/components/meca/organisms/MecaWrite';
import useMeca from '@/hooks/meca/useMeca';
import useMecaCheckValid from '@/hooks/meca/useMecaCheckValid';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { PostPageLayout } from '@/styles/layout';

export interface MecaWritePageProps {
  categoryId: string;
  cardId?: string;
}

const MecaWritePage = ({ categoryId, cardId = '' }: MecaWritePageProps) => {
  const { meca } = useMeca(cardId);
  return (
    <>
      <MetaHead title="Meca Card 작성하기" />
      <PostPageLayout>
        {cardId ? <MecaWrite {...meca?.card} categoryId={categoryId} /> : <MecaWrite categoryId={categoryId} />}
      </PostPageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const categoryId = context.params?.categoryId;
  if (!categoryId || typeof categoryId !== 'string') {
    throw { message: '적절하지 않은 Meca Category로의 수정 페이지 접근' };
  }
  const cardId = context.query?.cardId;
  await Promise.all([
    useMecaCheckValid.checkValid(categoryId, queryClient),
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
