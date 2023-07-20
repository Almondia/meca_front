/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';

import ContentsBox from '@/components/atoms/ContentsBox';
import ButtonGroup from '@/components/molcules/ButtonGroup';
import QuillReader from '@/components/molcules/Editor/QuillNoSSRReader';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import { TextCaption } from '@/styles/common';
import { MECA_RESPONE_TO_TAG, MecaTagResponseType, MecaTagType, QuizSucceedType } from '@/types/domain';
import { Constraints } from '@/utils/validation';

import DescriptionQuiz from './content/DescriptionQuiz';
import KeywordQuiz from './content/KeywordQuiz';
import OxQuiz from './content/OxQuiz';
import SelectQuiz from './content/SelectQuiz';
import { QuizEditorWrapper, QuizPostWrapper } from './styled';
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
  desc: DescriptionQuiz,
  keyword: KeywordQuiz,
  select: SelectQuiz,
};

const QuizPost = ({ question, answer, description, quizType, isAnswerState, handleSucceed }: QuizPostProps) => {
  const QuizContent = QUIZ_CONTENTS[MECA_RESPONE_TO_TAG[quizType]];
  const { input: answerInput, onInputChange: answerInputChange, inputReset } = useInput('');
  const { inputsValidState, validateAll, resetValidateState } = useInputValidation(1);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
      if (isAnswerState) {
        return;
      }
      answerInputChange(e);
    },
    [isAnswerState],
  );

  const handleSucceedClick = () => {
    if (isAnswerState) {
      resetValidateState();
      handleSucceed.succeedHandler();
      return;
    }
    const { hasInvalid } = validateAll([() => Constraints.cardAnswer(answerInput, MECA_RESPONE_TO_TAG[quizType])]);
    !hasInvalid && handleSucceed.succeedHandler(answerInput);
  };

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
        invalidAnswerMessage={inputsValidState[0].isValid ? undefined : inputsValidState[0].message}
      />
      {isAnswerState && description && (
        <ContentsBox
          header="Commentary."
          isColumn
          body={
            <QuizEditorWrapper data-testid="id-quizpost-editor">
              <QuillReader content={description} />
            </QuizEditorWrapper>
          }
        />
      )}
      <div>
        <TextCaption>&nbsp;&nbsp;- 주어진 시간 내에 정답을 제출해야 채점됩니다!</TextCaption>
        <TextCaption>&nbsp;&nbsp;- 불러온 모든 문제들을 풀면 최종 결과를 확인할 수 있습니다!</TextCaption>
        <TextCaption>&nbsp;&nbsp;- 풀이 도중 이탈 시 불러운 퀴즈 정보는 모두 만료됩니다.</TextCaption>
        <TextCaption>&nbsp;&nbsp;- 주관식 점수는 키워드 적중도로 계산되며 단순 흥미 요소입니다.</TextCaption>
      </div>
      <ButtonGroup
        successText={handleSucceed.succeedText}
        onSuccess={handleSucceedClick}
        cancelText="나가기"
        hasCancelWarning
        cancelWarningText="현재 페이지로 다시 돌아올 수 없습니다?"
      />
    </QuizPostWrapper>
  );
};

export default QuizPost;
