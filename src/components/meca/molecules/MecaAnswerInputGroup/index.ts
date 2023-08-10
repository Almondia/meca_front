import { ComponentType } from 'react';

import { MecaTagType } from '@/types/domain';

import { Essay } from './Essay';
import { Keyword } from './Keyword';
import { Ox } from './Ox';
import { Select } from './Select';

const MecaAnswerInputGroup: Record<MecaTagType, ComponentType> = {
  OX_QUIZ: Ox,
  ESSAY: Essay,
  KEYWORD: Keyword,
  MULTI_CHOICE: Select,
};

export default MecaAnswerInputGroup;
