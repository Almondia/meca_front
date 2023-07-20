import Selection from '@/components/atoms/Selection';
import ButtonGroup from '@/components/molcules/ButtonGroup';
import InputGroup from '@/components/molcules/InputGroup';
import Modal from '@/components/molcules/Modal';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';
import { Devide } from '@/styles/layout';

export interface QuizRetryControllerProps {
  title: string;
  onRetry: (optionScore: number) => void;
}

const QuizRetryController = ({ title, onRetry }: QuizRetryControllerProps) => {
  const { visible, open, close } = useModal();
  const { input: retryOption, onInputChange: onRetryOptionChange, setInput: setRetryOption } = useInput('100');
  const handleRetryOptionSelect = (option: string) => {
    setRetryOption(option);
  };
  return (
    <>
      <Devide />
      <ButtonGroup successText="다시풀기" onSuccess={open} cancelText="목록으로" hasCancelWarning={false} />
      <Modal visible={visible} onClose={close} isClickAwayable hasCloseIcon>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Label>기준 점수</InputGroup.Label>
            <InputGroup.Description descLists={[`'${retryOption}점' 이하의 문제들을 다시 풀이합니다.`]} />
            <InputGroup.Input.Range
              value={retryOption}
              max={100}
              min={0}
              name="retry-score-input"
              onChange={onRetryOptionChange}
              ariaLabel="id-retry-score-range"
            />
          </InputGroup>
          <Selection
            innerTexts={['전부 다시 풀기', '틀린것만 풀기']}
            onClicks={[() => handleRetryOptionSelect('100'), () => handleRetryOptionSelect('0')]}
          />
        </Modal.Body>
        <Modal.ConfirmButton onClick={() => onRetry(parseInt(retryOption, 10))}>다시풀기!</Modal.ConfirmButton>
        <Modal.CloseButton onClick={close}>취소</Modal.CloseButton>
      </Modal>
    </>
  );
};

export default QuizRetryController;
