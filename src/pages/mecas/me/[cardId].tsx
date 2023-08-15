/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import LinkButton from '@/components/@common/atoms/LinkButton';
import PageTitle from '@/components/@common/atoms/PageTitle';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import PostSection from '@/components/@common/molecules/PostSection';
import AuthPageProvider from '@/components/@util/AuthPageProvider';
import MetaHead from '@/components/@util/MetaHead';
import MecaPost from '@/components/meca/organisms/MecaPost';
import useMeca from '@/hooks/meca/useMeca';
import useModal from '@/hooks/useModal';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, PostPageLayout } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';

const MecaDeleteDialog = dynamic(() => import('@/components/meca/organisms/MecaDeleteDialog'), { ssr: false });
const QuizHistoryTimeline = dynamic(() => import('@/components/quiz/organisms/QuizHistoryTimeline'));
const NotFound = dynamic(() => import('@/pages/404'), { ssr: false });
export interface MecaPageProps {
  cardId: string;
}

const MecaById = ({ cardId }: MecaPageProps) => {
  const { meca: mecaResponse } = useMeca(cardId);
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const router = useRouter();
  const handleUpdateCardButtonClick = (categoryId: string) => {
    router.push(`/mecas/write/${categoryId}?cardId=${cardId}`);
  };
  const handleDeleteCardButtonClick = () => {
    !isDeleteModalVisible && deleteModalOpen();
  };
  if (!mecaResponse) {
    return <NotFound isMessageVisible message="요청하신 페이지가 없거나 비공개 처리되어있어요!" />;
  }
  const { card: meca, member: user } = mecaResponse;
  return (
    <AuthPageProvider reload>
      <MetaHead title={`${meca.title}- by ${user?.name}`} ogType="article" />
      <PostPageLayout>
        <PageTitle>{meca.title}</PageTitle>
        <br />
        <BetweenSection>
          <BetweenSection.Left>
            <AvatarUser {...user} />
          </BetweenSection.Left>
          <BetweenSection.Right>
            <LinkButton onClick={() => handleUpdateCardButtonClick(meca.categoryId)} textSize="main">
              수정하기
            </LinkButton>
            <LinkButton onClick={handleDeleteCardButtonClick} textSize="main">
              삭제하기
            </LinkButton>
          </BetweenSection.Right>
        </BetweenSection>
        <MecaDeleteDialog
          cardId={cardId}
          categoryId={meca.categoryId}
          cardTitle={meca.title}
          visible={isDeleteModalVisible}
          onClose={deleteModalClose}
        />
        <Devide />
        <MecaPost {...meca} />
        <PostSection>
          <PostSection.Title>History</PostSection.Title>
          <PostSection.Body indented={false} boxed={false}>
            <QuizHistoryTimeline resourceId={cardId} resourceType="cards" />
          </PostSection.Body>
        </PostSection>
      </PostPageLayout>
    </AuthPageProvider>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const cardId = context.params?.cardId;
  if (!cardId || typeof cardId !== 'string') {
    throw { message: '잘못된 요청' };
  }
  const { card } = await useMeca.fetchQuery(false, cardId, queryClient);
  context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  return {
    cardId,
    categoryId: card.categoryId,
  };
});

export default MecaById;
