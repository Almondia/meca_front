import type { CursorPaginationResponse, PreloadedThumbnailImage, TimestampedEntity } from '@/types/domain';
import type { Category } from '@/types/domain/category';
import type { User } from '@/types/domain/user';

export type MecaTag = 'OX_QUIZ' | 'KEYWORD' | 'MULTI_CHOICE' | 'ESSAY';

export interface Meca extends TimestampedEntity {
  cardId: string;
  categoryId: string;
  memberId: string;
  title: string;
  question: string;
  answer: string;
  description: string;
  cardType: MecaTag;
  thumbnail?: string;
  blurThumbnail?: PreloadedThumbnailImage;
}

export interface MecaStatistics {
  scoreAvg: number;
  tryCount: number;
}

export interface MecaByIdResponse {
  card: Meca;
  member: User;
}

export type MecaCreateRequest = Omit<Meca, 'cardId' | 'memberId' | 'createdAt' | 'thumbnail' | 'blurThumbnail'>;

export interface MecaUpdateRequest extends Omit<MecaCreateRequest, 'cardType'> {
  cardId: string;
}

export interface MecaListContent {
  card: Omit<Meca, 'description' | 'answer'> & { description?: string };
  statistics: MecaStatistics;
}

export interface MecaListPaginationResponse extends CursorPaginationResponse {
  contents: MecaListContent[];
  category: Category;
  member: User;
  categoryLikeCount: number;
  isMine?: boolean;
}
