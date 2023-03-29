/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { GetServerSideProps } from 'next';

import CardControl from '@/components/organisms/CardControl';
import { Devide, PostSection } from '@/styles/layout';
import useMeca from '@/hooks/meca/useMeca';
import MecaPost from '@/components/organisms/MecaPost';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/layout/PageTitle';
import CardWriterInfo from '@/components/molcules/PostWriterInfo';
import useUser from '@/hooks/useUser';

export interface MecaPageProps {
  cardId: string;
}

const MecaPage = ({ cardId }: MecaPageProps) => {
  const { meca } = useMeca(cardId);
  const { user } = useUser();
  return (
    <>
      {meca && user && (
        <PostSection>
          <PageTitle>{meca.title}</PageTitle>
          <CardWriterInfo isMine name={user.name} profile={user.profile} />
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
