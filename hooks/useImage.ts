import { useCallback, useState } from 'react';

import { IMAGE_EXTENTIONS, ImageUploadRequestType } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

const useImage = (initalImage: string | undefined) => {
  const [image, setImage] = useState<string | File | undefined>(initalImage);

  const validImageFile = (uploadImage?: File) => {
    if (!uploadImage || uploadImage.type.indexOf('image/') === -1) {
      return { valid: false, message: '올바른 이미지 파일을 등록하세요' };
    }
    if (!IMAGE_EXTENTIONS.includes(uploadImage.type.replace('image/', '') as (typeof IMAGE_EXTENTIONS)[number])) {
      return { valid: false, message: 'jpg/jpeg/png/gif 확장자만 업로드 가능합니다.' };
    }
    if (uploadImage.name.split('.').length !== 2) {
      return { valid: false, message: '경로를 제외한 이미지 파일 이름에 "." 이 포함되어있습니다.' };
    }
    return { valid: true, message: '' };
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target?.files?.[0];
    const checkValidImage = validImageFile(uploadedImage);
    if (!checkValidImage.valid) {
      alertToast(checkValidImage.message, 'warning');
      e.target.files = null;
      return;
    }
    setImage(uploadedImage);
  }, []);

  const onDelete = useCallback(() => {
    setImage('');
  }, []);

  const getImageInfo = (uploadedImage: File): Omit<ImageUploadRequestType, 'purpose'> => {
    const fileName = uploadedImage.name.split('.')[0];
    const extension = uploadedImage.type.replace('image/', '') as (typeof IMAGE_EXTENTIONS)[number];
    return { fileName, extension };
  };

  return { image, validImageFile, getImageInfo, onChange, onDelete };
};

export default useImage;
