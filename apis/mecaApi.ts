import {
  CategoryType,
  CursorPaginationType,
  MecaType,
  QuizAlgorithmType,
  QuizResultType,
  QuizType,
  UserProfile,
} from '@/types/domain';
import { PAGINATION_NUM } from '@/utils/constants';

import { authInstance, unauthInstance } from './config/instance';

export type MecaWriteRequest = Required<Omit<MecaType, 'createdAt' | 'blurThumbnail'>>;

export interface MecaWriteResponse {
  cardId: string;
  categoryId: string;
  memberId: string;
}

export interface MecaListResponse extends CursorPaginationType {
  contents: Omit<MecaType, 'categoryId'>[];
  category: CategoryType;
  categoryLikeCount: number;
}

export interface MecaUserListResponse extends Omit<MecaListResponse, 'contents'> {
  contents: (Omit<MecaType, 'categoryId'> & UserProfile)[];
}

export interface MecaQuizRequest {
  categoryId: string;
  limit: number;
  algorithm: QuizAlgorithmType;
}

const mecaApi = {
  addMeca: (props: Omit<MecaWriteRequest, 'cardId'>) =>
    authInstance.post<never, MecaWriteResponse>('/api/v1/cards', {
      ...props,
    }),
  updateMeca: ({ cardId, categoryId, description, question, title, answer }: Omit<MecaWriteRequest, 'cardType'>) =>
    authInstance.put<never, MecaWriteResponse>(`/api/v1/cards/${cardId}`, {
      categoryId,
      description,
      question,
      title,
      answer,
    }),
  deleteMeca: (cardId: string) => authInstance.delete<never, never>(`/api/v1/cards/${cardId}`),
  getMyMecaList: (props: CursorPaginationType & { categoryId: string }) => {
    const params = {
      pageSize: props.pageSize ?? PAGINATION_NUM,
      hasNext: props.hasNext,
    };
    !props.hasNext && delete params.hasNext;
    return authInstance.get<never, MecaListResponse>(`/api/v1/cards/categories/${props.categoryId}/me`, {
      params,
    });
  },
  getSharedCardById: (cardId: string): Promise<MecaType & UserProfile> =>
    unauthInstance
      .get<never, { cardInfo: MecaType; memberInfo: UserProfile }>(`/api/v1/cards/${cardId}/share`)
      .then((res) => ({ ...res.memberInfo, ...res.cardInfo })),
  getMyCardById: (cardId: string) => authInstance.get<never, MecaType>(`/api/v1/cards/${cardId}/me`),
  getQuizCards: ({ categoryId, limit, algorithm }: MecaQuizRequest) =>
    authInstance.get<never, QuizType[]>(`/api/v1/cards/categories/${categoryId}/simulation`, {
      params: {
        limit,
        algorithm,
      },
    }),
  applyQuizResult: (props: QuizResultType[]) =>
    authInstance.post<never, never>(`/api/v1/histories/simulation`, {
      cardHistories: props,
    }),
  getSharedMecaList: async (props: CursorPaginationType & { categoryId: string }): Promise<MecaUserListResponse> => {
    const params = {
      pageSize: props.pageSize ?? PAGINATION_NUM,
      hasNext: props.hasNext,
    };
    !props.hasNext && delete params.hasNext;
    return unauthInstance
      .get<never, Omit<MecaListResponse, 'contents'> & { contents: { cardInfo: MecaType; memberInfo: UserProfile }[] }>(
        `/api/v1/cards/categories/${props.categoryId}/share`,
        {
          params,
        },
      )
      .then((res) => ({ ...res, contents: [...res.contents.map((v) => ({ ...v.memberInfo, ...v.cardInfo }))] }));
  },
  getCountByCategoryId: (categoryId: string) =>
    authInstance.get<never, { count: number }>(`/api/v1/cards/categories/${categoryId}/me/count`),
};

export default mecaApi;
