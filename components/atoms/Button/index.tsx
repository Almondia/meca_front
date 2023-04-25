import { TextBodyTitle } from '@/styles/common';
import getInnerComponents from '@/utils/getInnerComponent.s';

import InnerText, { innerTextType } from './inner/InnerText';
import RightIcon, { rightIconType } from './inner/RightIcon';
import { ButtonIconGroup, ButtonStyleProp, ButtonWrapper } from './styled';

export interface ButtonProps extends ButtonStyleProp {
  /** [필수] element
   * - children이 `일반 텍스트 또는 element면 그대로 반환됩니다.
   * - children에 `아이콘 삽입시 RightIcon과 InnerText 내부 컴포넌트를 사용해야 합니다
   */
  children: React.ReactNode;
  /** [선택] click function */
  onClick?: () => void;
}

/**
 * 매우 기본적인 용도를 위한 버튼
 * - 폰트 사이즈는 기본 16px 고정입니다.
 * - click 함수와 함께 color, width만 설정 가능합니다.
 */
const Button = ({ children, colorTheme = 'primary', width, disabled = false, onClick, ...props }: ButtonProps) => {
  const rightIcon = getInnerComponents(children, rightIconType);
  const innerText = getInnerComponents(children, innerTextType);
  return (
    <ButtonWrapper
      colorTheme={colorTheme}
      width={width}
      disabled={disabled ?? false}
      onClick={() => onClick?.()}
      {...props}
    >
      {rightIcon ? (
        <ButtonIconGroup>
          {innerText}
          {rightIcon}
        </ButtonIconGroup>
      ) : (
        <TextBodyTitle>{children}</TextBodyTitle>
      )}
    </ButtonWrapper>
  );
};

Button.InnerText = InnerText;
Button.RightIcon = RightIcon;

export default Button;
