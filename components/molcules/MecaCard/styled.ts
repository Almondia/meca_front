import styled from 'styled-components';

import { TextBody } from '@/styles/common';
import { FlexColumn } from '@/styles/layout';

export const MecaCardWrapper = styled.div`
  ${FlexColumn};
  row-gap: 14px;
  max-width: 564px;
  height: 85px;
  position: relative;
  padding: 24px;
  border: ${({ theme }) => theme.border.card};
  box-shadow: var(--shadow-normal);
  @media ${({ theme }) => theme.media.mobile} {
    row-gap: 8px;
    height: auto;
    padding-bottom: 14px;
  }
`;

export const MecaTagContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 17px;
  @media ${({ theme }) => theme.media.mobile} {
    position: relative;
    right: 0;
    bottom: 0;
  }
`;

export const MecaQuestionTextContainer = styled(TextBody)`
  // TOOD: check firefox
  display: -webkit-box;
  width: 83%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 140%;
  color: var(--color-gray);
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;
