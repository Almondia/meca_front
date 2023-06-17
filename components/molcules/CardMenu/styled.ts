import Link from 'next/link';

import styled from 'styled-components';

export const CardMenuWrapper = styled.div<{ top: string; right: string }>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  transform: scale(0.7);
  z-index: 2;
`;

export const CardMenuDropdownWrapper = styled.div`
  position: absolute;
  top: 45px;
  right: -5px;
  width: 140px;
  border-radius: 2px;
  box-shadow: var(--shadow-normal);
  background-color: var(--color-background);
`;

export const CardDropdownMenuLink = styled(Link)`
  display: block;
  padding: 12px 18px;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: var(--color-text);
  :hover {
    background-color: var(--color-gray100);
    color: var(--color-brand);
  }
`;
