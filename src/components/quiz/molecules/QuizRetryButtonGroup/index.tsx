import ButtonGroup from '@/components/@common/molecules/ButtonGroup';
import Modal from '@/components/@common/molecules/Modal';
import QuizPlayScoreFilterInputGroup from '@/components/quiz/molecules/QuizPlayScoreFilterInputGroup';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';
import { Devide } from '@/styles/layout';

interface QuizRetryControllerProps {
  title: string;
  onRetry: (optionScore: number) => void;
}

const QuizRetryController = ({ title, onRetry }: QuizRetryControllerProps) => {
  const { visible, open, close } = useModal();
  const { input: retryOption, onInputChange: onRetryOptionChange, setInput: setRetryOption } = useInput('100');
  return (
    <>
      <Devide />
      <ButtonGroup successText="다시풀기" onSuccess={open} cancelText="목록으로" />
      <Modal visible={visible} onClose={close} isClickAwayable hasCloseIcon>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Body>
          <QuizPlayScoreFilterInputGroup
            input={retryOption}
            onInputChange={onRetryOptionChange}
            setInput={setRetryOption}
          />
        </Modal.Body>
        <Modal.ConfirmButton onClick={() => onRetry(parseInt(retryOption, 10))}>다시풀기!</Modal.ConfirmButton>
        <Modal.CloseButton onClick={close}>취소</Modal.CloseButton>
      </Modal>
    </>
  );
};

export default QuizRetryController;
