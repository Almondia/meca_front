import { useCallback, useState } from 'react';

import alertToast from '@/utils/toastHandler';

const useImage = (initalImage: string | File | undefined) => {
  const [image, setImage] = useState<string | File | undefined>(initalImage);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target?.files?.[0];
    if (uploadedImage?.type.indexOf('image/') === -1) {
      alertToast('이미지를 업로드 해주세요', 'warning');
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
