/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import QuillReader from '@/components/molcules/Editor/QuillNoSSRReader';
import PostBody from '@/components/molcules/PostBody';
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

const SelectPostBody = ({ question, answer }: MecaPostBodyProps) => {
  const questionArray = stringToJsonStringArrayConverter(question);
  return (
    <>
      <PostBody>
        <PostBody.Title>Question</PostBody.Title>
        <PostBody.Content>
          <QuillReader content={questionArray[0]} />
        </PostBody.Content>
      </PostBody>
      <PostBody>
        {[...questionArray].slice(1).map((q, i) => (
          <QuestionItemContainer key={i}>
            <PostBody.Title>Q{i + 1}.</PostBody.Title>
            <QuestionItemText isAnswer={answer === (i + 1).toString()}>{q}</QuestionItemText>
          </QuestionItemContainer>
        ))}
      </PostBody>
    </>
  );
};

export default SelectPostBody;
