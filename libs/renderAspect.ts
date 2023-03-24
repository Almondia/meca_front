/* eslint-disable import/prefer-default-export */

import { ParsedUrlQuery } from 'querystring';

import nookies from 'nookies';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';

import { setRequest } from '@/apis/config/instance';
import { generateQueryClient } from '@/query/queryClient';
import queryKey from '@/query/queryKey';
import userApi from '@/apis/userApi';

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
  callback?: (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    queryClient: QueryClient,
    memberId?: string,
  ) => Promise<object | void>,
): GetServerSideProps {
  return async (context) => {
    setRequest(context.req);
    const { accessToken } = nookies.get(context);
    if (!accessToken) {
      return {
        props: {
          hasAuth: false,
        },
      };
    }
    try {
      const queryClient = generateQueryClient();
      const user = await queryClient.fetchQuery([queryKey.me], userApi.getMe);
      let propsAspect: object | void;
      if (callback) {
        propsAspect = await callback(context, queryClient, user.memberId);
      }
      return {
        props: {
          ...propsAspect,
          hasAuth: true,
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
      return {
        props: {
          hasAuth: false,
        },
      };
    }
  };
}

export { serverSideRenderAuthorizedAspect as ssrAspect };
