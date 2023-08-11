import { ImageUploadRequest } from '@/types/domain';

import imageApi from '@/apis/imageApi';
import alertToast from '@/utils/toastHandler';

const useFetchImage = () => {
  const uploadImage = async (props: ImageUploadRequest, image: File) => {
    try {
      const { uploadedImageUrl } = await imageApi.uploadImage(image, { ...props });
      return uploadedImageUrl;
    } catch (e: any) {
      alertToast(e?.message ?? '이미지 업로드 실패', 'warning');
      return undefined;
    }
  };

  return { uploadImage };
};

export default useFetchImage;
