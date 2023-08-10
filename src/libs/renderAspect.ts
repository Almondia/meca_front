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

import { setAccessTokenFromServerRequest } from '@/apis/config/instance';
import useUser from '@/hooks/user/useUser';
import { generateQueryClient } from '@/query/queryClient';
import { getJWTPayload } from '@/utils/jwtHandler';

import logger, { responseTimeLoggerWrapper } from './logger';

function serverSideRenderAuthorizedAspect(
  proceed?: (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    queryClient: QueryClient,
    memberId?: string,
  ) => Promise<object | void>,
  skipAuth?: boolean,
): GetServerSideProps {
  const ssrFn = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    const { accessToken } = nookies.get(context);
    if (!accessToken && !skipAuth) {
      return {
        props: {
          errorMessage: 'not foun authorization info',
          errorStatus: 401,
        },
      };
    }
    setAccessTokenFromServerRequest(accessToken);
    try {
      const queryClient = generateQueryClient();
      const memberId = getJWTPayload(accessToken, 'id');
      const [member, propsAspect] = await Promise.allSettled([
        !!memberId && useUser.fetchQuery(accessToken, queryClient),
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
