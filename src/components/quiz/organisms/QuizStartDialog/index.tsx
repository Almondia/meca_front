import { useRouter } from 'next/router';

import { useCallback, useState } from 'react';

import { DefaultModalOptions } from '@/types/common';

import InputGroup from '@/components/@common/molecules/InputGroup';
import Modal from '@/components/@common/molecules/Modal';
import Selection from '@/components/@common/molecules/Selection';
import useQuiz from '@/hooks/quiz/useQuiz';
import useInput from '@/hooks/useInput';

interface QuizStartDialogProps extends DefaultModalOptions {
  categoryId: string;
  title: string;
  quizNum: number;
}

const MIN_QUIZNUM = 1;
const QUIZ_SECONDS = ['15초', '30초', '60초'] as const;

const QuizStartDialog = ({ categoryId, title, quizNum, visible, onClose }: QuizStartDialogProps) => {
  const { input: quizCountInput, onInputChange: onQuizCountChange } = useInput(quizNum.toString());
  const [quizTimeInput, setQuizTimeInput] = useState<(typeof QUIZ_SECONDS)[number]>('15초');

  const quizCountInputNumber = parseInt(quizCountInput, 10);
  const router = useRouter();
  const { initQuiz } = useQuiz(() => {
    onClose();
    router.push('/quiz');
  });

  const isCountValid = (count: number) => count >= MIN_QUIZNUM && count <= quizNum;

  const handleCountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentCount = parseInt(e.target.value, 10);
    if (!isCountValid(currentCount)) {
      return;
    }
    onQuizCountChange(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartButtonClick = async () => {
    if (!isCountValid(quizCountInputNumber)) {
      return;
    }
    initQuiz({
      categoryId,
      limit: quizCountInputNumber,
      algorithm: 'random',
      title,
      quizTime: parseInt(quizTimeInput, 10),
    });
  };

  return (
    <Modal visible={visible} hasCloseIcon onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Label>문제 수 (최대 {quizNum})</InputGroup.Label>
          {quizNum > 1 ? (
            <>
              <InputGroup.Input.Range
                name="quiz-count"
                value={quizCountInput === '' ? '1' : quizCountInput}
                min={MIN_QUIZNUM}
                max={quizNum}
                onChange={onQuizCountChange}
                ariaLabel="input-quizcount-range"
              />
              <InputGroup.Input.Text
                type="number"
                name="quiz-count2"
                value={quizCountInput}
                placeholder=""
                onChange={handleCountChange}
                ariaLabel="input-quizcount-text"
              />
            </>
          ) : (
            <p>
              <br />
            </p>
          )}
        </InputGroup>
        <InputGroup>
          <InputGroup.Label>문제 풀이 시간</InputGroup.Label>
          <Selection
            innerTexts={[...QUIZ_SECONDS]}
            onClicks={QUIZ_SECONDS.map((quiz) => () => setQuizTimeInput(quiz))}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.ConfirmButton onClick={handleStartButtonClick}>시작하기</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default QuizStartDialog;
