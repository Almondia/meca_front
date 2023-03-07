import { TextBodyTitle } from '@/styles/common';

import { ButtonStyleProp, ButtonWrapper } from './styled';

export interface ButtonProps extends ButtonStyleProp {
  /** [필수] element */
  children: React.ReactNode;
  /** [선택] click function */
  onClick?: () => void;
}

/**
 * 매우 기본적인 용도를 위한 버튼
 * - 폰트 사이즈는 기본 16px 고정입니다.
 * - click 함수와 함께 color, width만 설정 가능합니다.
 */
const Button = ({ children, colorTheme = 'primary', width, disabled = false, onClick, ...props }: ButtonProps) => (
  <ButtonWrapper
    colorTheme={colorTheme}
    width={width}
    disabled={disabled ?? false}
    onClick={() => onClick?.()}
    {...props}
  >
    <TextBodyTitle>{children}</TextBodyTitle>
  </ButtonWrapper>
);

export default Button;
