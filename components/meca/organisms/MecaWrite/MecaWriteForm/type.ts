import { Dispatch, SetStateAction } from 'react';

import { InputProps } from '@/components/@common/atoms/Input/type';

export interface MecaWriteFormAnswerProps extends Omit<InputProps, 'name'> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  selectionNum?: number;
}

export interface MecaWriteFormQuestionProps extends Omit<InputProps, 'name'> {
  setValue: Dispatch<SetStateAction<string>>;
  selectionNum?: number;
}

export type MecaWriteAnswerComponentType = React.ComponentType<MecaWriteFormAnswerProps>;
export type MecaWriteQuestionComponentType = React.ComponentType<MecaWriteFormQuestionProps>;
