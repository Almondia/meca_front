import styled from 'styled-components';

import { COLOR, FONT_SIZE } from '@/styles/constants';
import { ElementSizeType } from '@/types/common';

const BUTTON_THEME = {
  primary: ['var(--color-brand)', COLOR.txtLight],
  cancel: [COLOR.gray100, COLOR.txtDark],
  success: [COLOR.success, COLOR.txtLight],
  warning: [COLOR.warning, COLOR.txtLight],
  error: [COLOR.error, COLOR.txtLight],
} as const;

const BUTTON_SIZE = {
  normal: {
    padding: '11px 14px',
    fontSize: FONT_SIZE.main,
  },
  small: {
    padding: '7px 10px',
    fontSize: FONT_SIZE.sub,
  },
} as const;

export interface ButtonStyleProp {
  /** [필수] 버튼 배경 색상 테마 - 기본: primary */
  colorTheme: keyof typeof BUTTON_THEME;
  /** [선택] 버튼 길이 - px, rem, % - 기본: fit-content */
  width?: ElementSizeType;
  /** [선택] 버튼 비활성화 - 기본: false */
  disabled?: boolean;
  /** [선택] size - normal, small, 기본: normal */
  size?: keyof typeof BUTTON_SIZE;
}

export const ButtonWrapper = styled.button<ButtonStyleProp>`
  width: ${(props) => props.width ?? 'fit-content'};
  padding: ${(props) => BUTTON_SIZE[props.size ?? 'normal'].padding};
  background-color: ${(props) => BUTTON_THEME[props.colorTheme][0]};
  color: ${(props) => BUTTON_THEME[props.colorTheme][1]};
  div {
    font-size: ${(props) => BUTTON_SIZE[props.size ?? 'normal'].fontSize};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.9;
  }
`;
