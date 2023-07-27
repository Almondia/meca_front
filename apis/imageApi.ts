import { ImageUploadRequestType } from '@/types/domain';

import { authInstance, serverInstance } from './config/instance';

export interface BlurImageType {
  blurDataURL: string;
  img: {
    src: string;
    width: number;
    height: number;
  };
}

const imageApi = {
  getPresignedUrl: ({ extension, purpose, fileName }: ImageUploadRequestType) =>
    authInstance.get<never, { url: string; objectKey: string }>('/api/v1/presign/images/upload', {
      params: {
        extension,
        purpose,
        fileName,
      },
    }),
  uploadImage: (image: File, requestProps: ImageUploadRequestType) =>
    serverInstance.post<never, { uploadedImageUrl: string }>(
      '/api/image',
      {
        file: image,
        ...requestProps,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      },
    ),
  getBlurImage: async (url: string) => {
    try {
      const response = await serverInstance.get<never, BlurImageType>(
        `${process.env.NEXT_ORIGIN ?? ''}/api/image/blur`,
        { params: { url } },
      );
      return response;
    } catch (e) {
      return undefined;
    }
  },
};

export default imageApi;
