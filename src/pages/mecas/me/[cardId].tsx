/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import PageTitle from '@/components/@common/atoms/PageTitle';
import PostSection from '@/components/@common/molecules/PostSection';
import MetaHead from '@/components/@util/MetaHead';
import MecaPost from '@/components/meca/organisms/MecaPost';
import MecaPostHeader from '@/components/meca/organisms/MecaPostHeader';
import useMeca from '@/hooks/meca/useMeca';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, PostPageLayout } from '@/styles/layout';

const QuizHistoryTimeline = dynamic(() => import('@/components/quiz/organisms/QuizHistoryTimeline'));
export interface MecaPageProps {
  cardId: string;
}

const MecaById = ({ cardId }: MecaPageProps) => {
  const { meca: mecaResponse } = useMeca(cardId);
  if (!mecaResponse) {
    return null;
  }
  const { card: meca, member: user } = mecaResponse;
  return (
    <>
      <MetaHead title={`${meca.title}- by ${user?.name}`} ogType="article" />
      <PostPageLayout>
        <PageTitle>{meca.title}</PageTitle>
        <br />
        <MecaPostHeader meca={meca} user={user} isMine />
        <Devide />
        <MecaPost {...meca} />
        <PostSection>
          <PostSection.Title>History</PostSection.Title>
          <PostSection.Body indented={false} boxed={false}>
            <QuizHistoryTimeline resourceId={cardId} resourceType="cards" />
          </PostSection.Body>
        </PostSection>
      </PostPageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const cardId = context.params?.cardId;
  if (!cardId || typeof cardId !== 'string') {
    throw { message: '잘못된 요청' };
  }
  const { card } = await useMeca.fetchQuery(false, cardId, queryClient);
  return {
    cardId,
    categoryId: card.categoryId,
    cached: true,
  };
});

export default MecaById;
