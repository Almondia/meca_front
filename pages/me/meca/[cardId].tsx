/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react/jsx-no-useless-fragment */
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';

import { Devide, PostSection } from '@/styles/layout';
import useMeca from '@/hooks/meca/useMeca';
import MecaPost from '@/components/organisms/MecaPost';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/layout/PageTitle';
import CardWriterInfo from '@/components/molcules/PostWriterInfo';
import useUser from '@/hooks/useUser';
import useModal from '@/hooks/useModal';
import MecaDeleteDialog from '@/components/molcules/MecaDeleteDialog';

export interface MecaPageProps {
  cardId: string;
}

const MecaPage = ({ cardId }: MecaPageProps) => {
  const router = useRouter();
  const { meca } = useMeca(cardId);
  const { user } = useUser();
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();

  const handleDeleteLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    deleteModalOpen();
  }, []);

  useEffect(() => {
    if (!meca) {
      router.back();
    }
  }, [meca]);

  return (
    <>
      {meca && user && (
        <PostSection>
          <PageTitle>{meca.title}</PageTitle>
          <CardWriterInfo name={user.name} profile={user.profile}>
            <CardWriterInfo.Modification>
              <Link href="/">수정하기</Link>
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

// TODO: 다른사람 카드 조회 처리 추가
export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const { cardId } = context.query;
  if (!cardId || typeof cardId !== 'string') {
    throw { url: '/' };
  }
  const meca = await queryClient.fetchQuery([queryKey.meca, cardId], () => mecaApi.getMyCardById(cardId));
  return {
    cardId,
    categoryId: meca.categoryId,
  };
});

export default MecaPage;
