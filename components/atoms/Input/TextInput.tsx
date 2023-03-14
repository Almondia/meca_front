import { IconType } from '@/components/icons/type';
import { ElementSizeType } from '@/types/common';

import { TextInputBox, TextInputLeftIconBox, TextInputRightIconBox, TextInputWrapper } from './styled';
import { InputProps } from './type';

export interface TextInputProps extends InputProps {
  /** [선택] input type - 기본:text */
  type?: 'text' | 'number';
  /** [필수] 미리보기 - 기본: 빈 문자열 */
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** [선택] 존재하는 svg 아이콘 컴포넌트를 사용해 왼쪽에 삽입 */
  iconLeft?: IconType;
  /** [선택] 존재하는 svg 아이콘 컴포넌트를 사용해 오른쪽에 삽입 */
  iconRight?: IconType;
  width?: ElementSizeType;
}

/**
 * 기본 Text 입력 처리를 위한 Input Component
 * - text, number 처리 가능
 * - 왼쪽 오른쪽에 icon 삽입 가능
 */
const TextInput = ({
  name,
  value,
  type,
  placeholder = '',
  onChange,
  onBlur,
  disabled,
  iconLeft,
  iconRight,
  width,
}: TextInputProps) => (
  <TextInputWrapper width={width}>
    {iconLeft && <TextInputLeftIconBox icon={iconLeft} size="1rem" />}
    <TextInputBox
      name={name}
      type={type ?? 'text'}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
    {iconRight && <TextInputRightIconBox icon={iconRight} size="1rem" />}
  </TextInputWrapper>
);

export default TextInput;
