/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useCallback } from 'react';

import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/atoms/PageTitle';
import MetaHead from '@/components/common/MetaHead';
import CardWriterInfo from '@/components/molcules/PostWriterInfo';
import MecaPost from '@/components/organisms/MecaPost';
import useMeca from '@/hooks/meca/useMeca';
import useModal from '@/hooks/useModal';
import { ssrAspect } from '@/libs/renderAspect';
import NotFound from '@/pages/404';
import queryKey from '@/query/queryKey';
import { Devide, PostSection } from '@/styles/layout';
import { MecaType, UserProfile } from '@/types/domain';
import { PRIVATE_CACHE, PUBLIC_CACHE } from '@/utils/constants';
import { extractCombinedUUID } from '@/utils/uuidHandler';

const MecaDeleteDialog = dynamic(() => import('@/components/organisms/MecaDeleteDialog'));

export interface MecaByIdProps {
  cardId: string;
  isShared: boolean;
  name: string;
  profile: string;
}

const MecaById = ({ cardId, isShared, name, profile }: MecaByIdProps) => {
  const { meca } = useMeca(cardId, isShared);
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const handleDeleteLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    deleteModalOpen();
  }, []);

  if (!meca) {
    return <NotFound />;
  }
  return (
    <>
      <MetaHead title={meca.title} description={meca.question} ogType="article" />
      <PostSection>
        <PageTitle>{meca.title}</PageTitle>
        <br />
        <CardWriterInfo name={name} profile={profile}>
          {!isShared && (
            <CardWriterInfo.Modification>
              <Link href={`/mecas/write/${meca.categoryId}?cardId=${cardId}`}>수정하기</Link>
              <Link href="/" onClick={handleDeleteLinkClick}>
                삭제하기
              </Link>
            </CardWriterInfo.Modification>
          )}
          {!isShared && (
            <MecaDeleteDialog
              cardId={cardId}
              categoryId={meca.categoryId}
              cardTitle={meca.title}
              visible={isDeleteModalVisible}
              onClose={deleteModalClose}
            />
          )}
        </CardWriterInfo>
        <Devide />
        <MecaPost {...meca} />
      </PostSection>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient, currentMemberId) => {
  const memberCardId = context.params?.memberCardId;
  if (!memberCardId || typeof memberCardId !== 'string') {
    throw { message: '잘못된 요청' };
  }
  const { uuid1: writerId, uuid2: cardId } = extractCombinedUUID(memberCardId);
  if (!writerId || !cardId) {
    throw { message: '잘못된 요청' };
  }
  const isShared = currentMemberId !== writerId;
  const cardByIdResponse = (await queryClient.fetchQuery(
    [queryKey.meca, cardId],
    isShared ? () => mecaApi.getSharedCardById(cardId) : () => mecaApi.getMyCardById(cardId),
  )) as MecaType & UserProfile;
  const { name, profile, memberId } = isShared
    ? { ...cardByIdResponse }
    : (queryClient.getQueryData<UserProfile>([queryKey.me]) as UserProfile);
  const cacheValue = isShared ? PUBLIC_CACHE : PRIVATE_CACHE;
  context.res.setHeader('Cache-Control', cacheValue);
  return { cardId, isShared, name, profile, memberId };
}, true);

export default MecaById;
