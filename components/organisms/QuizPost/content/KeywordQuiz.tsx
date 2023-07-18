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

const KeywordAnswerSpan = styled.span<{ isCorrectAnswer: boolean }>`
  color: ${(props) => (props.isCorrectAnswer ? 'var(--color-success)' : 'var(--color-warning)')};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
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
          body={
            <KeywordAnswerSpan
              isCorrectAnswer={
                value ? answer.split(',').some((ans) => ans.trim().toLowerCase() === value.toLowerCase()) : false
              }
            >
              {value || '시간초과!!'}
            </KeywordAnswerSpan>
          }
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
