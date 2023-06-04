import { useCallback, useEffect, useRef, useState } from 'react';

import { validImageFile } from '@/utils/imageHandler';
import alertToast from '@/utils/toastHandler';

const useImage = (initalImage: string | undefined) => {
  const [image, setImage] = useState<string | File | undefined>(initalImage);
  const hiddenImageRef = useRef<HTMLInputElement>();

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

  const onUploadLocalImage = useCallback(() => {
    hiddenImageRef.current?.click();
  }, []);

  const onSetFileImage = useCallback((newImage: File) => {
    const event = new CustomEvent<HTMLInputElement>('change') as unknown as React.ChangeEvent<HTMLInputElement>;
    Object.defineProperty(event, 'target', {
      value: {
        files: [newImage],
      },
    });
    onChange(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const imageInputElement = document.createElement('input');
    imageInputElement.setAttribute('type', 'file');
    imageInputElement.setAttribute('name', 'file-upload');
    imageInputElement.setAttribute('accept', 'image/*');
    const handleChange = (e: Event) => {
      onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };
    imageInputElement.addEventListener('change', handleChange);
    hiddenImageRef.current = imageInputElement;
    return () => {
      imageInputElement.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { hiddenImageRef, image, onChange, onDelete, onUploadLocalImage, onSetFileImage };
};

export default useImage;
