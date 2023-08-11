import { MOCK_HISTORY_LIST } from '../data';
import { ENDPOINT, ENDPOINT_V2, ResponseResolver } from '../handlers';

export const mockedGetMecaHistoryByMemberApi = (body = MOCK_HISTORY_LIST) => {
  const [uri, method] = [`${ENDPOINT_V2}/card-histories/members/:id`, 'get'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

export const mockedGetMecaHistoryByCardApi = (body = MOCK_HISTORY_LIST) => {
  const [uri, method] = [`${ENDPOINT_V2}/card-histories/cards/:id`, 'get'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

export const mockedPostQuizResultApi = (score = 0) => {
  const [uri, method] = [`${ENDPOINT}/card-histories`, 'post'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { cardId, userAnswer } = await req.json();
    return res(ctx.status(200), ctx.json({ score }));
  };
  return { uri, method, responseResolver };
};
