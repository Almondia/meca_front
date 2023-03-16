import React from 'react';

import { DefaultModalOptions } from '@/types/common';
import useInput from '@/hooks/useInput';
import useCategoryUpdate from '@/hooks/category/useCategoryUpdate';

import Modal from '../Modal';
import InputGroup from '../InputGroup';

export interface CategoryUpdateDialogProps extends DefaultModalOptions {
  categoryId: string;
  categoryTitle: string;
}

const CategoryUpdateDialog = ({ visible, onClose, categoryId, categoryTitle }: CategoryUpdateDialogProps) => {
  const { input: title, onInputChange: onTitleChange } = useInput(categoryTitle);
  const { updateCategory } = useCategoryUpdate();
  const handleUpdateClick = () => {
    if (title === '' || title === categoryTitle) {
      return;
    }
    updateCategory({
      categoryId,
      title,
    });
    onClose();
  };
  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon={false}>
      <Modal.Title>카테고리 수정하기</Modal.Title>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Label>제목 수정하기</InputGroup.Label>
          <InputGroup.Input.Text
            name="category-update"
            value={title}
            onChange={onTitleChange}
            placeholder="카테고리 제목 입력"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.ConfirmButton onClick={handleUpdateClick}>수정하기</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default CategoryUpdateDialog;
