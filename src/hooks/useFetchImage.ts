import imageApi from '@/apis/imageApi';
import { ImageUploadRequestType } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

const useFetchImage = () => {
  const uploadImage = async (props: ImageUploadRequestType, image: File) => {
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
