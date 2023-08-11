import type { MecaTag } from '@/types/domain/meca';

import type { MecaQuestionInputGroupComponentType } from '@/components/meca/molecules/MecaQuestionInputGroup/types';

import { Essay } from './Essay';
import { Keyword } from './Keyword';
import { Ox } from './Ox';
import { Select } from './Select';

const MecaQuestionInputGroup: Record<MecaTag, MecaQuestionInputGroupComponentType> = {
  OX_QUIZ: Ox,
  ESSAY: Essay,
  KEYWORD: Keyword,
  MULTI_CHOICE: Select,
};

export default MecaQuestionInputGroup;
