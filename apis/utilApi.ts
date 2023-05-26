import { serverInstance } from './config/instance';

const utilApi = {
  revalidate: async (urls: string[]) => serverInstance.post('/api/revalidate', { urls }),
};

export default utilApi;
