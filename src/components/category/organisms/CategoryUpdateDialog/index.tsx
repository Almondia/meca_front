import { useState } from 'react';

import type { DefaultModalOptions } from '@/types/common';

import Input from '@/components/@common/atoms/Input';
import InputGroup from '@/components/@common/molecules/InputGroup';
import Modal from '@/components/@common/molecules/Modal';
import ThumbnailUploader from '@/components/@common/organisms/ThumbnailUploader';
import useCategoryUpdate from '@/hooks/category/useCategoryUpdate';
import useGlobalLoading from '@/hooks/useGlobalLoading';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import { IMAGE_EXTENTIONS } from '@/utils/constants';
import { Constraints } from '@/utils/validation';

interface CategoryUpdateDialogProps extends DefaultModalOptions {
  categoryId?: string;
  categoryTitle: string;
  isShared?: boolean;
  thumbnail: string;
}

const CategoryUpdateDialog = ({
  visible,
  onClose,
  categoryId,
  categoryTitle,
  isShared,
  thumbnail,
}: CategoryUpdateDialogProps) => {
  const [shared, setShared] = useState<boolean>(isShared ?? false);
  const { input: title, onInputChange: onTitleChange } = useInput(categoryTitle);
  const { inputsValidState, validateAll } = useInputValidation(1);
  const { asyncCallbackLoader } = useGlobalLoading();
  const { image, onSetFileImage, onDelete: onDeleteImage, onUploadLocalImage } = useImage(thumbnail);
  const { addCategory, updateCategory, uploadThumbnail } = useCategoryUpdate(onClose);
  const actionKeyword = categoryId ? '수정' : '추가';

  const handleUpdateClick = async () => {
    const { hasInvalid } = validateAll([() => Constraints.categoryTitle(title)]);
    if (hasInvalid) {
      return;
    }
    if (title === categoryTitle && image === thumbnail && shared === isShared) {
      onClose();
      return;
    }
    const uploadedThumbnail = (await asyncCallbackLoader<string | undefined>(() => uploadThumbnail(image))) ?? '';
    categoryId
      ? updateCategory({ categoryId, title, thumbnail: uploadedThumbnail, shared, prevShared: isShared })
      : addCategory({ title, thumbnail: uploadedThumbnail });
  };

  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon={false}>
      <Modal.Title>카테고리 {actionKeyword}하기</Modal.Title>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Label>썸네일 업로드</InputGroup.Label>
          <ThumbnailUploader
            image={image}
            onSetImage={onSetFileImage}
            onDelete={onDeleteImage}
            onUpload={onUploadLocalImage}
          />
          <InputGroup.Description descLists={[`${IMAGE_EXTENTIONS.join('/')} 업로드 가능`]} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Label>제목 {actionKeyword}하기</InputGroup.Label>
          <InputGroup.Input.Text
            name="category-title"
            value={title}
            onChange={onTitleChange}
            placeholder="카테고리 제목 입력"
            ariaLabel="input-category-title"
          />
          <InputGroup.Validation visible={!inputsValidState[0].isValid}>
            {inputsValidState[0].message}
          </InputGroup.Validation>
        </InputGroup>
        {categoryId && (
          <InputGroup>
            <InputGroup.Label>공개 여부</InputGroup.Label>
            <Input.CheckBox
              name={`${categoryId}-category-share`}
              isChecked={shared}
              onCheck={() => setShared((prev) => !prev)}
            >
              {shared ? '공개됨' : '비공개'}
            </Input.CheckBox>
          </InputGroup>
        )}
      </Modal.Body>
      <Modal.ConfirmButton onClick={handleUpdateClick}>등록하기</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default CategoryUpdateDialog;
