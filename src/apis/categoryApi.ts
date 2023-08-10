import {
  CategoryDetailType,
  CategoryStatisticsType,
  CategoryType,
  CursorPaginationType,
  UserProfile,
} from '@/types/domain';
import { PAGINATION_NUM } from '@/utils/constants';

import { authInstance, unauthInstance } from './config/instance';

interface CategoriesResponse extends CursorPaginationType {
  contents: CategoryType[];
}
interface SharedCategoryContentType {
  memberInfo: UserProfile;
  categoryInfo: CategoryType;
  likeCount: number;
}

interface RecommendedCategoryContentType {
  member: UserProfile;
  category: CategoryType;
  statistics: CategoryStatisticsType;
  likeCount: number;
}

export interface AddCategoryType {
  title: string;
  thumbnail: string;
}

export interface UpdateCategoryType extends AddCategoryType {
  categoryId: string;
  shared: boolean;
}

export interface PrivateCategoriesResponse extends CategoriesResponse {
  contents: CategoryDetailType[];
}

export interface SharedCategoriesResponse extends CategoriesResponse {
  contents: (CategoryType & UserProfile)[];
}

const categoryApi = {
  getMyCategoryList: (props: CursorPaginationType) =>
    authInstance.get<never, PrivateCategoriesResponse>('/api/v1/categories/me', {
      params: {
        pageSize: props.pageSize ?? PAGINATION_NUM,
        hasNext: props.hasNext,
        containTitle: props.containTitle,
      },
    }),
  addCategory: ({ title, thumbnail }: AddCategoryType) =>
    authInstance.post<never, { categoryId: string }>('/api/v1/categories', {
      title,
      thumbnail,
    }),
  deleteCategory: (id: string) => authInstance.delete<never, never>(`/api/v1/categories/${id}`),
  updateCategory: ({ categoryId, title, thumbnail, shared }: UpdateCategoryType) =>
    authInstance.put<never, CategoryType>(`/api/v1/categories/${categoryId}`, {
      title,
      thumbnail,
      shared,
    }),
  getMyRecommendedCategoryList: async (props: CursorPaginationType): Promise<SharedCategoriesResponse> => {
    const response = await authInstance.get<
      never,
      Omit<CategoriesResponse, 'contents'> & { contents: RecommendedCategoryContentType[] }
    >('/api/v1/categories/me', {
      params: {
        option: 'RECOMMEND',
        pageSize: props.pageSize ?? PAGINATION_NUM,
        hasNext: props.hasNext,
        containTitle: props.containTitle,
      },
    });
    return {
      ...response,
      contents: response.contents.map((v) => ({ ...v.category, ...v.member, likeCount: v.likeCount })),
    };
  },
  getSharedCategoryList: async (props: CursorPaginationType): Promise<SharedCategoriesResponse> => {
    const response = await unauthInstance.get<
      never,
      Omit<CategoriesResponse, 'contents'> & { contents: SharedCategoryContentType[] }
    >('/api/v1/categories/share', {
      params: {
        pageSize: props.pageSize ?? 2 * PAGINATION_NUM,
        hasNext: props.hasNext,
        containTitle: props.containTitle,
      },
    });
    return {
      ...response,
      contents: response.contents.map((v) => ({ ...v.categoryInfo, ...v.memberInfo, likeCount: v.likeCount })),
    };
  },
  postCategoryLike: async (categoryId: string) => {
    await authInstance.post<never, never>(`/api/v1/categories/${categoryId}/like/like`);
    return { hasLike: true, count: 1 };
  },
  postCategoryUnlike: async (categoryId: string) => {
    await authInstance.post<never, never>(`/api/v1/categories/${categoryId}/like/unlike`);
    return { hasLike: false, count: -1 };
  },
  getCategoriesLikeState: async (categoryIds: string[]) =>
    authInstance.get<never, { recommendedCategories: string[]; unRecommendedCategories: string[] }>(
      `/api/v1/categories/like`,
      {
        params: {
          categoryIds: categoryIds.join(','),
        },
      },
    ),
};

export default categoryApi;
