/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import { TextBody } from '@/styles/common';
import { TextAreaBox } from '@/styles/layout';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import { MecaPostContainer, MecaPostContentBody, MecaPostContentTitle, MecaPostContentWrapper } from '../styled';
import { PostBodyProps } from '../type';

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

const SelectPostBody = ({ question, answer }: PostBodyProps) => {
  const questionArray = stringToJsonStringArrayConverter(question);
  return (
    <MecaPostContentWrapper>
      <MecaPostContainer>
        <MecaPostContentTitle>Question</MecaPostContentTitle>
        <MecaPostContentBody>{questionArray[0]}</MecaPostContentBody>
      </MecaPostContainer>
      <MecaPostContainer>
        {[...questionArray].slice(1).map((q, i) => (
          <QuestionItemContainer key={i}>
            <MecaPostContentTitle>Q{i + 1}.</MecaPostContentTitle>
            <QuestionItemText isAnswer={answer === (i + 1).toString()}>{q}</QuestionItemText>
          </QuestionItemContainer>
        ))}
      </MecaPostContainer>
    </MecaPostContentWrapper>
  );
};

export default SelectPostBody;
