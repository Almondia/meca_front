import type { ImageUploadRequest } from '@/types/domain';

import { authInstance, serverInstance } from './config/instance';

const imageApi = {
  getPresignedUrl: ({ extension, purpose, fileName }: ImageUploadRequest) =>
    authInstance.get<never, { url: string; objectKey: string }>('/api/v1/images/presign', {
      params: {
        extension,
        purpose,
        fileName,
      },
    }),
  uploadImage: (image: File, requestProps: ImageUploadRequest) =>
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
};

export default imageApi;
