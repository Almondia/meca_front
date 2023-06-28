import Link from 'next/link';

import styled from 'styled-components';

export const NavSelectionWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 45px;
  right: -5px;
  width: 120px;
  border-radius: 2px;
  box-shadow: var(--shadow-normal);
  background-color: var(--color-element-background);
`;

export const NavSelectionItem = styled(Link)`
  display: block;
  padding: 12px 16px 12px 24px;
  font-size: ${({ theme }) => theme.fontSize.sub};
  text-align: left;
  color: var(--color-text);
  :hover {
    background-color: var(--color-gray100);
    color: var(--color-subbrand);
  }
`;
