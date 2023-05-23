import { useCallback, useState } from 'react';

import { validImageFile } from '@/utils/imageHandler';
import alertToast from '@/utils/toastHandler';

const useImage = (initalImage: string | undefined) => {
  const [image, setImage] = useState<string | File | undefined>(initalImage);

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

  return { image, onChange, onDelete };
};

export default useImage;
