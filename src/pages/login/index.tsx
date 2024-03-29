import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import nookies from 'nookies';

import { OauthType } from '@/types/domain/user';

import userApi from '@/apis/userApi';
import { parseQueryString } from '@/utils/queryStringHandler';
import alertToast from '@/utils/toastHandler';

import Home from '..';

const isSocialType = (value: any): value is OauthType => ['kakao', 'naver', 'google'].includes(value);

export interface LoginPageProps {
  message: string;
}

const Login = ({ message }: LoginPageProps) => {
  const router = useRouter();
  useEffect(() => {
    alertToast(message, 'info');
    router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url } = context.req;
  const { res } = context;
  const { auth, code } = parseQueryString(url);
  if (!isSocialType(auth) || !code) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return {
      props: {},
    };
  }
  try {
    const tokenResponse = await userApi.oauthLogin(code, auth);
    nookies.set(context, 'accessToken', tokenResponse.accessToken, {
      maxAge: 6 * 60 * 60,
      path: '/',
      httpOnly: true,
      secure: true,
    });
    return {
      props: {
        message: '로그인 성공',
        hasAuth: true,
        accessToken: tokenResponse.accessToken,
      },
    };
  } catch (e) {
    return {
      props: {
        message: '로그인 실패',
      },
    };
  }
};

export default Login;
