import { TextBodyTitle } from '@/styles/common';

import { ButtonStyleProp, ButtonWrapper } from './styled';

interface ButtonProps extends ButtonStyleProp {
  children: React.ReactNode;
  onClick?: () => void;
}

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
