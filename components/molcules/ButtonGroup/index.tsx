import { useRouter } from 'next/router';

import { useCallback } from 'react';

import Button from '@/components/atoms/Button';
import useModal from '@/hooks/useModal';

import { ButtonGroupWrapper } from './styled';

import Modal from '../Modal';

export interface ButtonGroupProps {
  onSuccess: () => void;
  // [선택] 없을 경우 뒤로가기 동작이 발생합니다.
  onCancel?: () => void;
  successText: string;
  // [선택] 없을 경우 '취소하기' 텍스트가 사용됩니다
  cancelText?: string;
  hasCancelWarning?: boolean;
  cancelWarningText?: string;
}

const ButtonGroup = ({
  successText,
  cancelText = '취소하기',
  onSuccess,
  onCancel,
  cancelWarningText = '정말로 취소하시겠습니까?',
  hasCancelWarning,
}: ButtonGroupProps) => {
  const router = useRouter();
  const { visible, open, close } = useModal();

  const handleCancelClick = useCallback(() => {
    if (hasCancelWarning && !visible) {
      open();
      return;
    }
    visible && close();
    onCancel ? onCancel() : router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  return (
    <ButtonGroupWrapper>
      <Button width="180px" onClick={onSuccess} colorTheme="primary">
        {successText}
      </Button>
      <Button width="180px" onClick={handleCancelClick} colorTheme="cancel">
        {cancelText}
      </Button>
      {visible && (
        <Modal visible={visible} onClose={close} hasCloseIcon={false}>
          <Modal.Body>{cancelWarningText}</Modal.Body>
          <Modal.ConfirmButton onClick={handleCancelClick}>{cancelText}</Modal.ConfirmButton>
          <Modal.CloseButton onClick={close}>닫기</Modal.CloseButton>
        </Modal>
      )}
    </ButtonGroupWrapper>
  );
};

export default ButtonGroup;
