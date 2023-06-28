import { IconType } from '@/components/common/Icons';
import { MecaTagType } from '@/types/domain';

interface MecaTagValueType {
  icon: IconType;
  color: string;
  text: string;
}

export type MecaTagIconType = Record<MecaTagType, MecaTagValueType>;

export const MECATAG_VALUES: MecaTagIconType = {
  ox: {
    icon: 'Ox',
    color: '#A6880D',
    text: 'OX퀴즈',
  },
  desc: {
    icon: 'Bubble',
    color: '#E78565',
    text: '주관식',
  },
  keyword: {
    icon: 'Check',
    color: '#7B61FF',
    text: '키워드',
  },
  select: {
    icon: 'Dice',
    color: '#64ab38',
    text: '객관식',
  },
};
