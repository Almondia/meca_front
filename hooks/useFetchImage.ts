import { useQueryClient } from '@tanstack/react-query';

import imageApi from '@/apis/imageApi';
import queryKey from '@/query/queryKey';
import { ImageUploadRequestType } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

const useFetchImage = () => {
  const queryClient = useQueryClient();
  const getPresignedUrl = async (props: ImageUploadRequestType) => {
    const { url, objectKey } = await queryClient.fetchQuery(
      [queryKey.imageUrl, props.purpose, props.fileName, props.extension],
      () => imageApi.getPresignedUrl({ ...(props as ImageUploadRequestType) }),
      {
        staleTime: 4 * 60 * 1000,
        cacheTime: 0,
      },
    );
    return { url, objectKey };
  };

  const uploadImage = async (props: ImageUploadRequestType, image: File) => {
    try {
      const { url, objectKey } = await getPresignedUrl(props);
      await imageApi.uploadImage(image, url);
      return objectKey;
    } catch {
      alertToast('이미지 업로드 실패', 'warning');
      return undefined;
    }
  };

  return { uploadImage };
};

export default useFetchImage;
