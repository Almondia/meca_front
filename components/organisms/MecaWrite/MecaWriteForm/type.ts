import { InputProps } from '@/components/atoms/Input/type';

export interface MecaWriteFormInputProps extends Omit<InputProps, 'name'> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  selectionNum?: number;
  isDisabled?: boolean;
}

export type MecaWriteInputComponentType = React.ComponentType<MecaWriteFormInputProps>;
