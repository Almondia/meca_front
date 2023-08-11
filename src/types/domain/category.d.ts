import type { CursorPaginationResponse, PreloadedThumbnailImage, TimestampedEntity } from '@/types/domain';
import type { User } from '@/types/domain/user';

export interface Category extends TimestampedEntity {
  categoryId: string;
  memberId: string;
  title: string;
  thumbnail: string;
  shared: boolean;
  blurThumbnail?: PreloadedThumbnailImage;
}

export interface CategoryStatistics {
  scoreAvg: number;
  solveCount: number;
  totalCount: number;
}

export interface CategoryCreateRequest {
  title: string;
  thumbnail: string;
}

export interface CategoryUpdateRequest extends CategoryCreateRequest {
  categoryId: string;
  shared: boolean;
}

export interface CategoryListContent {
  category: Category;
  statistics?: CategoryStatistics;
  member?: User;
  likeCount: number;
}

export interface CategoryListPaginationResponse extends CursorPaginationResponse {
  contents: CategoryListContent[];
  isMine?: boolean;
}
