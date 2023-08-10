import { useRouter } from 'next/router';

import { memo, useCallback } from 'react';

import ButtonGroup from '@/components/@common/molecules/ButtonGroup';
import Modal from '@/components/@common/molecules/Modal';
import { useGetValidatedMecaInputsContext } from '@/components/meca/molecules/MecaWriteContextProvider';
import useMecaWrite from '@/hooks/meca/useMecaWrite';
import useModal from '@/hooks/useModal';

const MecaUploadButtonGroup = memo(() => {
  const { visible, open, close } = useModal();
  const router = useRouter();
  const { createMeca, updateMeca } = useMecaWrite();
  const getValidatedInputs = useGetValidatedMecaInputsContext();

  const handleOpenConfirmModalClick = useCallback(() => {
    !visible && open();
  }, [visible, open]);

  const handleCancelClick = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = () => {
    const data = getValidatedInputs();
    if (!data) {
      return;
    }
    data.cardId ? updateMeca({ ...data, cardId: data.cardId }) : createMeca(data);
  };

  return (
    <>
      <ButtonGroup
        onSuccess={handleSubmit}
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
});

export default MecaUploadButtonGroup;
