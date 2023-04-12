import { CategoryType, CursorPaginationType } from '@/types/domain';
import { PAGINATION_NUM } from '@/utils/constants';

import { authInstance } from './config/instance';

export interface CategoriesResponse extends CursorPaginationType {
  contents: CategoryType[];
  totalPages: number;
  pageNumber: number;
}

const categoryApi = {
  getMyCategoryList: (props: CursorPaginationType) =>
    authInstance.get<never, CategoriesResponse>('/api/v1/categories/me', {
      params: {
        pageSize: props.pageSize ?? PAGINATION_NUM,
        hasNext: props.hasNext,
      },
    }),
  addCategory: ({ title, thumbnail }: Omit<CategoryType, 'categoryId' | 'shared'>) =>
    authInstance.post<never, { categoryId: string }>('/api/v1/categories', {
      title,
      thumbnail,
    }),
  deleteCategory: (id: string) => authInstance.delete<never, never>(`/api/v1/categories/${id}`),
  updateCategory: ({ categoryId, title, thumbnail, shared }: CategoryType) =>
    authInstance.put<never, CategoryType>(`/api/v1/categories/${categoryId}`, {
      title,
      thumbnail,
      isShared: shared,
    }),
};

export default categoryApi;
