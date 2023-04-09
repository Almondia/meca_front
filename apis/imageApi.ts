import { ImageUploadRequestType } from '@/types/domain';

import { authInstance } from './config/instance';

const imageApi = {
  getPresignedUrl: ({ extension, purpose, fileName }: ImageUploadRequestType) =>
    authInstance.get<never, { url: string; objectKey: string }>('/api/v1/presign/images/upload', {
      params: {
        extension,
        purpose,
        fileName,
      },
    }),
};

export default imageApi;
