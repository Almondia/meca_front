import styled from 'styled-components';

import { TextBodySubtitle } from '@/styles/common';
import { FlexColumn } from '@/styles/layout';

export const DescriptionWrapper = styled.ul`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.gray};
  & > li {
    margin: 0 0 8px 4px;
  }
`;

export const ValidationWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: var(--color-error);
`;

export const LabelWrapper = styled(TextBodySubtitle)`
  margin-bottom: -6px;
  color: ${({ theme }) => theme.gray};
`;

export const InputGroupWrapper = styled.div`
  ${FlexColumn};
  row-gap: 8px;
  margin: 20px 0;
`;
