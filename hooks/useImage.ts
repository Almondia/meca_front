import { useCallback, useState } from 'react';

import { IMAGE_EXTENTIONS } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

const useImage = (initalImage: string | undefined) => {
  const [image, setImage] = useState<string | File | undefined>(initalImage);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target?.files?.[0];
    if (
      uploadedImage?.type.indexOf('image/') === -1 ||
      !IMAGE_EXTENTIONS.includes(uploadedImage?.type.replace('image/', '') as (typeof IMAGE_EXTENTIONS)[number])
    ) {
      alertToast('이미지 파일을 등록해주세요', 'warning');
      e.target.files = null;
      return;
    }
    setImage(uploadedImage);
  }, []);

  const onDelete = useCallback(() => {
    setImage('');
  }, []);

  return { image, onChange, onDelete };
};

export default useImage;
