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
        title: query,
      },
    }),
};

export default categoryApi;
