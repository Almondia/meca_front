import styled from 'styled-components';

export const CategorySearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  border: 1px solid var(--color-gray);
  border-radius: ${({ theme }) => theme.border.button};
  & > *:first-child {
    flex: 1;
    border: none;
  }
`;

export const CategorySearchBarIconButton = styled.button`
  padding: 0 0 0 4px;
  & > * {
    padding: 7px;
    background-color: var(--color-brand);
    border-bottom-right-radius: ${({ theme }) => theme.border.button};
    border-top-right-radius: ${({ theme }) => theme.border.button};
  }
`;
