import useMecaDelete from '@/hooks/meca/useMecaDelete';
import { DefaultModalOptions } from '@/types/common';

import Modal from '../Modal';

export interface MecaDeleteDialogProps extends DefaultModalOptions {
  cardId: string;
}

const MecaDeleteDialog = ({ onClose, visible, cardId }: MecaDeleteDialogProps) => {
  const { deleteMeca } = useMecaDelete();
  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon={false}>
      <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
      <Modal.ConfirmButton onClick={() => deleteMeca(cardId)}>삭제하기</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default MecaDeleteDialog;
