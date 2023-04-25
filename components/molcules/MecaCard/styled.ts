import styled from 'styled-components';

import { TextBody } from '@/styles/common';
import { FlexCenter } from '@/styles/layout';

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
