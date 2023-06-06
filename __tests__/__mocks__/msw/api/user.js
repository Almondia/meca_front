import { MOCK_MEMBER } from '../data';
import { ENDPOINT } from '../handlers';

/**
 *
 * @param {*} [body=MOCK_MEMBER] - default: MOCK_MEMBER
 * @returns
 */
export const mockedGetUserWithServerApi = (body = MOCK_MEMBER) => {
  const [uri, method] = ['/api/user', 'get'];
  const responseResolver = (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

/**
 *
 * @param {*} [body=MOCK_MEMBER] - default: MOCK_MEMBER
 * @returns
 */
export const mockedGetUserApi = (body = MOCK_MEMBER) => {
  const [uri, method] = [`${ENDPOINT}/members/me`, 'get'];
  const responseResolver = (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

/**
 * @description queries: [code]
 * @returns
 */
export const mockedPostKakaoLoginApi = () => {
  const [uri, method] = [`${ENDPOINT}/oauth/login/kakao`, 'post'];
  const responseResolver = (req, res, ctx) => {
    const code = req.url.searchParams.get('code');
    const token = {
      accessToken: 'kakao_token',
    };
    return res(ctx.json(token), ctx.json({ accessToken: token.accessToken }));
  };
  return { uri, method, responseResolver };
};

export const mockedPostLogoutApi = () => {
  const [uri, method] = [`/api/logout`, 'post'];
  const responseResolver = (_, res, ctx) => {
    return res(
      ctx.json({
        deleted: true,
      }),
    );
  };
  return { uri, method, responseResolver };
};

/**
 * @description request body: [name, profile]
 * @returns
 */
export const mockedPutUserApi = () => {
  const [uri, method] = [`${ENDPOINT}/members/me`, 'put'];
  const responseResolver = async (req, res, ctx) => {
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
