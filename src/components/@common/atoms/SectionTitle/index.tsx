import styled from 'styled-components';

import { TextBodyTitle } from '@/styles/common';

const SectionTitleWrapper = styled(TextBodyTitle).attrs({ as: 'h4' })`
  word-wrap: break-word;
  margin: 0 0 6px 2px;
  font-family: var(--font-sub);
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <SectionTitleWrapper>{children}</SectionTitleWrapper>
);

export default SectionTitle;
