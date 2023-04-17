/* eslint-disable import/prefer-default-export */

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import nookies from 'nookies';

import { setRequest } from '@/apis/config/instance';
import userApi from '@/apis/userApi';
import { generateQueryClient } from '@/query/queryClient';
import queryKey from '@/query/queryKey';

function hasErrorRedirection(error: unknown): error is { url: string } {
  return typeof error === 'object' && Object.prototype.hasOwnProperty.call(error, 'url');
}

/**
 * should use render data requiring authorization
 * [사용법]
 * - callback에 server side rendering 할 api를 queryClient로 패칭한다.
 * - 페이지에 전달해야 할 props를 넘긴다.
 * - 여러 api를 ssr하더라도 같은 queryClient에 캐시 데이터를 페이지에 dehydrate 한다.
 */
function serverSideRenderAuthorizedAspect(
  proceed?: (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    queryClient: QueryClient,
    memberId?: string,
  ) => Promise<object | void>,
  skipAuth?: boolean,
): GetServerSideProps {
  return async (context) => {
    setRequest(context.req);
    const { accessToken } = nookies.get(context);
    if (!accessToken && !skipAuth) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    try {
      const queryClient = generateQueryClient();
      const user =
        !!accessToken &&
        (await queryClient.fetchQuery([queryKey.me], () => userApi.getMe().then((res) => ({ ...res, accessToken }))));
      const propsAspect =
        proceed && (await proceed(context, queryClient, user === false ? 'undefined' : user.memberId));
      return {
        props: {
          ...propsAspect,
          hasAuth: !!user,
          dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
      };
    } catch (error) {
      if (hasErrorRedirection(error)) {
        return {
          redirect: {
            destination: error.url,
            permanent: false,
          },
        };
      }
      if ((error as any).status === 401) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      if ((error as any).status === 403 || (error as any).status === 404) {
        return {
          notFound: true,
        };
      }
      return Promise.reject(error);
    }
  };
}

export interface StaticRenderAspectResult {
  propsAspect?: object;
  revalidate?: number;
}

function staticRegenerateRenderAspect(
  proceed: (
    context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
    queryClient: QueryClient,
  ) => Promise<StaticRenderAspectResult>,
): GetStaticProps {
  return async (context) => {
    const queryClient = generateQueryClient();
    try {
      const { propsAspect, revalidate } = await proceed(context, queryClient);
      return {
        props: {
          ...propsAspect,
          dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate: revalidate ?? false,
      };
    } catch (error) {
      if (hasErrorRedirection(error)) {
        return {
          redirect: {
            destination: error.url,
            permanent: false,
          },
        };
      }
      return Promise.reject(error);
    }
  };
}

export { serverSideRenderAuthorizedAspect as ssrAspect };
export { staticRegenerateRenderAspect as isrAspect };
