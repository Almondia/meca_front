/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import PostSection from '@/components/@common/molecules/PostSection';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';
import { TextBody } from '@/styles/common';
import { TextAreaBox } from '@/styles/layout';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import { MecaPostBodyProps } from '../type';

const QuestionItemContainer = styled.div`
  position: relative;
  display: flex;
  column-gap: 10px;
  margin-bottom: 10px;
`;

const QuestionItemText = styled(TextBody)<{ isAnswer: boolean }>`
  ${TextAreaBox};
  transform: translateY(-1px);
  font-weight: ${(props) => (props.isAnswer ? props.theme.fontWeight.bold : props.theme.fontWeight.regular)};
  color: ${(props) => (props.isAnswer ? 'var(--color-success)' : 'var(--color-text)')};
`;

export const SelectPostBody = ({ question, answer }: MecaPostBodyProps) => {
  const questionArray = stringToJsonStringArrayConverter(question);
  return (
    <>
      <PostSection>
        <PostSection.Title>Question</PostSection.Title>
        <PostSection.Body>
          <QuillReader content={questionArray[0]} />
        </PostSection.Body>
      </PostSection>
      <PostSection>
        {[...questionArray].slice(1).map((q, i) => (
          <QuestionItemContainer key={i}>
            <PostSection.Title>Q{i + 1}.</PostSection.Title>
            <QuestionItemText isAnswer={answer === (i + 1).toString()}>{q}</QuestionItemText>
          </QuestionItemContainer>
        ))}
      </PostSection>
    </>
  );
};
