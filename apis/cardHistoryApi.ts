import { CardHistoryType, CursorPaginationType } from '@/types/domain';

import { unauthInstance } from './config/instance';

export interface CardHistoryListResponse extends CursorPaginationType {
  contents: CardHistoryType[];
}

export interface CardHistoryListRequest extends CursorPaginationType {
  id: string;
}

const cardHistoryApi = {
  getHistoriesByMemberId: ({ id, hasNext, pageSize }: CardHistoryListRequest) =>
    unauthInstance.get<never, CardHistoryListResponse>(`/api/v1/histories/members/${id}`, {
      params: { pageSize: pageSize ?? 5, hasNext },
    }),
  getHistoriesByCardId: ({ id, hasNext, pageSize }: CardHistoryListRequest) =>
    unauthInstance.get<never, CardHistoryListResponse>(`/api/v1/histories/cards/${id}`, {
      params: { pageSize: pageSize ?? 5, hasNext },
    }),
};

export default cardHistoryApi;
