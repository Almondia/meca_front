import { useCallback, useEffect, useState } from 'react';

import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import InputGroup from '@/components/molcules/InputGroup';
import Modal from '@/components/molcules/Modal';
import ThumbnailUploader from '@/components/molcules/ThumbnailUploader';
import useCategoryPost from '@/hooks/category/useCategoryPost';
import useCategoryUpdate from '@/hooks/category/useCategoryUpdate';
import useFetchImage from '@/hooks/useFetchImage';
import useGlobalLoading from '@/hooks/useGlobalLoading';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';
import { DefaultModalOptions } from '@/types/common';
import { IMAGE_EXTENTIONS } from '@/types/domain';

export interface CategoryUpdateDialogProps extends DefaultModalOptions {
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
  const { input: title, onInputChange: onTitleChange } = useInput(categoryTitle);
  const { image, onSetFileImage, onDelete: onDeleteImage, onUploadLocalImage } = useImage(thumbnail);
  const [shared, setShared] = useState<boolean>(isShared ?? false);
  const { uploadImage } = useFetchImage();
  const { updateCategory, isSuccess: isUpdateSuccess } = useCategoryUpdate();
  const { addCategory, isSuccess: isPostSuccess } = useCategoryPost();
  const { asyncCallbackLoader } = useGlobalLoading();

  useEffect(() => {
    if (isUpdateSuccess || isPostSuccess) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateSuccess, isPostSuccess]);

  const getUploadedThumbnail = useCallback(async () => {
    let requestedThumbnail: string | undefined = typeof image === 'string' ? image : thumbnail;
    if (image instanceof File) {
      requestedThumbnail = await uploadImage(
        {
          purpose: 'thumbnail',
          extension: thumbnail
            ? (thumbnail.split('/thumbnail/')[1].split('.')[1] as (typeof IMAGE_EXTENTIONS)[number])
            : (image.type.replace('image/', '') as (typeof IMAGE_EXTENTIONS)[number]),
          fileName: `${Date.now()}-category-thumbnail`,
        },
        image as File,
      );
    }
    return requestedThumbnail;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleUpdateClick = async () => {
    const inputTitle = title.trim();
    if (inputTitle === '') {
      return;
    }
    if (inputTitle === categoryTitle && image === thumbnail && shared === isShared) {
      onClose();
      return;
    }
    const requestedThumbnail = await asyncCallbackLoader<string | undefined>(getUploadedThumbnail);
    if (requestedThumbnail === undefined) {
      return;
    }
    categoryId
      ? updateCategory({
          categoryId,
          title: inputTitle,
          thumbnail: requestedThumbnail,
          shared,
          prevShared: isShared ?? false,
        })
      : addCategory({ title: inputTitle, thumbnail: requestedThumbnail });
  };

  const keyword = categoryId ? '수정' : '추가';
  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon={false}>
      <Modal.Title>카테고리 {keyword}하기</Modal.Title>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Label>썸네일 업로드</InputGroup.Label>
          <ThumbnailUploader
            image={image}
            onSetImage={onSetFileImage}
            onDelete={onDeleteImage}
            onUpload={onUploadLocalImage}
          />
          <InputGroup.Description
            descLists={['jpg, jpeg, png, gif 파일 업로드 가능', 'gif 이미지는 리사이징 할 수 없습니다.']}
          />
        </InputGroup>
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
        {categoryId && (
          <InputGroup>
            <InputGroup.Label>공개 여부: &nbsp;{shared ? '공개' : '비공개'}</InputGroup.Label>
            <ToggleSwitch
              toggleName="카테고리 공개여부 설정 토글"
              initialState={shared}
              onClick={() => setShared((prev) => !prev)}
            />
          </InputGroup>
        )}
      </Modal.Body>
      <Modal.ConfirmButton onClick={handleUpdateClick}>{categoryId ? '수정하기' : '등록하기'}</Modal.ConfirmButton>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
};

export default CategoryUpdateDialog;
