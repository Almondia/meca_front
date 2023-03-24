import { A } from '@/components/molcules/MecaCard/styled';
import { CursorPaginationType, MecaType, PaginationType } from '@/types/domain';
import { PAGINATION_NUM } from '@/utils/constants';

import { authInstance } from './config/instance';

export interface MecaWriteRequest extends Required<Omit<MecaType, 'createdAt' | 'images'>> {
  images?: string[];
}

export interface MecaWriteResponse {
  cardId: string;
  categoryId: string;
}

export interface MecaListResponse extends CursorPaginationType {
  contents: Omit<MecaType, 'categoryId'>[];
  categoryId: string;
  categoryTitle: string;
}

const mecaApi = {
  addMeca: (props: Omit<MecaWriteRequest, 'cardId'>) =>
    authInstance.post<never, MecaWriteResponse>('/api/v1/cards', {
      ...props,
    }),
  updateMeca: (props: Omit<MecaWriteRequest, 'cardType'>) =>
    authInstance.put<never, MecaWriteResponse>(`/api/v1/cards/${props.cardId}`, {
      ...props,
    }),
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
};

export default mecaApi;
