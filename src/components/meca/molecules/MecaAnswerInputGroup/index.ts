import { ComponentType } from 'react';

import type { MecaTag } from '@/types/domain/meca';

import { Essay } from './Essay';
import { Keyword } from './Keyword';
import { Ox } from './Ox';
import { Select } from './Select';

const MecaAnswerInputGroup: Record<MecaTag, ComponentType> = {
  OX_QUIZ: Ox,
  ESSAY: Essay,
  KEYWORD: Keyword,
  MULTI_CHOICE: Select,
};

export default MecaAnswerInputGroup;
