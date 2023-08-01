import {
  CategoryType,
  CursorPaginationType,
  MecaStatisticsType,
  MecaType,
  QuizAlgorithmType,
  QuizType,
  UserProfile,
} from '@/types/domain';
import { PAGINATION_NUM } from '@/utils/constants';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';
import { extractFirstImageFromHTML } from '@/utils/imageHandler';

import { authInstance, unauthInstance } from './config/instance';

type MecaWriteRequest = Required<Omit<MecaType, 'createdAt' | 'blurThumbnail' | 'questionOrigin' | 'thumbnail'>>;

export type AddMecaRequest = Omit<MecaWriteRequest, 'cardId'>;

export type UpdateMecaRequest = Omit<MecaWriteRequest, 'cardType'>;

export interface MecaWriteResponse {
  cardId: string;
  categoryId: string;
  memberId: string;
}

export interface MecaListResponse extends CursorPaginationType {
  contents: {
    card: MecaType & { memberId: string };
    statistics: MecaStatisticsType;
  }[];
  category: CategoryType;
  member: UserProfile;
  categoryLikeCount: number;
}

export interface MecaQuizRequest {
  categoryId: string;
  limit: number;
  algorithm: QuizAlgorithmType;
}

const getConvertedMecaListContents = (mecaList: MecaListResponse) =>
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
  addMeca: (props: AddMecaRequest) =>
    authInstance.post<never, MecaWriteResponse>('/api/v1/cards', {
      ...props,
    }),
  updateMeca: ({ cardId, categoryId, description, question, title, answer }: UpdateMecaRequest) =>
    authInstance.put<never, MecaWriteResponse>(`/api/v1/cards/${cardId}`, {
      categoryId,
      description,
      question,
      title,
      answer,
    }),
  deleteMeca: (cardId: string) => authInstance.delete<never, never>(`/api/v1/cards/${cardId}`),
  getMyMecaList: async (props: CursorPaginationType & { categoryId: string }): Promise<MecaListResponse> => {
    const params = {
      pageSize: props.pageSize ?? PAGINATION_NUM,
      hasNext: props.hasNext,
    };
    !props.hasNext && delete params.hasNext;
    const response = await authInstance.get<never, MecaListResponse>(
      `/api/v1/cards/categories/${props.categoryId}/me`,
      { params },
    );
    return { ...response, contents: getConvertedMecaListContents(response) };
  },
  getSharedCardById: (cardId: string, memberId?: string): Promise<MecaType & UserProfile> =>
    unauthInstance
      .get<never, { cardInfo: MecaType; memberInfo: UserProfile }>(`/api/v1/cards/${cardId}/share`, {
        headers: {
          'X-USER': memberId,
        },
      })
      .then((res) => ({ ...res.memberInfo, ...res.cardInfo })),
  getMyCardById: (cardId: string) => authInstance.get<never, MecaType>(`/api/v1/cards/${cardId}/me`),
  getQuizCards: ({ categoryId, limit, algorithm }: MecaQuizRequest) =>
    authInstance.get<never, QuizType[]>(`/api/v1/cards/categories/${categoryId}/simulation`, {
      params: {
        limit,
        algorithm,
      },
    }),
  applyQuizResult: ({ cardId, userAnswer }: { cardId: string; userAnswer: string }) =>
    authInstance.post<never, { score: number }>(`/api/v1/histories/simulation`, {
      cardId,
      userAnswer,
    }),
  getSharedMecaList: async (props: CursorPaginationType & { categoryId: string }): Promise<MecaListResponse> => {
    const params = {
      pageSize: props.pageSize ?? PAGINATION_NUM,
      hasNext: props.hasNext,
    };
    !props.hasNext && delete params.hasNext;
    const response = await unauthInstance.get<never, MecaListResponse>(
      `/api/v1/cards/categories/${props.categoryId}/share`,
      { params },
    );
    return { ...response, contents: getConvertedMecaListContents(response) };
  },
  getCountByCategoryId: (categoryId: string) =>
    authInstance.get<never, { count: number }>(`/api/v1/cards/categories/${categoryId}/me/count`),
};

export default mecaApi;
