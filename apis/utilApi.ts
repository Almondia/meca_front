import axios from 'axios';

import { generateJWT } from '@/utils/jwtHandler';

const utilApi = {
  revalidate: (url: string) => {
    const token = generateJWT({ url }, '2s');
    return axios.post('/api/revalidate', undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default utilApi;
