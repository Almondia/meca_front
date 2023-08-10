import styled from 'styled-components';

import { TextBodySubtitle } from '@/styles/common';
import { FlexCenter } from '@/styles/layout';

export const IconTagWrapper = styled.div<{ scale: number; bgColor?: string }>`
  position: relative;
  ${FlexCenter};
  width: 70px;
  height: 18px;
  padding: 3px 0 3px 8px;
  border-radius: ${({ theme }) => theme.border.button};
  background-color: ${(props) => props.bgColor ?? 'black'};
  transform: ${(props) => `scale(${props.scale})`};
  transform-origin: 0% 0%;
`;

export const IconTagIconBox = styled.div`
  position: absolute;
  top: 0;
  left: 4px;
  bottom: 0;
  margin: auto;
  ${FlexCenter};
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: white;
  & > div {
    padding-top: 2px;
  }
`;

export const IconTagText = styled(TextBodySubtitle)<{ textColor?: string }>`
  margin-left: 6px;
  font-size: 11px;
  letter-spacing: 0.05rem;
  color: ${(props) => props.textColor ?? 'white'};
`;
