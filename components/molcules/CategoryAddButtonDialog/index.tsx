import { useEffect } from 'react';

import Button from '@/components/atoms/Button';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';
import useCategoryPost from '@/hooks/useCategoryPost';

import Modal from '../Modal';
import InputGroup from '../InputGroup';

const CategoryAddButtonDialog = () => {
  const { visible, open, close } = useModal();
  const { input, onInputChange, inputReset, changed } = useInput('');
  const { addCategory } = useCategoryPost(close);
  useEffect(() => {
    if (!visible) {
      inputReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleCategoryAddButtonClick = async () => {
    if (input === '') {
      return;
    }
    addCategory({
      title: input,
    });
  };

  return (
    <>
      <Button colorTheme="primary" onClick={open}>
        추가하기 +
      </Button>
      {visible && (
        <Modal visible={visible} onClose={close} hasCloseIcon={false} isClickAwayable={false}>
          <Modal.Title>카테고리 추가하기</Modal.Title>
          <Modal.Body>
            <InputGroup>
              <InputGroup.Label>카테고리 제목 입력</InputGroup.Label>
              <InputGroup.Validation visible={changed && input === ''}>제목을 입력하세요</InputGroup.Validation>
              <InputGroup.Input.Text name="title" value={input} onChange={onInputChange} placeholder="" />
            </InputGroup>
          </Modal.Body>
          <Modal.ConfirmButton onClick={handleCategoryAddButtonClick}>추가하기</Modal.ConfirmButton>
          <Modal.CloseButton onClick={close}>취소</Modal.CloseButton>
        </Modal>
      )}
    </>
  );
};

export default CategoryAddButtonDialog;
