import styled from 'styled-components';

import { TextBody } from '@/styles/common';
import { FlexSpaceBetween } from '@/styles/layout';

export const MecaSubInfoStrongText = styled.strong<{ color?: string }>`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${(props) => props.color ?? 'var(--color-text)'};
`;

export const BodyMain = styled(TextBody)`
  display: -webkit-box;
  width: 95%;
  margin-bottom: 0.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 130%;
  font-size: 0.8rem;
  color: var(--color-gray);
`;

export const BodySub = styled.div`
  ${FlexSpaceBetween};
  align-items: center;
  strong {
    color: var(--color-text);
  }
`;

export const ProgressesInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 6px;
  & > div {
    min-width: 120px;
  }
  & > p {
    margin-bottom: -1px;
    color: var(--color-darkgray);
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
`;
