import { useRouter } from 'next/router';

import { useEffect, useMemo, useState } from 'react';

import { DefaultModalOptions } from '@/types/common';

import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import InputGroup from '@/components/@common/molecules/InputGroup';
import Modal from '@/components/@common/molecules/Modal';
import Tab from '@/components/@common/molecules/Tab';
import QuizPlayScoreFilterInputGroup from '@/components/quiz/molecules/QuizPlayScoreFilterInputGroup';
import { QuizStartDialogEmptyContent } from '@/components/quiz/organisms/QuizStartDialog/styled';
import useQuiz from '@/hooks/quiz/useQuiz';
import useQuizInfoBeforePlay from '@/hooks/quiz/useQuizInfoBeforePlay';
import useInput from '@/hooks/useInput';
import alertToast from '@/utils/toastHandler';

interface QuizStartDialogProps extends DefaultModalOptions {
  categoryId: string;
  title: string;
}

const QUIZ_SECONDS = [15, 30, 60, 90] as const;

const QuizStartDialog = ({ categoryId, title, visible, onClose }: QuizStartDialogProps) => {
  const router = useRouter();
  const { initQuiz } = useQuiz(
    () => {
      onClose();
      router.push('/quiz');
    },
    () => alertToast('퀴즈를 진행할 수 없습니다. 잠시 후 시도해주세요', 'info'),
  );
  const { isLoading, isEmpty, getQuizCountByFilteredScore: getCount } = useQuizInfoBeforePlay(categoryId);
  const { input: tryScore, onInputChange: onTryScoreChange, setInput: setTryScore } = useInput('100');
  const currentMaxCount = useMemo(() => getCount(parseInt(tryScore, 10)), [tryScore, getCount]);
  const { input: quizCountInput, onInputChange: onQuizCountChange, setInput: setQuizCountInput } = useInput('');
  const [quizTimeInput, setQuizTimeInput] = useState<(typeof QUIZ_SECONDS)[number]>(15);

  const isCountValid = (count: number) => count > 0 && count <= currentMaxCount;

  useEffect(() => {
    const changedMaxCount = getCount(parseInt(tryScore, 10));
    setQuizCountInput((prev) => (parseInt(prev, 10) > changedMaxCount ? changedMaxCount.toString() : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryScore, getCount]);

  const handleStartButtonClick = async () => {
    const quizCountInputNumber = parseInt(quizCountInput, 10);
    const quizLimit = Number.isNaN(quizCountInputNumber) ? currentMaxCount : quizCountInputNumber;
    if (!isCountValid(quizLimit) || !QUIZ_SECONDS.some((q) => q === quizTimeInput)) {
      return;
    }
    initQuiz({
      categoryId,
      limit: quizCountInputNumber,
      score: parseInt(tryScore, 10),
      title,
      quizTime: quizTimeInput,
    });
  };

  return (
    <Modal visible={visible} hasCloseIcon onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Body>
        {isLoading && <LoadSpinner width="100%" height="225px" />}
        {isEmpty ? (
          <QuizStartDialogEmptyContent>퀴즈 정보가 없어요!</QuizStartDialogEmptyContent>
        ) : (
          <>
            <InputGroup>
              <InputGroup.Label>문제 수 (최대 30문제)</InputGroup.Label>
              <InputGroup.Input.Range
                name="quiz-count"
                value={quizCountInput === '' ? currentMaxCount.toString() : quizCountInput}
                min={0}
                max={currentMaxCount}
                onChange={onQuizCountChange}
                ariaLabel="input-quizcount-range"
              />
            </InputGroup>
            <QuizPlayScoreFilterInputGroup input={tryScore} onInputChange={onTryScoreChange} setInput={setTryScore} />
            <InputGroup>
              <InputGroup.Label>문제 풀이 시간</InputGroup.Label>
              <Tab
                tabButtonProps={QUIZ_SECONDS.map((quizTime) => ({
                  name: `${quizTime}초`,
                  onClick: () => setQuizTimeInput(quizTime),
                }))}
              />
            </InputGroup>
          </>
        )}
      </Modal.Body>
      {!isEmpty && <Modal.ConfirmButton onClick={handleStartButtonClick}>시작하기</Modal.ConfirmButton>}
      <Modal.CloseButton onClick={onClose}>나가기</Modal.CloseButton>
    </Modal>
  );
};

export default QuizStartDialog;
