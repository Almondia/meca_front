import { serverInstance } from './config/instance';

const utilApi = {
  revalidate: async (urls: string[], type?: 'private' | 'public', secret?: string) =>
    serverInstance.post('/api/revalidate', { urls, type }, { params: { secret } }),
};

export default utilApi;
