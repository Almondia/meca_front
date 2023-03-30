import { useRouter } from 'next/router';

import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import useInput from '@/hooks/useInput';
import { DefaultModalOptions } from '@/types/common';
import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import useQuiz from '@/hooks/meca/useQuiz';

import InputGroup from '../InputGroup';
import Modal from '../Modal';

export interface QuizStartDialogProps extends DefaultModalOptions {
  categoryId: string;
  title: string;
  quizNum: number;
}

const MIN_QUIZNUM = 1;

const QuizStartDialog = ({ categoryId, title, quizNum, visible, onClose }: QuizStartDialogProps) => {
  const { input: quizCountInput, onInputChange: onQuizCountChange } = useInput(quizNum.toString());
  const quizCountInputNumber = parseInt(quizCountInput, 10);

  const router = useRouter();
  const setQuizTime = useSetRecoilState(quizTimeState);
  const setQuizTitle = useSetRecoilState(quizTitleState);
  const { fetchQuizData } = useQuiz(categoryId, quizCountInputNumber, 'random');

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
    setQuizTime(30);
    setQuizTitle(title);
    await fetchQuizData();
    onClose();
    router.push('/quiz');
  };

  return (
    <Modal visible={visible} hasCloseIcon onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Label>문제 수 (최대 {quizNum})</InputGroup.Label>
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
        </InputGroup>
      </Modal.Body>
      <Modal.ConfirmButton onClick={handleStartButtonClick}>시작하기</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default QuizStartDialog;
