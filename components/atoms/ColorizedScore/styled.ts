/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FONT_SIZE } from '@/styles/constants';

export const ColorizedScoreWrapper = styled.strong<{ size: keyof typeof FONT_SIZE; color: string }>`
  font-size: ${(props) => FONT_SIZE[props.size]};
  color: ${(props) => props.color} !important;
`;
