/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import LinkButton from '@/components/@common/atoms/LinkButton';
import PageTitle from '@/components/@common/atoms/PageTitle';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import BetweenControlGroup from '@/components/@common/molecules/BetweenControlGroup';
import PostSection from '@/components/@common/molecules/PostSection';
import AuthPageProvider from '@/components/@util/AuthPageProvider';
import MetaHead from '@/components/@util/MetaHead';
import MecaPost from '@/components/meca/organisms/MecaPost';
import useMeca from '@/hooks/meca/useMeca';
import useModal from '@/hooks/useModal';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, PostPageLayout } from '@/styles/layout';
import { MyProfile } from '@/types/domain';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';

const MecaDeleteDialog = dynamic(() => import('@/components/meca/organisms/MecaDeleteDialog'), { ssr: false });
const QuizHistoryList = dynamic(() => import('@/components/quiz/organisms/QuizHistoryList'));

export interface MecaPageProps {
  cardId: string;
}

const MecaById = ({ cardId }: MecaPageProps) => {
  const { meca } = useMeca(cardId);
  const { user } = useUser() as { user: MyProfile };
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const router = useRouter();
  const handleUpdateCardButtonClick = () => {
    if (meca) {
      router.push(`/mecas/write/${meca.categoryId}?cardId=${cardId}`);
    }
  };
  const handleDeleteCardButtonClick = () => {
    !isDeleteModalVisible && deleteModalOpen();
  };
  return (
    <AuthPageProvider reload>
      {meca && (
        <>
          <MetaHead title={`${meca.title}- by ${user?.name}`} ogType="article" />
          <PostPageLayout>
            <PageTitle>{meca.title}</PageTitle>
            <br />
            <BetweenControlGroup>
              <BetweenControlGroup.Left>
                <AvatarUser {...user} />
              </BetweenControlGroup.Left>
              <BetweenControlGroup.Right>
                <LinkButton onClick={handleUpdateCardButtonClick} textSize="main">
                  수정하기
                </LinkButton>
                <LinkButton onClick={handleDeleteCardButtonClick} textSize="main">
                  삭제하기
                </LinkButton>
              </BetweenControlGroup.Right>
            </BetweenControlGroup>
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
                <QuizHistoryList resourceId={cardId} resourceType="cards" excludeRows={['card-id', 'quiz-type']} />
              </PostSection.Body>
            </PostSection>
          </PostPageLayout>
        </>
      )}
    </AuthPageProvider>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const cardId = context.params?.cardId;
  if (!cardId || typeof cardId !== 'string') {
    throw { message: '잘못된 요청' };
  }
  const { categoryId } = await useMeca.fetchQuery(false, cardId, queryClient);
  context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  return {
    cardId,
    categoryId,
  };
});

export default MecaById;
