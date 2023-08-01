import { CardHistoryType, CursorPaginationType } from '@/types/domain';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';

import { unauthInstance } from './config/instance';

export interface CardHistoryListResponse extends CursorPaginationType {
  contents: CardHistoryType[];
}

export interface CardHistoryListRequest extends CursorPaginationType {
  id: string;
  resourceType: 'members' | 'cards';
}

const cardHistoryApi = {
  getHistories: async ({ id, hasNext, pageSize, resourceType }: CardHistoryListRequest) => {
    const response = await unauthInstance.get<never, any>(`/api/v2/histories/${resourceType}/${id}`, {
      params: { pageSize: pageSize ?? 5, hasNext },
    });
    return {
      ...response,
      contents: response.contents.map((content: any) => ({
        ...content.solvedMember,
        ...content.card,
        ...content.cardHistory,
        description: '',
        question: extractTextFromHTML(content.card.question),
      })),
    } as CardHistoryListResponse;
  },
};

export default cardHistoryApi;
