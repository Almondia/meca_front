import { MecaQuestionInputGroupComponentType } from '@/components/meca/molecules/MecaQuestionInputGroup/types';
import { MecaTagType } from '@/types/domain';

import { Essay } from './Essay';
import { Keyword } from './Keyword';
import { Ox } from './Ox';
import { Select } from './Select';

const MecaQuestionInputGroup: Record<MecaTagType, MecaQuestionInputGroupComponentType> = {
  OX_QUIZ: Ox,
  ESSAY: Essay,
  KEYWORD: Keyword,
  MULTI_CHOICE: Select,
};

export default MecaQuestionInputGroup;
