import { COLOR } from '@/styles/constants';
import { FlexCenter } from '@/styles/layout';
import { ElementSizeType } from '@/types/common';
import styled from 'styled-components';

const buttonTheme = {
  primary: [COLOR.brand1, COLOR.txtLight],
  cancel: [COLOR.gray100, COLOR.txtDark],
  success: [COLOR.success, COLOR.txtLight],
  warning: [COLOR.warning, COLOR.txtLight],
  error: [COLOR.error, COLOR.txtLight],
};

export type ButtonThemeType = keyof typeof buttonTheme;

export interface ButtonStyleProp {
  /** [필수] 버튼 배경 색상 테마 - 기본: primary */
  colorTheme: ButtonThemeType;
  /** [선택] 버튼 길이 - px, rem, % - 기본: fit-content */
  width?: ElementSizeType;
  /** [선택] 버튼 비활성화 - 기본: false */
  disabled?: boolean;
}

export const ButtonWrapper = styled.button<ButtonStyleProp>`
  ${FlexCenter};
  width: ${(props) => props.width ?? 'fit-content'};
  padding: 13px 17px;
  background-color: ${(props) =>
    props.colorTheme === 'primary' ? props.theme.brandColor : buttonTheme[props.colorTheme][0]};
  color: ${(props) => buttonTheme[props.colorTheme][1]};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.9;
  }
`;
