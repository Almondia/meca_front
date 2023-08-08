import styled from 'styled-components';

import { TextBody } from '@/styles/common';
import { TextAreaBox } from '@/styles/layout';

const SectionBodyWrapper = styled(TextBody)<{ boxed?: boolean; indented?: boolean }>`
  ${TextAreaBox};
  padding: ${(props) => (props.indented ? '30px' : '0px')};
  background-color: ${(props) => (props.boxed ? 'var(--color-brightgray)' : 'transparent')};
  @media ${({ theme }) => theme.media.mobile} {
    padding: ${(props) => (props.indented ? '15px' : '0px')};
  }
`;

interface SectionBodyProps {
  children: React.ReactNode;
  boxed?: boolean;
  indented?: boolean;
}

const SectionBody = ({ children, boxed = true, indented = true }: SectionBodyProps) => (
  <SectionBodyWrapper boxed={boxed} indented={indented}>
    {children}
  </SectionBodyWrapper>
);

export default SectionBody;
