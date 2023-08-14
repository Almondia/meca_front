// import Icon from '@/components/common/atoms/Icon';
// import { IconType } from '@/components/common/atoms/Icon/Icons';
import { ElementSizeType } from '@/types/common';

import { TextInputBox, TextInputWrapper } from './styled';
import { InputProps } from './type';

export interface TextInputProps extends InputProps {
  /** [선택] input type - 기본:text */
  type?: 'text' | 'number';
  /** [필수] 미리보기 - 기본: 빈 문자열 */
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  width?: ElementSizeType;
}

/**
 * 기본 Text 입력 처리를 위한 Input Component
 * - text, number 처리 가능
 */
const TextInput = ({
  name,
  value,
  type,
  placeholder = '',
  onChange,
  onBlur,
  disabled,
  width,
  ariaLabel,
}: TextInputProps) => (
  <TextInputWrapper width={width}>
    <TextInputBox
      name={name}
      width={width}
      type={type ?? 'text'}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      aria-label={ariaLabel}
      autoComplete="off"
    />
  </TextInputWrapper>
);

export default TextInput;
