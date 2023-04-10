export type MecaTagType = 'ox' | 'desc' | 'keyword' | 'select';
export type MecaTagResponseType = 'OX_QUIZ' | 'KEYWORD' | 'MULTI_CHOICE' | 'DESCRIPTION';

export const MECA_TAG_TO_RESPONSE: Record<MecaTagType, MecaTagResponseType> = {
  ox: 'OX_QUIZ',
  keyword: 'KEYWORD',
  select: 'MULTI_CHOICE',
  desc: 'DESCRIPTION',
};

export const MECA_RESPONE_TO_TAG: Record<MecaTagResponseType, MecaTagType> = {
  OX_QUIZ: 'ox',
  KEYWORD: 'keyword',
  MULTI_CHOICE: 'select',
  DESCRIPTION: 'desc',
};

export const SOCIAL_TYPES = ['kakao', 'naver', 'google'] as const;
export type SocialType = (typeof SOCIAL_TYPES)[number];

export interface TokenType {
  accessToken: string;
  refreshToken?: string;
}

export interface MyProfile {
  memberId: string;
  role: string;
  email: string;
  name: string;
  oauthType: SocialType;
  createdAt: string;
  profile?: string;
}

// TODO: 백엔드 응답 데이터에 맞게 추가할 것
export interface CategoryType {
  categoryId: string;
  title: string;
  thumbnail?: string;
}

export interface PaginationType {
  pageSize?: number;
  offset: number;
  query: string;
}

export interface CursorPaginationType {
  pageSize?: number;
  hasNext?: string;
}

export interface MecaType {
  cardId: string;
  categoryId: string;
  cardType: MecaTagResponseType;
  title: string;
  question: string;
  answer: string;
  createdAt: string;
  description: string;
}

export type QuizAlgorithmType = 'score' | 'random';

export type QuizPhaseType = 'progress' | 'done' | 'end' | 'result';

export interface QuizSucceedType {
  succeedText: string;
  succeedHandler: (...args: any[]) => void;
}

export interface QuizResultType {
  cardId: string;
  userAnswer: string;
  score: number;
}

export interface QuizType extends MecaType {
  result?: Omit<QuizResultType, 'cardId'>;
}

export const IMAGE_EXTENTIONS = ['jpg', 'jpeg', 'gif', 'png'] as const;
export const IMAGE_PURPOSES = ['thumbnail', 'card', 'profile'] as const;

export interface ImageUploadRequestType {
  purpose: (typeof IMAGE_PURPOSES)[number];
  extension: (typeof IMAGE_EXTENTIONS)[number];
  fileName: string;
}
