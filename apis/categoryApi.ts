import { CategoryType, PaginationType } from '@/types/domain';
import { PAGINATION_NUM } from '@/utils/constants';

import { authInstance } from './config/instance';

export interface CategoriesResponse {
  contents: CategoryType[];
  totalPages: number;
  pageNumber: number;
}

const categoryApi = {
  getMyCategoryList: ({ offset = 0, query = '', pageSize = PAGINATION_NUM }: PaginationType) =>
    authInstance.get<never, CategoriesResponse>('/api/v1/categories/me', {
      params: {
        offset,
        pageSize,
        startTitle: query,
      },
    }),
  addCategory: ({ title }: { title: string }) =>
    authInstance.post<never, { categoryId: string }>('/api/v1/categories', {
      title,
    }),
  deleteCategory: (id: string) => authInstance.delete<never, never>(`/api/v1/categories/${id}`),
  updateCategory: ({ categoryId, title }: Pick<CategoryType, 'categoryId' | 'title'>) =>
    authInstance.put<never, CategoryType>(`/api/v1/categories/${categoryId}`, {
      title,
    }),
};

export default categoryApi;
