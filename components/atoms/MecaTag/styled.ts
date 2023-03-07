import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';
import { TextBodySubtitle } from '@/styles/common';

export const MecaTagWrapper = styled.div<{ scale: number; isNotOpaque: boolean; themeColor: string }>`
  position: relative;
  ${FlexCenter};
  width: 70px;
  height: 18px;
  padding: 3px 0 3px 8px;
  margin-top: ${(props) => 15 * (props.scale - 1)}px;
  margin-left: ${(props) => 43 * (props.scale - 1)}px;
  border-radius: ${({ theme }) => theme.border.button};
  background-color: ${(props) => props.themeColor};
  opacity: ${(props) => (props.isNotOpaque ? 0.5 : 1)};
  transform: ${(props) => `scale(${props.scale})`};
`;

export const TagIconBox = styled.div`
  position: absolute;
  top: 4px;
  left: 6px;
  ${FlexCenter};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
`;

export const TagText = styled(TextBodySubtitle)`
  margin-left: 6px;
  font-size: 11px;
  letter-spacing: 0.05rem;
  color: white;
`;
