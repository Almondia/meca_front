import styled from 'styled-components';

import ConetentsBox from '@/components/atoms/ContentsBox';
import QuillReader from '@/components/molcules/Editor/QuillNoSSRReader';
import InputGroup from '@/components/molcules/InputGroup';
import { TextBodyTitle } from '@/styles/common';

import { QuizContentWrapper } from '../styled';
import { QuizContentProps } from '../type';

const KeywordAnswerInputContainer = styled.div<{ isAnswerState: boolean }>`
  opacity: ${(props) => (props.isAnswerState ? 0.6 : 1)};
`;

const KeywordQuiz = ({ question, answer, isAnswerState, value, onChange }: QuizContentProps) => (
  <QuizContentWrapper>
    <ConetentsBox
      header="Q."
      body={
        <TextBodyTitle>
          <QuillReader content={question} />
        </TextBodyTitle>
      }
      isColumn
    />
    {isAnswerState && <ConetentsBox header="A." body={answer} isColumn />}
    <KeywordAnswerInputContainer isAnswerState={isAnswerState}>
      <InputGroup>
        <InputGroup.Label>{isAnswerState ? '나의 정답' : '키워드를 입력하세요'}</InputGroup.Label>
        <InputGroup.Input.Text
          name="quiz"
          value={value}
          onChange={onChange}
          placeholder="정답 입력하기"
          disabled={isAnswerState}
        />
      </InputGroup>
    </KeywordAnswerInputContainer>
  </QuizContentWrapper>
);

export default KeywordQuiz;
