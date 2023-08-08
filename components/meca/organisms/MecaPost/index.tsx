import dynamic from 'next/dynamic';

import { memo } from 'react';

import RelativeDate from '@/components/@common/atoms/RelativeDate';
import IconTag from '@/components/@common/molecules/IconTag';
import PostBody from '@/components/@common/molecules/PostBody';
import PostSubInfo from '@/components/@common/molecules/PostSubInfo';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';
import { TextCaption } from '@/styles/common';
import { MecaTagType, MecaType } from '@/types/domain';
import { MECA_TAGS } from '@/utils/constants';

import { DefaultPostBody, OxPostBody, SelectPostBody } from './mecaBody';
import { MecaPostWrapper } from './styled';
import { MecaPostBodyComponentType } from './type';

const QuizHistoryList = dynamic(() => import('@/components/quiz/organisms/QuizHistoryList'));

type MecaPostProps = Omit<MecaType, 'categoryId' | 'title'>;

const ContentBody: Record<MecaTagType, MecaPostBodyComponentType> = {
  MULTI_CHOICE: SelectPostBody,
  ESSAY: DefaultPostBody,
  KEYWORD: DefaultPostBody,
  OX_QUIZ: OxPostBody,
};

const MecaPost = memo(({ cardId, cardType, question, answer, description, createdAt }: MecaPostProps) => {
  const MecaBody = ContentBody[cardType];
  return (
    <MecaPostWrapper>
      <PostSubInfo>
        <PostSubInfo.Content title="문제유형">
          <IconTag {...MECA_TAGS[cardType]} scale={0.8} />
        </PostSubInfo.Content>
        <PostSubInfo.Content title="작성일">
          <TextCaption>
            <RelativeDate date={createdAt} />
          </TextCaption>
        </PostSubInfo.Content>
      </PostSubInfo>
      <MecaBody question={question} answer={answer} />
      <PostBody>
        <PostBody.Title>Description</PostBody.Title>
        <PostBody.Content>
          <QuillReader content={description || '내용이 없습니다.'} />
        </PostBody.Content>
      </PostBody>
      <PostBody>
        <PostBody.Title>History</PostBody.Title>
        <PostBody.Content hasBackground={false} hasIndent={false}>
          {/* FIX: need fix */}
          <QuizHistoryList resourceId={cardId} resourceType="cards" excludeRows={['card-id', 'quiz-type']} />
        </PostBody.Content>
      </PostBody>
    </MecaPostWrapper>
  );
});

export default MecaPost;
