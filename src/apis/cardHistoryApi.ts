import {
  MecaHistoryCreateRequest,
  MecaHistoryListPaginationRequest,
  MecaHistoryListPaginationResponse,
} from '@/types/domain/mecaHistory';

import { extractTextFromHTML } from '@/utils/htmlTextHandler';

import { authInstance, unauthInstance } from './config/instance';

const cardHistoryApi = {
  getHistories: async ({
    id,
    hasNext,
    pageSize,
    resourceType,
  }: MecaHistoryListPaginationRequest): Promise<MecaHistoryListPaginationResponse> => {
    const response = await unauthInstance.get<never, MecaHistoryListPaginationResponse>(
      `/api/v2/card-histories/${resourceType}/${id}`,
      {
        params: { pageSize: pageSize ?? 5, hasNext },
      },
    );
    const convertedContents = response.contents.map((content) => ({
      ...content,
      card: { ...content.card, description: '', question: extractTextFromHTML(content.card.question) },
    }));
    return { ...response, contents: convertedContents };
  },
  applyQuizHistory: ({ cardId, userAnswer }: MecaHistoryCreateRequest) =>
    authInstance.post<never, { score: number }>(`/api/v1/card-histories`, {
      cardId,
      userAnswer,
    }),
};

export default cardHistoryApi;
