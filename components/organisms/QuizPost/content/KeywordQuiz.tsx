import styled from 'styled-components';

import ContentsBox from '@/components/atoms/ContentsBox';
import QuillReader from '@/components/molcules/Editor/QuillNoSSRReader';
import InputGroup from '@/components/molcules/InputGroup';
import { TextBodyTitle } from '@/styles/common';

import { QuizContentWrapper } from '../styled';
import { QuizContentProps } from '../type';

const KeywordAnswerInputContainer = styled.div`
  margin-top: -24px;
  & > div > div {
    border: none;
    background-color: var(--color-lightgray);
  }
`;

const KeywordQuiz = ({ question, answer, isAnswerState, value, onChange }: QuizContentProps) => (
  <QuizContentWrapper>
    <ContentsBox
      header="Question."
      body={
        <TextBodyTitle>
          <QuillReader content={question} />
        </TextBodyTitle>
      }
      isColumn
    />
    {isAnswerState ? (
      <>
        <ContentsBox header="Answer." body={answer} isColumn />
        <ContentsBox
          header="Your Answer!"
          body={value || <span style={{ color: 'var(--color-warning)' }}>시간초과!!</span>}
          isColumn
        />
      </>
    ) : (
      <ContentsBox
        header="Let's Answer!"
        body={
          <KeywordAnswerInputContainer>
            <InputGroup>
              <InputGroup.Input.Text name="quiz" value={value} onChange={onChange} placeholder="정답 입력" />
            </InputGroup>
          </KeywordAnswerInputContainer>
        }
        isColumn
      />
    )}
  </QuizContentWrapper>
);

export default KeywordQuiz;
