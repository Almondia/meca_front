import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

export const getTokens = (context: GetServerSidePropsContext) => {
  const { accessToken, refreshToken } = nookies.get(context);
  return { accessToken, refreshToken };
};

export const deleteTokens = (context: GetServerSidePropsContext) => {
  nookies.destroy(context, 'accessToken', {
    path: '/',
  });
};
