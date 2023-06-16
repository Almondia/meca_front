import { CardHistoryType, CursorPaginationType } from '@/types/domain';

import { unauthInstance } from './config/instance';

export interface CardHistoryListResponse extends CursorPaginationType {
  contents: CardHistoryType[];
}

export interface CardHistoryListRequest extends CursorPaginationType {
  id: string;
}

const cardHistoryApi = {
  getHistoriesByMemberId: async ({ id, hasNext, pageSize }: CardHistoryListRequest) => {
    const response = await unauthInstance.get<never, any>(`/api/v2/histories/members/${id}`, {
      params: { pageSize: pageSize ?? 5, hasNext },
    });
    return {
      ...response,
      contents: response.contents.map((content: any) => ({
        ...content.cardHistory,
        ...content.solvedMember,
        ...content.card,
      })),
    } as CardHistoryListResponse;
  },
  getHistoriesByCardId: async ({ id, hasNext, pageSize }: CardHistoryListRequest) => {
    const response = await unauthInstance.get<never, any>(`/api/v2/histories/cards/${id}`, {
      params: { pageSize: pageSize ?? 5, hasNext },
    });
    return {
      ...response,
      contents: response.contents.map((content: any) => ({
        ...content.cardHistory,
        ...content.solvedMember,
        ...content.card,
      })),
    } as CardHistoryListResponse;
  },
};

export default cardHistoryApi;
