import Modal from '@/components/@common/molecules/Modal';
import useMecaDelete from '@/hooks/meca/useMecaDelete';
import { DefaultModalOptions } from '@/types/common';

interface MecaDeleteDialogProps extends DefaultModalOptions {
  cardId: string;
  categoryId: string;
  cardTitle: string;
}

const MecaDeleteDialog = ({ onClose, visible, cardId, categoryId, cardTitle }: MecaDeleteDialogProps) => {
  const { deleteMeca } = useMecaDelete();
  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon={false}>
      <Modal.Title>MeCa 삭제하기</Modal.Title>
      <Modal.Body>
        {cardTitle && `'${cardTitle}'`}
        <br /> 카드를 삭제합니다
      </Modal.Body>
      <Modal.ConfirmButton onClick={() => deleteMeca({ cardId, categoryId })}>삭제하기</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default MecaDeleteDialog;
