import storage from '@/utils/storageHandler';
import { rest } from 'msw';
import { authInstance } from '../../../apis/config/instance';
import CATEGORIES from './data';
const ENDPOINT = authInstance.defaults.baseURL + '/api/v1';

export const handlers = [
  rest.post(`${ENDPOINT}/oauth/login/kakao`, (req, res, ctx) => {
    const code = req.url.searchParams.get('code');
    const token = {
      accessToken: 'kakao_token',
    };
    storage.setItem('token', token);
    return res(ctx.json(token));
  }),
  rest.get(`${ENDPOINT}/members/me`, (req, res, ctx) => {
    return res(
      ctx.json({
        memberId: 'abc01',
        name: 'pds0309',
        email: 'abc@abc.com',
        role: 'USER',
        oauthType: 'KAKAO',
        createdAt: '2023-03-11T12:56:22.954816',
      }),
    );
  }),
  rest.get(`${ENDPOINT}/categories/me`, (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');
    const pageSize = req.url.searchParams.get('pageSize');
    const title = req.url.searchParams.get('title');
    const totalPages = parseInt(CATEGORIES.length / pageSize) + 1;
    const pageNumber = parseInt(offset);
    const result = {
      totalPages,
      pageNumber,
      contents: CATEGORIES.filter((category) => category.title.indexOf(title) !== -1).slice(
        offset * pageSize,
        (parseInt(offset) + 1) * pageSize,
      ),
    };
    return res(ctx.json(result));
  }),
];
