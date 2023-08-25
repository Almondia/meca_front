import type { MyProfile } from '@/types/domain/user';
import { MOCK_MEMBER } from '../data';
import { ENDPOINT, ResponseResolver } from '../handlers';

export const mockedGetUserWithServerApi = (body?: MyProfile | null) => {
  const [uri, method] = ['/api/users', 'get'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body === undefined ? MOCK_MEMBER : body));
  };
  return { uri, method, responseResolver };
};

export const mockedGetUserApi = (body = MOCK_MEMBER) => {
  const [uri, method] = [`${ENDPOINT}/members/me`, 'get'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

export const mockedPostKakaoLoginApi = () => {
  const [uri, method] = [`${ENDPOINT}/oauth/login/kakao`, 'post'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const code = req.url.searchParams.get('code');
    const token = {
      accessToken: 'kakao_token',
    };
    return res(ctx.json(token), ctx.json({ accessToken: token.accessToken }));
  };
  return { uri, method, responseResolver };
};

export const mockedPostLogoutApi = () => {
  const [uri, method] = [`/api/users/logout`, 'post'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(
      ctx.json({
        deleted: true,
      }),
    );
  };
  return { uri, method, responseResolver };
};

export const mockedPutUserApi = () => {
  const [uri, method] = [`${ENDPOINT}/members/me`, 'put'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { name, profile } = await req.json();
    return res(
      ctx.json({
        name,
        profile,
      }),
    );
  };
  return { uri, method, responseResolver };
};
