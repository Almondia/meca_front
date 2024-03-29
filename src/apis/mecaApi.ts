import type { CursorPaginationRequest } from '@/types/domain';
import type {
  Meca,
  MecaByIdResponse,
  MecaCreateRequest,
  MecaListPaginationResponse,
  MecaUpdateRequest,
} from '@/types/domain/meca';
import type { Quiz, QuizListRequest, QuizSimulationStateResponse } from '@/types/domain/quiz';

import { PAGINATION_NUM } from '@/utils/constants';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';
import { extractFirstImageFromHTML } from '@/utils/imageHandler';

import { authInstance, serverInstance, unauthInstance } from './config/instance';

const getConvertedMecaListContents = (mecaList: MecaListPaginationResponse) =>
  mecaList.contents.map((v) => {
    const blurThumbnail = extractFirstImageFromHTML((v.card.question ?? '') + v.card.description);
    const question = extractTextFromHTML(v.card.question);
    return {
      ...v,
      card: {
        ...v.card,
        thumbnail: blurThumbnail?.src ?? '',
        blurThumbnail,
        question,
        description: '',
      },
    };
  });

const mecaApi = {
  addMeca: (props: MecaCreateRequest) =>
    serverInstance.post<never, Meca>('/api/cards', {
      ...props,
    }),
  updateMeca: ({ cardId, categoryId, description, question, title, answer }: MecaUpdateRequest) =>
    serverInstance.put<never, Meca>(`/api/cards/${cardId}`, {
      categoryId,
      description,
      question,
      title,
      answer,
    }),
  deleteMeca: (cardId: string, categoryId: string) =>
    serverInstance.delete<never, never>(`/api/cards/${cardId}`, {
      params: {
        categoryId,
      },
    }),
  getMyMecaList: async (
    props: CursorPaginationRequest & { categoryId: string },
  ): Promise<MecaListPaginationResponse> => {
    const params = {
      pageSize: props.pageSize ?? PAGINATION_NUM,
      hasNext: props.hasNext,
    };
    !props.hasNext && delete params.hasNext;
    const response = await authInstance.get<never, MecaListPaginationResponse>(
      `/api/v1/cards/categories/${props.categoryId}/me`,
      { params },
    );
    return { ...response, contents: getConvertedMecaListContents(response), isMine: true };
  },
  getSharedMecaList: async (
    props: CursorPaginationRequest & { categoryId: string },
  ): Promise<MecaListPaginationResponse> => {
    const params = {
      pageSize: props.pageSize ?? PAGINATION_NUM,
      hasNext: props.hasNext,
    };
    !props.hasNext && delete params.hasNext;
    const response = await unauthInstance.get<never, MecaListPaginationResponse>(
      `/api/v1/cards/categories/${props.categoryId}/share`,
      { params },
    );
    return { ...response, contents: getConvertedMecaListContents(response) };
  },
  getSharedCardById: (cardId: string, memberId?: string): Promise<MecaByIdResponse> =>
    serverInstance.get<never, MecaByIdResponse>(`/api/cards/${cardId}/share`, {
      params: {
        memberId: memberId ?? '',
      },
    }),
  getMyCardById: (cardId: string) => authInstance.get<never, MecaByIdResponse>(`/api/v1/cards/${cardId}/me`),
  getQuizCards: ({ categoryId, limit, score }: QuizListRequest) =>
    authInstance.get<never, Quiz[]>(`/api/v1/cards/categories/${categoryId}/simulation`, {
      params: {
        limit,
        score,
      },
    }),
  getCountByCategoryId: (categoryId: string) =>
    authInstance.get<never, { count: number; shared: boolean }>(`/api/v1/cards/categories/${categoryId}/me/count`),
  getQuizCardsSimulationStateByCategoryId: (categoryId: string) =>
    authInstance.get<never, QuizSimulationStateResponse[]>(
      `/api/v1/cards/categories/${categoryId}/simulation/before/count`,
    ),
};

export default mecaApi;
