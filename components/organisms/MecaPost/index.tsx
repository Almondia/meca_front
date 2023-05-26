import React from 'react';

import { RelativeDateText } from '@/components/common/RelativeDateText';
import { QuillReader } from '@/components/molcules/Editor/QuillNoSSRReader';
import MecaTag from '@/components/molcules/MecaTag';
import PostBody from '@/components/molcules/PostBody';
import PostSubInfo from '@/components/molcules/PostSubInfo';
import { TextCaption } from '@/styles/common';
import { MECA_RESPONE_TO_TAG, MecaTagResponseType, MecaType } from '@/types/domain';

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
  const DescriptionEditor = QuillReader({ content: description || '내용이 없습니다.' });
  const DateText = RelativeDateText({ date: createdAt });
  const MecaBody = ContentBody[cardType];
  return (
    <MecaPostWrapper>
      <PostSubInfo>
        <PostSubInfo.Content title="문제유형">
          <MecaTag tagName={MECA_RESPONE_TO_TAG[cardType]} scale={0.8} />
        </PostSubInfo.Content>
        <PostSubInfo.Content title="작성일">
          <TextCaption>
            <DateText />
          </TextCaption>
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
