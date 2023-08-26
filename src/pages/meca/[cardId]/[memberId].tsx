/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import PageTitle from '@/components/@common/atoms/PageTitle';
import PostSection from '@/components/@common/molecules/PostSection';
import MetaHead from '@/components/@util/MetaHead';
import MecaPost from '@/components/meca/organisms/MecaPost';
import MecaPostHeader from '@/components/meca/organisms/MecaPostHeader';
import useMeca from '@/hooks/meca/useMeca';
import { isrAspect } from '@/libs/renderAspect';
import NotFound from '@/pages/404';
import { Devide, PostPageLayout } from '@/styles/layout';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';
import { extractFirstImageFromHTML } from '@/utils/imageHandler';

const QuizHistoryTimeline = dynamic(() => import('@/components/quiz/organisms/QuizHistoryTimeline'));

export interface MecaByIdProps {
  cardId: string;
  memberId?: string;
  thumbnailUrl: string;
  questionText: string;
}

const MecaDetailByMemberIdPage = ({ cardId, memberId, thumbnailUrl, questionText }: MecaByIdProps) => {
  const { meca: mecaResponse } = useMeca(cardId, true, memberId);
  if (!mecaResponse) {
    return <NotFound isMessageVisible message="요청하신 페이지가 없거나 비공개 처리되어있어요!" />;
  }
  const { card: meca, member: user } = mecaResponse;
  return (
    <>
      <MetaHead
        title={`${meca.title} - by ${user.name}`}
        description={questionText}
        image={thumbnailUrl}
        ogType="article"
      />
      <PostPageLayout>
        <PageTitle>{meca.title}</PageTitle>
        <br />
        <MecaPostHeader meca={meca} user={user} />
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

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = isrAspect(async ({ params }, queryClient) => {
  const memberId = params?.memberId;
  const cardId = params?.cardId;
  if (typeof memberId !== 'string' || typeof cardId !== 'string') {
    throw { message: '잘못된 경로 요청' };
  }
  try {
    const { card } = await useMeca.fetchQuery(true, cardId, queryClient);
    const { question, description } = card;
    const thumbnailUrl = extractFirstImageFromHTML(question.concat(description))?.src ?? '';
    const questionText = extractTextFromHTML(question);
    return {
      propsAspect: {
        cardId,
        memberId,
        thumbnailUrl,
        questionText,
      },
    };
  } catch (e) {
    return {
      propsAspect: {
        cardId,
        memberId,
      },
      revalidate: 1,
    };
  }
});

export default MecaDetailByMemberIdPage;
