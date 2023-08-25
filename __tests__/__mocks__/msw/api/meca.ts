import type { MecaByIdResponse, MecaCreateRequest } from '@/types/domain/meca';

import {
  MOCK_CATEGORIES,
  MOCK_CATEGORY,
  MOCK_CATEGORY_ID,
  MOCK_MECA,
  MOCK_MECAS,
  MOCK_MECA_PAGINATION_LIST,
  MOCK_MEMBER,
  MOCK_MEMBER_ID,
  MOCK_QUIZ_SIMULATION_INFO_LIST,
} from '../data';
import { ENDPOINT, ResponseResolver } from '../handlers';

export const mockedPostMecaApi = () => {
  const [uri, method] = [`/api/cards`, 'post'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { title, question, categoryId, cardType, answer, description } = await req.json();
    const createMeca: MecaCreateRequest = {
      title: title,
      question: question,
      categoryId: categoryId,
      cardType,
      answer,
      description,
    };

    const cardId = '01234567-89ab-cdef-0123-456789abcd' + MOCK_MECAS.length.toString().padStart(2, '0');
    const newCard = { ...createMeca, cardId, createdAt: new Date().toISOString(), memberId: MOCK_MEMBER_ID };
    MOCK_MECAS.push({ ...newCard });
    return res(ctx.status(201), ctx.json(newCard));
  };
  return { uri, method, responseResolver };
};

export const mockedPutMecaUpdateApi = () => {
  const [uri, method] = [`/api/cards/:id`, 'put'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    const request = await req.json();
    const newCard = { ...request };
    const idx = MOCK_MECAS.findIndex((v) => v.cardId === id);
    const meca = MOCK_MECAS[idx];
    MOCK_MECAS[idx] = { ...meca, ...newCard };
    return res(ctx.status(200), ctx.json(MOCK_MECAS[idx]));
  };
  return { uri, method, responseResolver };
};

export const mockedDeleteMecaApi = () => {
  const [uri, method] = [`/api/cards/:id`, 'delete'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    const idx = MOCK_MECAS.findIndex((v) => v.cardId === id);
    MOCK_MECAS.splice(idx, 1);
    return res(ctx.status(200));
  };
  return { uri, method, responseResolver };
};

/**
 * @description path: [categoryId], queries: [pageSize, hasNext]
 */
export const mockedGetAuthUserMecaListApi = () => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/:categoryId/me`, 'get'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { categoryId } = req.params;
    const pageSize = parseInt(req.url.searchParams.get('pageSize') ?? '12', 10);
    const hasNext = req.url.searchParams.get('hasNext');
    const result = MOCK_MECAS.sort((o1, o2) => (o2.cardId > o1.cardId ? 1 : -1)).filter(
      (card) => card.categoryId === categoryId,
    );
    const index = result.findIndex((v) => v.cardId === hasNext);
    const nextIndex = index === -1 ? 0 : index;
    const resData = {
      contents: [...result].slice(nextIndex, nextIndex + pageSize + 1).map((card) => ({
        card: card,
        statistics: {
          scoreAvg: 0.0,
          tryCount: 0,
        },
      })),
      pageSize: pageSize,
      hasNext: result[nextIndex + pageSize + 1] ? result[nextIndex + pageSize + 1].cardId : undefined,
      category: MOCK_CATEGORIES.find((c) => c.categoryId === categoryId) ?? MOCK_CATEGORY,
      member: MOCK_MEMBER,
    };
    return res(ctx.status(200), ctx.json(resData));
  };
  return { uri, method, responseResolver };
};

export const mockedGetSharedMecaListApi = (body = MOCK_MECA_PAGINATION_LIST) => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/${MOCK_CATEGORY_ID}/share`, 'get'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

export const mockedGetMecaCountApi = (count: number, shared = false) => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/:id/me/count`, 'get'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count,
        shared,
      }),
    );
  };
  return { uri, method, responseResolver };
};

export const mockedGetSharedMecaApi = (body = MOCK_MECA) => {
  const [uri, method] = [`${ENDPOINT}/cards/:cardId/share`, 'get'];
  const response: MecaByIdResponse = { card: body, member: MOCK_MEMBER };
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { cardId } = req.params;
    return res(ctx.status(200), ctx.json({ ...response, cardId }));
  };
  return { uri, method, responseResolver };
};

export const mockedGetAuthUserdMecaApi = (body = MOCK_MECA) => {
  const [uri, method] = [`${ENDPOINT}/cards/:cardId/me`, 'get'];
  const response: MecaByIdResponse = { card: body, member: MOCK_MEMBER };
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { cardId } = req.params;
    return res(ctx.status(200), ctx.json({ ...response, cardId }));
  };
  return { uri, method, responseResolver };
};

export const mockedGetSimulationMecasApi = () => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/:id/simulation`, 'get'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    return res(ctx.status(200));
  };
  return { uri, method, responseResolver };
};

export const mockedGetQuizCardsSimulationStateByCategoryIdApi = () => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/:categoryId/simulation/before/count`, 'get'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_QUIZ_SIMULATION_INFO_LIST));
  };
  return { uri, method, responseResolver };
};
