/* eslint-disable no-param-reassign */
import { AxiosResponse } from 'axios';

import { hasBrowser } from '@/utils/common';

import axios from './baseAxios';

const baseURL = '';
const unauthInstance = axios.create({ baseURL, timeout: 8000 });
const authInstance = axios.create({ baseURL, timeout: 8000 });
const serverInstance = axios.create({ baseURL: '', timeout: 8000 });

let accessTokenInstace = '';

export const setAccessTokenFromServerRequest = (_accessToken: string) => {
  accessTokenInstace = _accessToken;
};

export const setAccessToken = (_accessToken: string) => {
  accessTokenInstace = _accessToken;
};

function getObject(response: AxiosResponse) {
  const { data } = response;
  return data !== null && typeof data === 'object' ? response.data : {};
}

function genErrorResponse(error: any) {
  const errorResponse = {
    ...error.response?.data,
    status: error.response?.status,
  };
  return Promise.reject(errorResponse);
}

serverInstance.interceptors.request.use((config) => {
  config.baseURL = hasBrowser() ? '' : process.env.NEXT_ORIGIN;
  return config;
});

serverInstance.interceptors.response.use(
  (response) => getObject(response),
  (error) => genErrorResponse(error),
);

authInstance.interceptors.request.use((config) => {
  config.baseURL = hasBrowser() ? '' : process.env.NEXT_ORIGIN;
  const accessToken = accessTokenInstace;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

unauthInstance.interceptors.request.use((config) => {
  config.baseURL = hasBrowser() ? '' : process.env.NEXT_ORIGIN;
  return config;
});

unauthInstance.interceptors.response.use(
  (response) => getObject(response),
  (error) => genErrorResponse(error),
);

authInstance.interceptors.response.use(
  (response) => getObject(response),
  (error) => {
    if (!hasBrowser() && error.response.status === 401) {
      // TODO add token refresh logic
    }
    return genErrorResponse(error);
  },
);
export { unauthInstance, authInstance, serverInstance };
