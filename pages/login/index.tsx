import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import nookies from 'nookies';
import { useEffect } from 'react';

import userApi from '@/apis/userApi';
import { SOCIAL_TYPES, SocialType } from '@/types/domain';
import parseQueryString from '@/utils/queryStringHandler';
import alertToast from '@/utils/toastHandler';

const isSocialType = (value: any): value is SocialType => SOCIAL_TYPES.includes(value);

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
  return (
    // TODO: 로딩 화면 구성할 것
    <div>please wait...</div>
  );
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
    const tokenResponse = await userApi[`${auth}Login`](code);
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
        message: (e as Error).message ?? '로그인 실패',
      },
    };
  }
};

export default Login;
