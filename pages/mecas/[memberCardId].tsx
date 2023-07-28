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
  memberId?: string;
  thumbnailUrl: string;
  questionText: string;
}

const MecaById = ({ cardId, memberId, thumbnailUrl, questionText }: MecaByIdProps) => {
  const { meca: response } = useMeca(cardId, true, memberId);
  if (!response) {
    return <NotFound isMessageVisible message="요청하신 페이지가 없거나 비공개 처리되어있어요!" />;
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
  try {
    const { question, description } = await queryClient.fetchQuery([queryKey.meca, cardId], () =>
      mecaApi.getSharedCardById(cardId),
    );
    const thumbnailUrl = extractFirstImageSrc(question.concat(description)) ?? '';
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

export default MecaById;
