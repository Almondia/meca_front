import useCategoryDelete from '@/hooks/useCategoryDelete';
import { DefaultModalOptions } from '@/types/common';

import Modal from '../Modal';

export interface CategoryDeleteDialogProps extends DefaultModalOptions {
  categoryId: string;
  categoryTitle: string;
}

const CategoryDeleteDialog = ({ onClose, visible, categoryId, categoryTitle }: CategoryDeleteDialogProps) => {
  const { deleteCategory } = useCategoryDelete();
  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon={false}>
      <Modal.Title>카테고리 삭제하기</Modal.Title>
      <Modal.Body>{categoryTitle}을 삭제합니다.</Modal.Body>
      <Modal.ConfirmButton onClick={() => deleteCategory(categoryId)}>삭제하기</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default CategoryDeleteDialog;
