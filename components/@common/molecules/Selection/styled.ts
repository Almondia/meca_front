import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

export const SelectionWrapper = styled.div`
  & > button:first-child {
    border-radius: 4px 0 0 4px;
  }
  & > button:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

export const SelectionToggle = styled.button<{ isSelected: boolean; minWidth?: ElementSizeType }>`
  min-width: ${(props) => props.minWidth ?? '60px'};
  padding: 8px;
  border-radius: 0;
  border: 1px solid var(--color-lightgray);
  background-color: ${(props) => (props.isSelected ? 'var(--color-brand)' : 'inherit')};
  color: ${(props) => (props.isSelected ? 'var(--color-text-light)' : 'var(--color-text)')};
  :hover {
    opacity: ${(props) => (props.isSelected ? 1 : 0.7)};
  }
`;
