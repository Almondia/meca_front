import ButtonGroup from '@/components/@common/molecules/ButtonGroup';
import InputGroup from '@/components/@common/molecules/InputGroup';
import Modal from '@/components/@common/molecules/Modal';
import Selection from '@/components/@common/molecules/Selection';
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
  const handleRetryOptionSelect = (option: string) => {
    setRetryOption(option);
  };
  // eslint-disable-next-line no-nested-ternary
  const selectionForcedIndexValue = retryOption === '100' ? 1 : retryOption === '0' ? 0 : -1;
  return (
    <>
      <Devide />
      <ButtonGroup successText="다시풀기" onSuccess={open} cancelText="목록으로" />
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
            forceSelectedIndex={selectionForcedIndexValue}
            innerTexts={['틀린것만 풀기', '전부 다시 풀기']}
            onClicks={[() => handleRetryOptionSelect('0'), () => handleRetryOptionSelect('100')]}
          />
        </Modal.Body>
        <Modal.ConfirmButton onClick={() => onRetry(parseInt(retryOption, 10))}>다시풀기!</Modal.ConfirmButton>
        <Modal.CloseButton onClick={close}>취소</Modal.CloseButton>
      </Modal>
    </>
  );
};

export default QuizRetryController;