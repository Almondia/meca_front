/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

export const ChartWrapper = styled.div<{ minHeights: ElementSizeType[] }>`
  position: relative;
  min-height: ${(props) => props.minHeights[0]};
  & > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  @media ${({ theme }) => theme.media.tablet} {
    min-height: ${(props) => props.minHeights[1]};
  }
  @media ${({ theme }) => theme.media.mobile} {
    min-height: ${(props) => props.minHeights[2]};
  }
`;
