/* eslint-disable import/prefer-default-export */

import { GetServerSideProps } from 'next';
import { dehydrate } from '@tanstack/react-query';
import nookies from 'nookies';

import { generateQueryClient } from '@/query/queryClient';
import queryKey from '@/query/queryKey';
import userApi from '@/apis/userApi';
import { setRequest } from '@/apis/config/instance';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = nookies.get(context);
  if (!accessToken) {
    return {
      props: {
        hasAuth: false,
      },
    };
  }
  setRequest(context.req);
  const queryClient = generateQueryClient();
  try {
    const member = await queryClient.fetchQuery([queryKey.me], userApi.getMe);
    return {
      props: {
        hasAuth: true,
        memberId: member.memberId,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch {
    nookies.destroy(context, 'accessToken', {
      path: '/',
    });
    return {
      props: {
        hasAuth: false,
      },
    };
  }
};
