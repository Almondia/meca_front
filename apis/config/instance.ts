/* eslint-disable no-param-reassign */
import axios, { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';

import snakeToCamel from '@/utils/snakeToCamel';
import { hasBrowser } from '@/utils/common';

import { deleteTokens, getTokens } from './tokenHandler';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const unauthInstance = axios.create({ baseURL });
const authInstance = axios.create({ baseURL });

let context = <GetServerSidePropsContext>{};
let accessTokenInstace = '';

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const setAccessToken = (_accessToken: string) => {
  accessTokenInstace = _accessToken;
};

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
  const accessToken = hasBrowser() ? accessTokenInstace : getTokens(context).accessToken;
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
    // TODO add token refresh logic
    if (!hasBrowser() && error.response.status === 401) {
      deleteTokens(context);
    }
    return genErrorResponse(error);
  },
);
export { unauthInstance, authInstance };
