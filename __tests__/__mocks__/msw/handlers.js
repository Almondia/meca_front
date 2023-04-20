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
        memberId: '01234567-89ab-cdef-0123-456789abcdef',
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
        memberId: '01234567-89ab-cdef-0123-456789abcdef',
        name: 'pds0309',
        email: 'abc@abc.com',
        role: 'USER',
        oauthType: 'KAKAO',
        createdAt: '2023-03-11T12:56:22.954816',
        profile: '/user.jpg',
        accessToken: 'token',
      }),
    );
  }),

  rest.get('/api/logout', (req, res, ctx) => {
    return res(
      ctx.json({
        deleted: true,
      }),
    );
  }),

  rest.get(`${ENDPOINT}/categories/me`, (req, res, ctx) => {
    const hasNext = req.url.searchParams.get('hasNext');
    const pageSize = req.url.searchParams.get('pageSize');
    const result = CATEGORIES.sort((o1, o2) => o2.createdAt - o1.createdAt);
    let nextIndex = result.findIndex((v) => v.cardId === hasNext);
    nextIndex = nextIndex === -1 ? 0 : nextIndex;
    const resData = {
      contents: [...result].slice(nextIndex, Number(pageSize)),
      pageSize,
      hasNext: result[nextIndex + 1] ? result[nextIndex + 1].cardId : undefined,
    };
    return res(ctx.json({ ...resData }));
  }),

  rest.get(`${ENDPOINT}/categories/share`, (req, res, ctx) => {
    const hasNext = req.url.searchParams.get('hasNext');
    const pageSize = req.url.searchParams.get('pageSize');
    const containTitle = req.url.searchParams.get('containTitle');
    const result = CATEGORIES.sort((o1, o2) => o2.createdAt - o1.createdAt)
      .filter((category) => category.title.indexOf(containTitle) !== -1)
      .map((v, i) => {
        return {
          ...v,
          categoryInfo: { ...v },
          memberInfo: { memberId: '01234567-89ab-cdef-0123-456789abcdef' + i, profile: null, name: 'name' + i },
        };
      });
    let nextIndex = result.findIndex((v) => v.cardId === hasNext);
    nextIndex = nextIndex === -1 ? 0 : nextIndex;
    const resData = {
      contents: [...result].slice(nextIndex, Number(pageSize)),
      pageSize,
      hasNext: result[nextIndex + 1] ? result[nextIndex + 1].cardId : undefined,
    };
    return res(ctx.json({ ...resData }));
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
      categoryId: 'cid' + CATEGORIES.length,
    });
    return res(ctx.status(200));
  }),

  rest.delete(`${ENDPOINT}/categories/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const idx = CATEGORIES.findIndex((v) => v.categoryId === id);
    CATEGORIES.splice(idx, 1);
    return res(ctx.status(200));
  }),

  rest.delete('/api/category', (req, res, ctx) => {
    const { id, shared } = req.params;
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

  rest.put(`/api/category`, async (req, res, ctx) => {
    const { id, title } = await req.json();
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

  rest.delete(`${ENDPOINT}/cards/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const idx = MECAS.findIndex((v) => v.categoryId === id);
    MECAS.splice(idx, 1);
    return res(ctx.status(200));
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
      category: {
        categoryId,
        title: CATEGORIES.find((c) => c.categoryId === categoryId).title,
        thumbnail: '',
      },
    };
    return res(ctx.status(200), ctx.json({ ...resData }));
  }),

  rest.get(`${ENDPOINT}/presign/images/upload`, (req, res, ctx) => {
    const purpose = req.url.searchParams.get('purpose');
    const extension = req.url.searchParams.get('extension');
    const fileName = req.url.searchParams.get('fileName');
    return res(
      ctx.status(200),
      ctx.json({
        url: ENDPOINT + `/${purpose}/${fileName}.${extension}`,
        objectKey: `${purpose}/${fileName}.${extension}`,
      }),
    );
  }),

  rest.get(`${ENDPOINT}/cards/:cardId/share`, (req, res, ctx) => {
    const { cardId } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        cardInfo: {
          cardId,
          title: 'Small Soft Computer',
          memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
          question: 'February',
          categoryId: '0187934c-d471-9365-fe25-9fa63e4ba45c',
          cardType: 'OX_QUIZ',
          createdAt: '2023-04-18T16:38:33.936941',
          modifiedAt: '2023-04-18T16:38:33.936941',
          answer: 'O',
          description: 'edit text',
        },
        memberInfo: {
          memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
          name: '임현규',
          email: null,
          profile: null,
          role: 'USER',
          createdAt: '2023-04-18T16:38:12.861907',
          modifiedAt: '2023-04-18T16:38:12.861907',
          deleted: false,
          oauthType: 'KAKAO',
        },
      }),
    );
  }),
];
