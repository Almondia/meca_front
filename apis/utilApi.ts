import { generateJWT } from '@/utils/jwtHandler';

import { serverInstance } from './config/instance';

const utilApi = {
  revalidate: async (url: string) => {
    const token = await generateJWT({ url }, '2s');
    return serverInstance.post('/api/revalidate', undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default utilApi;
