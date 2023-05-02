import React from 'react';

import MecaTag from '@/components/atoms/MecaTag';
import Editor from '@/components/molcules/Editor';
import PostBody from '@/components/molcules/PostBody';
import PostSubInfo from '@/components/molcules/PostSubInfo';
import { TextCaption } from '@/styles/common';
import { MECA_RESPONE_TO_TAG, MecaTagResponseType, MecaType } from '@/types/domain';
import { getRelativeTimeByDateTime } from '@/utils/common';

import MecaPostBody from './mecaBody';
import { MecaPostWrapper } from './styled';
import { MecaPostBodyComponentType } from './type';

export type MecaPostProps = Omit<MecaType, 'categoryId' | 'title' | 'cardId'>;

const ContentBody: Record<MecaTagResponseType, MecaPostBodyComponentType> = {
  MULTI_CHOICE: MecaPostBody.SelectPostBody,
  DESCRIPTION: MecaPostBody.DefaultPostBody,
  KEYWORD: MecaPostBody.DefaultPostBody,
  OX_QUIZ: MecaPostBody.OxPostBody,
};

const MecaPost = ({ cardType, question, answer, description, createdAt }: MecaPostProps) => {
  const DescriptionEditor = Editor.Reader({ content: description || '내용이 없습니다.' });
  const MecaBody = ContentBody[cardType];
  return (
    <MecaPostWrapper>
      <PostSubInfo>
        <PostSubInfo.Content title="문제유형">
          <MecaTag tagName={MECA_RESPONE_TO_TAG[cardType]} scale={0.8} />
        </PostSubInfo.Content>
        <PostSubInfo.Content title="작성일">
          <TextCaption>{getRelativeTimeByDateTime(createdAt)}</TextCaption>
        </PostSubInfo.Content>
      </PostSubInfo>
      <MecaBody question={question} answer={answer} />
      <PostBody>
        <PostBody.Title>Description</PostBody.Title>
        <PostBody.Content>
          <DescriptionEditor />
        </PostBody.Content>
      </PostBody>
    </MecaPostWrapper>
  );
};

export default React.memo(MecaPost);
