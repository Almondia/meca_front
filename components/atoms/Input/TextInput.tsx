import Icon from '@/components/common/Icon';
import { IconType } from '@/components/common/Icons';
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
  ariaLabel,
}: TextInputProps) => (
  <TextInputWrapper>
    {iconLeft && (
      <TextInputLeftIconBox>
        <Icon icon={iconLeft} size="0.9rem" />
      </TextInputLeftIconBox>
    )}
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
    />
    {iconRight && (
      <TextInputRightIconBox>
        <Icon icon={iconRight} size="0.9rem" />
      </TextInputRightIconBox>
    )}
  </TextInputWrapper>
);

export default TextInput;
