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
    color: '#EDD05C',
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
    color: '#82DD4A',
    text: '객관식',
  },
};
