import React from 'react';

import useCategoryPost from '@/hooks/category/useCategoryPost';
import useCategoryUpdate from '@/hooks/category/useCategoryUpdate';
import useInput from '@/hooks/useInput';
import { DefaultModalOptions } from '@/types/common';

import InputGroup from '../InputGroup';
import Modal from '../Modal';

export interface CategoryUpdateDialogProps extends DefaultModalOptions {
  categoryId?: string;
  categoryTitle: string;
}

const CategoryUpdateDialog = ({ visible, onClose, categoryId, categoryTitle }: CategoryUpdateDialogProps) => {
  const { input: title, onInputChange: onTitleChange } = useInput(categoryTitle);
  const { updateCategory } = useCategoryUpdate(onClose);
  const { addCategory } = useCategoryPost();
  const handleUpdateClick = () => {
    if (title === '' || title === categoryTitle) {
      return;
    }
    categoryId ? updateCategory({ categoryId, title }) : addCategory({ title });
    onClose();
  };
  const keyword = categoryId ? '수정' : '추가';
  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon={false}>
      <Modal.Title>카테고리 {keyword}하기</Modal.Title>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Label>제목 {keyword}하기</InputGroup.Label>
          <InputGroup.Input.Text
            name="category-title"
            value={title}
            onChange={onTitleChange}
            placeholder="카테고리 제목 입력"
            ariaLabel="input-category-title"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.ConfirmButton onClick={handleUpdateClick}>{categoryId ? '수정하기' : '등록하기'}</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default CategoryUpdateDialog;
