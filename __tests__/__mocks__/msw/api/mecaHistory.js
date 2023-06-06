import { MOCK_HISTORY_LIST } from '../data';
import { ENDPOINT } from '../handlers';

/**
 *
 * @param {*} [body=MOCK_HISTORY_LIST] - default: MOCK_HISTORY_LIST
 * @returns
 */
export const mockedGetMecaHistoryByMemberApi = (body = MOCK_HISTORY_LIST) => {
  const [uri, method] = [`${ENDPOINT}/histories/members/:id`, 'get'];
  const responseResolver = (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};
