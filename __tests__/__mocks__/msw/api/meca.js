import { MOCK_CATEGORIES, MOCK_CATEGORY_ID, MOCK_MECA, MOCK_MECAS, MOCK_SHARED_MECA, MOCK_SHARED_MECAS } from '../data';
import { ENDPOINT } from '../handlers';

/**
 * @description request body: meca post request
 * @property {string} cardId
 * @property {string} categoryId
 */
export const mockedPostMecaApi = () => {
  const [uri, method] = [`${ENDPOINT}/cards`, 'post'];
  const responseResolver = async (req, res, ctx) => {
    const request = await req.json();
    const cardId = 'cid' + MOCK_MECAS.length;
    const newCard = { ...request, cardId };
    MOCK_MECAS.push({ ...newCard });
    return res(
      ctx.status(201),
      ctx.json({
        cardId: cardId,
        categoryId: request.categoryId,
      }),
    );
  };
  return { uri, method, responseResolver };
};

/**
 * @description request body: [meca update request], path: [id]
 * @property {string} cardId
 * @property {string} categoryId
 */
export const mockedPutMecaUpdateApi = () => {
  const [uri, method] = [`${ENDPOINT}/cards/:id`, 'put'];
  const responseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    const request = await req.json();
    const newCard = { ...request };
    const idx = MOCK_MECAS.findIndex((v) => v.cardId === id);
    const meca = MOCK_MECAS[idx];
    MOCK_MECAS.splice(idx, 1);
    MOCK_MECAS.push({ ...meca, ...newCard });
    return res(
      ctx.status(200),
      ctx.json({
        cardId: id,
        categoryId: newCard.categoryId,
      }),
    );
  };
  return { uri, method, responseResolver };
};

/**
 * @description path: [id]
 */
export const mockedDeleteMecaApi = () => {
  const [uri, method] = [`${ENDPOINT}/cards/:id`, 'delete'];
  const responseResolver = async (req, res, ctx) => {
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
  const responseResolver = async (req, res, ctx) => {
    const { categoryId } = req.params;
    const pageSize = parseInt(req.url.searchParams.get('pageSize'), 10);
    const hasNext = req.url.searchParams.get('hasNext');
    const result = MOCK_MECAS.sort((o1, o2) => o2.cardId - o1.cardId).filter((card) => card.categoryId === categoryId);
    const index = result.findIndex((v) => v.cardId === hasNext);
    const nextIndex = index === -1 ? 0 : index;
    const resData = {
      contents: [...result].slice(nextIndex, nextIndex + pageSize + 1),
      pageSize: pageSize,
      hasNext: result[nextIndex + pageSize + 1] ? result[nextIndex + pageSize + 1].cardId : undefined,
      category: {
        categoryId,
        title: MOCK_CATEGORIES.find((c) => c.categoryId === categoryId).title,
        thumbnail: '',
        likeCount: 0,
      },
    };
    return res(ctx.status(200), ctx.json(resData));
  };
  return { uri, method, responseResolver };
};

/**
 * @param {Object} [body=MOCK_SHARED_MECAS] - default: MOCK_SHARED_MECAS
 */
export const mockedGetSharedMecaListApi = (body = MOCK_SHARED_MECAS) => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/${MOCK_CATEGORY_ID}/share`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

/**
 * @param {number} count
 * @description path: [id]
 */
export const mockedGetMecaCountApi = (count) => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/:id/me/count`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count,
      }),
    );
  };
  return { uri, method, responseResolver };
};

/**
 * @param {*} [body=MOCK_SHARED_MECA] - default: MOCK_SHARED_MECA
 * @description path: [cardId]
 * @property {Object} cardResponse - cardResponse with cardId param
 */
export const mockedGetSharedMecaApi = (body = MOCK_SHARED_MECA) => {
  const [uri, method] = [`${ENDPOINT}/cards/:cardId/share`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    const { cardId } = req.params;
    return res(ctx.status(200), ctx.json({ ...body, cardInfo: { ...body.cardInfo, cardId } }));
  };
  return { uri, method, responseResolver };
};

/**
 * @param {*} [body=MOCK_MECA] - default: MOCK_MECA
 * @description path: [cardId]
 * @property {Object} cardResponse - cardResponse with cardId param
 */
export const mockedGetAuthUserdMecaApi = (body = MOCK_MECA) => {
  const [uri, method] = [`${ENDPOINT}/cards/:cardId/me`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    const { cardId } = req.params;
    return res(ctx.status(200), ctx.json({ ...body, cardId }));
  };
  return { uri, method, responseResolver };
};

export const mockedGetSimulationMecasApi = () => {
  const [uri, method] = [`${ENDPOINT}/cards/categories/:id/simulation`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    return res(ctx.status(200));
  };
  return { uri, method, responseResolver };
};

/**
 * @param {number} score
 */
export const mockedPostQuizResultApi = (score) => {
  const [uri, method] = [`${ENDPOINT}/histories/simulation`, 'post'];
  const responseResolver = async (req, res, ctx) => {
    const { cardId, userAnswer } = await req.json();
    return res(ctx.status(200), ctx.json({ score }));
  };
  return { uri, method, responseResolver };
};
