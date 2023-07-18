/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetStaticPaths, GetStaticProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/atoms/PageTitle';
import MetaHead from '@/components/common/MetaHead';
import AvatarUser from '@/components/molcules/AvatarUser';
import BetweenControlGroup from '@/components/molcules/BetweenControlGroup';
import MecaPost from '@/components/organisms/MecaPost';
import useMeca from '@/hooks/meca/useMeca';
import { isrAspect } from '@/libs/renderAspect';
import NotFound from '@/pages/404';
import queryKey from '@/query/queryKey';
import { Devide, PostSection } from '@/styles/layout';
import { MecaType, UserProfile } from '@/types/domain';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';
import { extractFirstImageSrc } from '@/utils/imageHandler';
import { extractCombinedUUID } from '@/utils/uuidHandler';

export interface MecaByIdProps {
  cardId: string;
  thumbnailUrl: string;
  questionText: string;
}

const MecaById = ({ cardId, thumbnailUrl, questionText }: MecaByIdProps) => {
  const { meca: response } = useMeca(cardId, true);
  if (!response) {
    return <NotFound />;
  }
  const meca = response as MecaType & UserProfile;
  return (
    <>
      <MetaHead
        title={`${meca.title} - by ${meca.name}`}
        description={questionText}
        image={thumbnailUrl}
        ogType="article"
      />
      <PostSection>
        <PageTitle>{meca.title}</PageTitle>
        <br />
        <BetweenControlGroup>
          <BetweenControlGroup.Left>
            <AvatarUser name={meca.name} profile={meca.profile} />
          </BetweenControlGroup.Left>
        </BetweenControlGroup>
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
  const { question, description } = await queryClient.fetchQuery([queryKey.meca, cardId], () =>
    mecaApi.getSharedCardById(cardId),
  );
  const thumbnailUrl = extractFirstImageSrc(question.concat(description)) ?? '';
  const questionText = extractTextFromHTML(question);
  return {
    propsAspect: {
      cardId,
      thumbnailUrl,
      questionText,
    },
  };
});

export default MecaById;
