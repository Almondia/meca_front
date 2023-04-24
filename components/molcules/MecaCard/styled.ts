import styled from 'styled-components';

import { TextBody } from '@/styles/common';
import { FlexCenter, FlexColumn } from '@/styles/layout';

export const MecaCardWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
  border: ${({ theme }) => theme.border.card};
  box-shadow: var(--shadow-normal);
  @media ${({ theme }) => theme.media.mobile} {
    max-width: 95%;
    height: auto;
  }
`;

export const MecaCardThumbnailSection = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  cursor: pointer;
  margin-bottom: -8px;
  overflow: hidden;
  img {
    position: relative !important;
    border-top-right-radius: ${({ theme }) => theme.border.card};
    border-top-left-radius: ${({ theme }) => theme.border.card};
    :hover {
      transform: scale(1.05);
    }
    transition: transform 0.75s ease-in-out;
  }
`;

export const MecaCardInfoSection = styled.div`
  ${FlexColumn};
  row-gap: 6px;
  position: relative;
  padding: 24px 16px 16px 24px;
  @media ${({ theme }) => theme.media.mobile} {
    row-gap: 4px;
  }
`;

export const MecaTagContainer = styled.div`
  ${FlexCenter};
  justify-content: flex-end;
`;

export const MecaQuestionTextContainer = styled(TextBody)`
  // TOOD: check firefox
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 140%;
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: var(--color-gray);
`;
