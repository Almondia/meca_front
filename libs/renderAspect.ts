/* eslint-disable @typescript-eslint/no-throw-literal */
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
import { getJWTPayload } from '@/utils/jwtHandler';

import logger, { responseTimeLoggerWrapper } from './logger';

function hasErrorRedirection(error: unknown): error is { url: string } {
  return typeof error === 'object' && Object.prototype.hasOwnProperty.call(error, 'url');
}

/**
 * should use render data requiring authorization
 * [사용법]
 * - callback에 server side rendering 할 api를 queryClient로 패칭한다.
 * - 페이지에 전달해야 할 props를 넘긴다.
 * - 여러 api를 ssr하더라도 같은 queryClient에 캐시 데이터를 페이지에 dehydrate 한다.
 * - [redirect 처리]: throw {url: 'path'}
 * - [404 처리]: throw {message: 'your-message'}
 */
function serverSideRenderAuthorizedAspect(
  proceed?: (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    queryClient: QueryClient,
    memberId?: string,
  ) => Promise<object | void>,
  skipAuth?: boolean,
): GetServerSideProps {
  const ssrFn = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    setRequest(context.req);
    const { accessToken } = nookies.get(context);
    if (!accessToken && !skipAuth) {
      return {
        props: {
          errorMessage: 'not foun authorization info',
          errorStatus: 401,
        },
      };
    }
    try {
      const queryClient = generateQueryClient();
      const memberId = getJWTPayload(accessToken, 'id');
      const [member, propsAspect] = await Promise.allSettled([
        !!memberId &&
          queryClient.fetchQuery([queryKey.me], () => userApi.getMe().then((res) => ({ ...res, accessToken }))),
        proceed && proceed(context, queryClient, memberId),
      ]);
      if (member.status === 'rejected') {
        throw { ...member.reason };
      }
      if (propsAspect.status === 'rejected') {
        throw { ...propsAspect.reason };
      }
      return {
        props: {
          ...(propsAspect.status === 'fulfilled' ? propsAspect.value : undefined),
          hasAuth: !!(member?.status === 'fulfilled'),
          dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
      };
    } catch (error) {
      logger.error({ requestType: 'SSR', tag: 'ERROR', message: JSON.stringify(error) });
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
          props: {
            errorMessage: (error as any)?.message ?? 'invalid authorization info',
            errorStatus: 401,
          },
        };
      }
      return {
        props: {
          errorMessage: (error as any)?.message ?? 'next server error',
          errorStatus: 404,
        },
      };
    }
  };
  return (context) =>
    responseTimeLoggerWrapper<Awaited<ReturnType<typeof ssrFn>>>(() => ssrFn(context), {
      requestType: 'SSR',
      location: context.req?.url,
    });
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
      logger.error({ requestType: 'SSG', tag: 'ERROR', message: JSON.stringify(error) });
      if (hasErrorRedirection(error)) {
        return {
          redirect: {
            destination: error.url,
            permanent: false,
          },
          revalidate: 1,
        };
      }
      return {
        props: {
          errorMessage: (error as any)?.message ?? 'next server error',
        },
        revalidate: 1,
      };
    }
  };
}

export { serverSideRenderAuthorizedAspect as ssrAspect };
export { staticRegenerateRenderAspect as isrAspect };
