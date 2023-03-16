import axios, { AxiosError, AxiosResponse } from 'axios';

import storage from '@/utils/storageHandler';
import { TokenType } from '@/types/domain';
import snakeToCamel from '@/utils/snakeToCamel';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const unauthInstance = axios.create({ baseURL });
const authInstance = axios.create({ baseURL });

function getObject(response: AxiosResponse) {
  const { data } = response;
  return data !== null && typeof data === 'object' ? snakeToCamel(response.data) : {};
}

function genErrorResponse(error: any) {
  const errorResponse = {
    ...error.response.data,
    status: error.response.status,
  };
  return Promise.reject(errorResponse);
}

authInstance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${storage.getItem<TokenType>('token')?.accessToken}`;
  return config;
});

unauthInstance.interceptors.response.use(
  (response): any => getObject(response),
  (error) => genErrorResponse(error),
);

authInstance.interceptors.response.use(
  (response): any => getObject(response),
  (error) => {
    // TODO add token refresh logic
    if (error.status === 401) {
      storage.removeItem('token');
    }
    return genErrorResponse(error);
  },
);
export { unauthInstance, authInstance };
