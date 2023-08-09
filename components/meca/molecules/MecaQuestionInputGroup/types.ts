import { ElementSizeType } from '@/types/common';

export interface QuestionInputGroupProps {
  QuestionEditor: React.ComponentType<any>;
  minHeight: ElementSizeType;
  maxHeight: ElementSizeType;
}

export type MecaQuestionInputGroupComponentType = React.ComponentType<QuestionInputGroupProps>;
