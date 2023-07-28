/* eslint-disable no-param-reassign */
import { NextApiRequest } from 'next';

import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import nookies from 'nookies';

import { hasBrowser } from '@/utils/common';

export interface AxiosErrorResponse {
  message: string;
  status: HttpStatusCode;
}

export type ServerRequestType = { cookies: Partial<{ [key: string]: string }> } | NextApiRequest;

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const unauthInstance = axios.create({ baseURL, timeout: 8000 });
const authInstance = axios.create({ baseURL, timeout: 8000 });
const serverInstance = axios.create({ baseURL: '', timeout: 8000 });

let request = <ServerRequestType>{};
let accessTokenInstace = '';

export const setRequest = (_request: ServerRequestType) => {
  request = _request;
};

export const setAccessToken = (_accessToken: string) => {
  accessTokenInstace = _accessToken;
};

export const getTokens = (_request: ServerRequestType) => {
  const { accessToken, refreshToken } = nookies.get({ req: _request });
  return { accessToken, refreshToken };
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
  (response): any => getObject(response),
  (error) => genErrorResponse(error),
);

authInstance.interceptors.request.use((config) => {
  const accessToken = hasBrowser() ? accessTokenInstace : getTokens(request).accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

unauthInstance.interceptors.response.use(
  (response): any => getObject(response),
  (error) => genErrorResponse(error),
);

authInstance.interceptors.response.use(
  (response): any => getObject(response),
  (error) => {
    if (!hasBrowser() && error.response.status === 401) {
      // TODO add token refresh logic
    }
    return genErrorResponse(error);
  },
);
export { unauthInstance, authInstance, serverInstance };
