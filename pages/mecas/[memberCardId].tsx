/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetStaticPaths, GetStaticProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/atoms/PageTitle';
import MetaHead from '@/components/common/MetaHead';
import AvatarUser from '@/components/molcules/AvatarUser';
import MecaPost from '@/components/organisms/MecaPost';
import useMeca from '@/hooks/meca/useMeca';
import { isrAspect } from '@/libs/renderAspect';
import NotFound from '@/pages/404';
import queryKey from '@/query/queryKey';
import { Devide, PostSection } from '@/styles/layout';
import { MecaType, UserProfile } from '@/types/domain';
import { extractCombinedUUID } from '@/utils/uuidHandler';

export interface MecaByIdProps {
  cardId: string;
}

const MecaById = ({ cardId }: MecaByIdProps) => {
  const { meca: response } = useMeca(cardId, true);
  if (!response) {
    return <NotFound />;
  }
  const meca = response as MecaType & UserProfile;
  return (
    <>
      <MetaHead title={meca.title} description={meca.question} ogType="article" />
      <PostSection>
        <PageTitle>{meca.title}</PageTitle>
        <br />
        <AvatarUser name={meca.name} profile={meca.profile} />
        <Devide />
        <MecaPost {...meca} />
      </PostSection>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = isrAspect(async ({ params }, queryClient) => {
  if (!params) {
    throw { message: '잘못된 요청' };
  }
  const { memberCardId } = params;
  if (typeof memberCardId !== 'string') {
    throw { message: '잘못된 요청' };
  }
  const { uuid1: memberId, uuid2: cardId } = extractCombinedUUID(memberCardId);
  if (!memberId || !cardId) {
    throw { message: '잘못된 요청' };
  }
  await queryClient.fetchQuery([queryKey.meca, cardId], () => mecaApi.getSharedCardById(cardId));
  return {
    propsAspect: {
      cardId,
    },
  };
});

export default MecaById;
