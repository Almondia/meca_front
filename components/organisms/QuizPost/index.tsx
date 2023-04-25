/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';

import { QuillNoSSRReader } from '@/components/editor/QuillNoSSRWrapper';
import ButtonGroup from '@/components/molcules/ButtonGroup';
import useInput from '@/hooks/useInput';
import { TextCaption } from '@/styles/common';
import { MECA_RESPONE_TO_TAG, MecaTagResponseType, MecaTagType, QuizSucceedType } from '@/types/domain';

import KeywordQuiz from './content/KeywordQuiz';
import OxQuiz from './content/OxQuiz';
import SelectQuiz from './content/SelectQuiz';
import { QuizPostWrapper } from './styled';
import { QuizContentComponentType } from './type';

export interface QuizPostProps {
  question: string;
  answer: string;
  description: string;
  quizType: MecaTagResponseType;
  isAnswerState: boolean;
  handleSucceed: QuizSucceedType;
}

const QUIZ_CONTENTS: Record<MecaTagType, QuizContentComponentType> = {
  ox: OxQuiz,
  desc: OxQuiz,
  keyword: KeywordQuiz,
  select: SelectQuiz,
};

const QuizPost = ({ question, answer, description, quizType, isAnswerState, handleSucceed }: QuizPostProps) => {
  const QuizContent = QUIZ_CONTENTS[MECA_RESPONE_TO_TAG[quizType]];
  const Editor = QuillNoSSRReader({ content: description });
  const { input: answerInput, onInputChange: answerInputChange, inputReset } = useInput('');
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
      if (isAnswerState) {
        return;
      }
      answerInputChange(e);
    },
    [isAnswerState],
  );
  useEffect(() => {
    !isAnswerState && inputReset();
  }, [isAnswerState]);

  return (
    <QuizPostWrapper>
      <QuizContent
        value={answerInput}
        onChange={handleChange}
        question={question}
        answer={answer}
        isAnswerState={isAnswerState}
      />
      {isAnswerState && (
        // TODO: 아코디언 UI 구성하기
        <div>
          <p>설명보기</p>
          <Editor />
        </div>
      )}
      <div>
        <TextCaption>* 정답제출을 반드시 해야 채점됩니다!</TextCaption>
        <TextCaption>* 모든 문제 풀이 완료전 이탈 시 풀이가 기록되지 않습니다</TextCaption>
      </div>
      <ButtonGroup
        successText={handleSucceed.succeedText}
        onSuccess={() => handleSucceed.succeedHandler(answerInput)}
        cancelText="나가기"
        hasCancelWarning
        cancelWarningText="현재 페이지로 다시 돌아올 수 없습니다?"
      />
    </QuizPostWrapper>
  );
};

export default QuizPost;
