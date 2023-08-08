import { useRouter } from 'next/router';

import { useCallback } from 'react';

import ButtonGroup from '@/components/@common/molecules/ButtonGroup';
import Modal from '@/components/@common/molecules/Modal';
import useModal from '@/hooks/useModal';

interface MecaUploadButtonGroupProps {
  onSubmit: () => void;
}

const MecaUploadButtonGroup = ({ onSubmit }: MecaUploadButtonGroupProps) => {
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
        onSuccess={onSubmit}
        onCancel={handleOpenConfirmModalClick}
        successText="작성 완료"
        cancelText="나가기"
      />
      <Modal visible={visible} onClose={close} hasCloseIcon={false}>
        <Modal.Body>작성한 내용이 모두 사라집니다?</Modal.Body>
        <Modal.ConfirmButton onClick={handleCancelClick}>나가기</Modal.ConfirmButton>
        <Modal.CloseButton onClick={close}>취소</Modal.CloseButton>
      </Modal>
    </>
  );
};

export default MecaUploadButtonGroup;
