/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FONT_SIZE } from '@/styles/constants';

export const LinkButtonWrapper = styled.button<{ textColor: string; textSize: keyof typeof FONT_SIZE }>`
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.fontSize[props.textSize]};
  color: ${(props) => props.textColor};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;
