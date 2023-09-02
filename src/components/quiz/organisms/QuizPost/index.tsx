/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo } from 'react';

import type { MecaTag as MecaTagType } from '@/types/domain/meca';
import type { QuizSucceedType } from '@/types/domain/quiz';

import BoxedSection from '@/components/@common/molecules/BoxedSection';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';
import QuizInstruction from '@/components/quiz/atoms/QuizInstruction';
import QuizPlayButtonGroup from '@/components/quiz/molecules/QuizPlayButtonGroup';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { Constraints } from '@/utils/validation';

import { EssayQuiz, KeywordQuiz, OxQuiz, SelectQuiz } from './content';
import { QuizPostWrapper } from './styled';
import { QuizContentComponentType } from './type';

export interface QuizPostProps {
  cardId?: string;
  question: string;
  answer: string;
  description: string;
  quizType: MecaTagType;
  isAnswerState: boolean;
  handleSucceed: QuizSucceedType;
  score?: number;
  inputAnswer?: string;
}

const QUIZ_CONTENTS: Record<MecaTagType, QuizContentComponentType> = {
  OX_QUIZ: OxQuiz,
  ESSAY: EssayQuiz,
  KEYWORD: KeywordQuiz,
  MULTI_CHOICE: SelectQuiz,
};

const QuizPost = ({
  cardId,
  question,
  answer,
  description,
  quizType,
  isAnswerState,
  handleSucceed,
  score,
  inputAnswer,
}: QuizPostProps) => {
  const QuizContent = QUIZ_CONTENTS[quizType];
  const { input: answerInput, onInputChange: answerInputChange, inputReset } = useInput('');
  const { inputsValidState, validateAll, resetValidateState } = useInputValidation(1);
  const { question: normalizedQuestionText } = useMemo(
    () => getQuestionAnswerByCardType({ question, cardType: quizType }),
    [question, quizType],
  );
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
    const { hasInvalid } = validateAll([() => Constraints.cardAnswer(answerInput, quizType)]);
    !hasInvalid && handleSucceed.succeedHandler(answerInput);
  };

  useEffect(() => {
    !isAnswerState && inputReset();
  }, [isAnswerState]);

  return (
    <QuizPostWrapper>
      <BoxedSection header="Question." isColumn body={<QuillReader content={normalizedQuestionText} />} />
      <QuizContent
        cardId={cardId}
        value={isAnswerState ? inputAnswer ?? answerInput : answerInput}
        score={score}
        onChange={handleChange}
        question={question}
        answer={answer}
        isAnswerState={isAnswerState}
        invalidAnswerMessage={inputsValidState[0].isValid ? undefined : inputsValidState[0].message}
      />
      {isAnswerState && description && (
        <BoxedSection header="Commentary." isColumn body={<QuillReader content={description} />} />
      )}
      <QuizInstruction />
      <QuizPlayButtonGroup succeedText={handleSucceed.succeedText} onSucceed={handleSucceedClick} />
    </QuizPostWrapper>
  );
};

export default QuizPost;
