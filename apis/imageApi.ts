import { ImageUploadRequestType } from '@/types/domain';

import { authInstance, serverInstance } from './config/instance';

const imageApi = {
  getPresignedUrl: ({ extension, purpose, fileName }: ImageUploadRequestType) =>
    authInstance.get<never, { url: string; objectKey: string }>('/api/v1/presign/images/upload', {
      params: {
        extension,
        purpose,
        fileName,
      },
    }),
  uploadImage: (image: File, url: string) =>
    serverInstance.post(
      '/api/image',
      {
        file: image,
        url,
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
