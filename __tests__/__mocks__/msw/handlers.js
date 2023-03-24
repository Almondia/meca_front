import { rest } from 'msw';
import { authInstance } from '../../../apis/config/instance';
import { CATEGORIES, MECAS } from './data';
export const ENDPOINT = authInstance.defaults.baseURL + '/api/v1';

export const handlers = [
  rest.post(`${ENDPOINT}/oauth/login/kakao`, (req, res, ctx) => {
    const code = req.url.searchParams.get('code');
    const token = {
      accessToken: 'kakao_token',
    };
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

  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.json({
        memberId: 'abc01',
        name: 'pds0309',
        email: 'abc@abc.com',
        role: 'USER',
        oauthType: 'KAKAO',
        createdAt: '2023-03-11T12:56:22.954816',
        profile: '/user.jpg',
      }),
    );
  }),

  rest.get(`${ENDPOINT}/categories/me`, (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');
    const pageSize = req.url.searchParams.get('pageSize');
    const title = req.url.searchParams.get('startTitle');
    const totalPages = parseInt(CATEGORIES.length / pageSize) + 1;
    const pageNumber = parseInt(offset);
    const result = {
      totalPages,
      pageNumber,
      contents: CATEGORIES.sort((o1, o2) => o2.createdAt - o1.createdAt)
        .filter((category) => category.title.indexOf(title) !== -1)
        .slice(offset * pageSize, (parseInt(offset) + 1) * pageSize),
    };
    return res(ctx.json(result));
  }),

  rest.post(`${ENDPOINT}/categories`, async (req, res, ctx) => {
    const { title } = await req.json();
    if (title.length >= 20) {
      return res(
        ctx.status(400),
        ctx.json({
          message: '제목 오류',
        }),
      );
    }
    CATEGORIES.push({
      title: title,
      createdAt: CATEGORIES.length,
      id: 'c' + CATEGORIES.length,
    });
    return res(ctx.status(200));
  }),

  rest.delete(`${ENDPOINT}/categories/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const idx = CATEGORIES.findIndex((v) => v.categoryId === id);
    CATEGORIES.splice(idx, 1);
    return res(ctx.status(200));
  }),

  rest.put(`${ENDPOINT}/categories/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const { title } = await req.json();
    const idx = CATEGORIES.findIndex((v) => v.categoryId === id);
    const category = CATEGORIES[idx];
    CATEGORIES.splice(idx, 1);
    CATEGORIES.push({ ...category, title: title });
    return res(
      ctx.status(200),
      ctx.json({
        title: title,
        categoryId: id,
      }),
    );
  }),

  rest.post(`${ENDPOINT}/cards`, async (req, res, ctx) => {
    const request = await req.json();
    const cardId = 'cid' + MECAS.length;
    const newCard = { ...request, cardId };
    MECAS.push({ ...newCard });
    return res(
      ctx.status(201),
      ctx.json({
        cardId: cardId,
        categoryId: request.categoryId,
      }),
    );
  }),

  rest.put(`${ENDPOINT}/cards/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const request = await req.json();
    const newCard = { ...request };
    const idx = MECAS.findIndex((v) => v.cardId === id);
    const meca = MECAS[idx];
    MECAS.splice(idx, 1);
    MECAS.push({ ...meca, ...newCard });
    return res(
      ctx.status(200),
      ctx.json({
        cardId: id,
        categoryId: newCard.categoryId,
      }),
    );
  }),

  rest.get(`${ENDPOINT}/cards/categories/:categoryId/me`, (req, res, ctx) => {
    const { categoryId } = req.params;
    const pageSize = req.url.searchParams.get('pageSize');
    const hasNext = req.url.searchParams.get('hasNext');
    const result = MECAS.sort((o1, o2) => o2.cardId - o1.cardId).filter((card) => card.categoryId === categoryId);
    const nextIndex = result.findIndex((v) => v.cardId === hasNext) ?? 0;
    const resData = {
      contents: [...result].slice(nextIndex, pageSize + 1),
      pageSize,
      hasNext: result[nextIndex + 1] ? result[nextIndex + 1].cardId : undefined,
    };
    return res(ctx.status(200), ctx.json({ ...resData }));
  }),
];
