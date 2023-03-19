import { MecaType } from '@/types/domain';

import { authInstance } from './config/instance';

export interface MecaWriteRequest extends Required<Omit<MecaType, 'createdAt' | 'images'>> {
  images?: string[];
}

export interface MecaWriteResponse {
  cardId: string;
  categoryId: string;
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
};

export default mecaApi;
