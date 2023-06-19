/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react/jsx-no-useless-fragment */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import mecaApi from '@/apis/mecaApi';
import LinkButton from '@/components/atoms/LinkButton';
import PageTitle from '@/components/atoms/PageTitle';
import MetaHead from '@/components/common/MetaHead';
import AvatarUser from '@/components/molcules/AvatarUser';
import BetweenControlGroup from '@/components/molcules/BetweenControlGroup';
import MecaPost from '@/components/organisms/MecaPost';
import useMeca from '@/hooks/meca/useMeca';
import useModal from '@/hooks/useModal';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, PostSection } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';

const MecaDeleteDialog = dynamic(() => import('@/components/organisms/MecaDeleteDialog'));

export interface MecaPageProps {
  cardId: string;
}

const MecaById = ({ cardId }: MecaPageProps) => {
  const { meca } = useMeca(cardId);
  const { user } = useUser();
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
    <>
      {meca && user && (
        <>
          <MetaHead title={meca.title} description={meca.description} />
          <PostSection>
            <PageTitle>{meca.title}</PageTitle>
            <br />
            <BetweenControlGroup>
              <BetweenControlGroup.Left>
                <AvatarUser name={user.name} profile={user.profile} />
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
          </PostSection>
        </>
      )}
    </>
  );
};

// middleware rewrite로 접근되는 본인 카드 조회 페이지
export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const cardId = context.params?.cardId;
  if (!cardId || typeof cardId !== 'string') {
    throw { message: '잘못된 요청' };
  }
  const meca = await queryClient.fetchQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId));
  context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  return {
    cardId,
    categoryId: meca.categoryId,
  };
});

export default MecaById;
