import styled from 'styled-components';

export const IconButtonWrapper = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-top: 2px;
  border-radius: 50%;
  :hover {
    background-color: var(--color-lightgray);
  }
  & > *:hover {
    opacity: 0.6;
  }
`;
