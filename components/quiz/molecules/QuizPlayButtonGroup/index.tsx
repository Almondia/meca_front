import { useRouter } from 'next/router';

import { useCallback } from 'react';

import ButtonGroup from '@/components/@common/molecules/ButtonGroup';
import Modal from '@/components/@common/molecules/Modal';
import useModal from '@/hooks/useModal';

interface QuizPlayButtonGroupProps {
  succeedText: string;
  onSucceed: () => void;
}

const QuizPlayButtonGroup = ({ succeedText, onSucceed }: QuizPlayButtonGroupProps) => {
  const { visible, open, close } = useModal();
  const router = useRouter();

  const handleOpenConfirmModalClick = useCallback(() => {
    !visible && open();
  }, [visible, open]);

  const handleCancelClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <ButtonGroup
        onSuccess={onSucceed}
        onCancel={handleOpenConfirmModalClick}
        successText={succeedText}
        cancelText="나가기"
      />
      <Modal visible={visible} onClose={close} hasCloseIcon={false}>
        <Modal.Body>현재 페이지로 다시 돌아올 수 없습니다?</Modal.Body>
        <Modal.ConfirmButton onClick={handleCancelClick}>나가기</Modal.ConfirmButton>
        <Modal.CloseButton onClick={close}>취소</Modal.CloseButton>
      </Modal>
    </>
  );
};

export default QuizPlayButtonGroup;
