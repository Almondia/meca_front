import { PreloadedImageInfo } from './common';

export type MecaTagType = 'OX_QUIZ' | 'KEYWORD' | 'MULTI_CHOICE' | 'ESSAY';

export const SOCIAL_TYPES = ['kakao', 'naver', 'google'] as const;
export type SocialType = (typeof SOCIAL_TYPES)[number];

export interface TokenType {
  accessToken: string;
  refreshToken?: string;
}

export interface UserProfile {
  memberId: string;
  name: string;
  profile?: string;
}

export interface MyProfile extends UserProfile {
  role: string;
  oauthType: SocialType;
  createdAt: string;
  accessToken?: string;
  email: string;
}

export interface CategoryType {
  categoryId: string;
  memberId?: string;
  title: string;
  thumbnail: string;
  shared: boolean;
  blurThumbnail?: PreloadedImageInfo;
  likeCount: number;
}

export interface CategoryStatisticsType {
  scoreAvg: number;
  solveCount: number;
  totalCount: number;
}

export interface MecaStatisticsType {
  scoreAvg: number | null;
  tryCount: number | null;
}

export interface CategoryDetailType extends CategoryType, CategoryStatisticsType {
  createdAt: string;
  memberId: string;
}

export interface PaginationType {
  pageSize?: number;
  offset: number;
  query: string;
}

export interface CursorPaginationType {
  pageSize?: number;
  hasNext?: string;
  containTitle?: string;
}

export interface MecaType {
  cardId: string;
  categoryId: string;
  cardType: MecaTagType;
  title: string;
  question: string;
  answer: string;
  createdAt: string;
  description: string;
  thumbnail?: string;
  blurThumbnail?: PreloadedImageInfo;
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
  spendTime: number;
}

export interface QuizType extends MecaType {
  result?: Omit<QuizResultType, 'cardId'>;
}

export interface CardHistoryType extends Omit<MecaType, 'description'> {
  cardHistoryId: string;
  userAnswer: string;
  score: number;
  solvedMemberId: string;
  solvedMemberName: string;
  memberId: string;
}

export const IMAGE_EXTENTIONS = ['jpg', 'jpeg', 'gif', 'png', 'webp'] as const;
export const IMAGE_PURPOSES = ['thumbnail', 'card', 'profile'] as const;

export interface ImageUploadRequestType {
  purpose: (typeof IMAGE_PURPOSES)[number];
  extension: (typeof IMAGE_EXTENTIONS)[number];
  fileName: string;
}
