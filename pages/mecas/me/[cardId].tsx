/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react/jsx-no-useless-fragment */
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import React, { useCallback } from 'react';

import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/layout/PageTitle';
import MecaDeleteDialog from '@/components/molcules/MecaDeleteDialog';
import CardWriterInfo from '@/components/molcules/PostWriterInfo';
import MecaPost from '@/components/organisms/MecaPost';
import useMeca from '@/hooks/meca/useMeca';
import useModal from '@/hooks/useModal';
import useUser from '@/hooks/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, PostSection } from '@/styles/layout';

export interface MecaPageProps {
  cardId: string;
}

const MecaById = ({ cardId }: MecaPageProps) => {
  const { meca } = useMeca(cardId);
  const { user } = useUser();
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();

  const handleDeleteLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    deleteModalOpen();
  }, []);

  return (
    <>
      {meca && user && (
        <PostSection>
          <PageTitle>{meca.title}</PageTitle>
          <br />
          <CardWriterInfo name={user.name} profile={user.profile}>
            <CardWriterInfo.Modification>
              <Link href={`/mecas/write/${meca.categoryId}?cardId=${cardId}`}>수정하기</Link>
              <Link href="/" onClick={handleDeleteLinkClick}>
                삭제하기
              </Link>
            </CardWriterInfo.Modification>
          </CardWriterInfo>
          <MecaDeleteDialog cardId={cardId} visible={isDeleteModalVisible} onClose={deleteModalClose} />
          <Devide />
          <MecaPost {...meca} />
        </PostSection>
      )}
    </>
  );
};

// middleware rewrite로 접근되는 본인 카드 조회 페이지
export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const cardId = context.params?.cardId;
  if (!cardId || typeof cardId !== 'string') {
    throw { url: '/' };
  }
  const meca = await queryClient.fetchQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId));
  return {
    cardId,
    categoryId: meca.categoryId,
  };
});

export default MecaById;
