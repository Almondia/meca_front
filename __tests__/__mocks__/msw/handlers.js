import { rest } from 'msw';
import { authInstance } from '../../../apis/config/instance';

const ENDPOINT = authInstance.defaults.baseURL + '/api/v1';

export const handlers = [
  rest.post(`${ENDPOINT}/oauth/login/kakao`, (req, res, ctx) => {
    const code = req.url.searchParams.get('code');
    return res(
      ctx.json({
        accessToken: 'kakao_token',
      }),
    );
  }),
];
