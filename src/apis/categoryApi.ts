import type { CursorPaginationRequest } from '@/types/domain';
import type {
  Category,
  CategoryCreateRequest,
  CategoryListContent,
  CategoryListPaginationResponse,
  CategoryUpdateRequest,
} from '@/types/domain/category';

import { PAGINATION_NUM } from '@/utils/constants';

import { authInstance, serverInstance, unauthInstance } from './config/instance';

const categoryApi = {
  getMyCategoryList: (props: CursorPaginationRequest): Promise<CategoryListPaginationResponse> =>
    authInstance
      .get<never, CategoryListPaginationResponse>('/api/v1/categories/me', {
        params: {
          pageSize: props.pageSize ?? PAGINATION_NUM,
          hasNext: props.hasNext,
          containTitle: props.containTitle,
        },
      })
      .then((res) => ({ ...res, isMine: true, contents: res.contents as Omit<CategoryListContent, 'member'>[] })),
  addCategory: ({ title, thumbnail }: CategoryCreateRequest) =>
    authInstance.post<never, Category>('/api/v1/categories', {
      title,
      thumbnail,
    }),
  deleteCategory: (id: string, shared?: boolean) =>
    serverInstance.delete<never, never>(`/api/categories/${id}`, { params: { shared } }),
  updateCategory: (request: CategoryUpdateRequest) =>
    serverInstance.put<never, Category>(`/api/categories/${request.categoryId}`, request),
  getMyRecommendedCategoryList: async (props: CursorPaginationRequest) => {
    const response = await authInstance.get<never, CategoryListPaginationResponse>('/api/v1/categories/me', {
      params: {
        option: 'RECOMMEND',
        pageSize: props.pageSize ?? PAGINATION_NUM,
        hasNext: props.hasNext,
        containTitle: props.containTitle,
      },
    });
    return response;
  },
  getSharedCategoryList: async (props: CursorPaginationRequest) => {
    const response = await unauthInstance.get<never, CategoryListPaginationResponse>('/api/v1/categories/share', {
      params: {
        pageSize: props.pageSize ?? 2 * PAGINATION_NUM,
        hasNext: props.hasNext,
        containTitle: props.containTitle,
      },
    });
    return response;
  },
  postCategoryLike: async (categoryId: string) => {
    await authInstance.post<never, never>(`/api/v1/categories/${categoryId}/like/like`);
    return { hasLike: true, count: 1 };
  },
  postCategoryUnlike: async (categoryId: string) => {
    await authInstance.post<never, never>(`/api/v1/categories/${categoryId}/like/unlike`);
    return { hasLike: false, count: -1 };
  },
  getCategoryLikeState: async (categoryId: string) =>
    authInstance.get<never, { liked: boolean }>(`/api/v1/categories/${categoryId}/like`).then((res) => res.liked),
};

export default categoryApi;
