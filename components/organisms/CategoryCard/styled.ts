import styled from 'styled-components';

export const CategoryCardWrapper = styled.div`
  max-width: 350px;
  position: relative;
  padding: 24px;
  border: ${({ theme }) => theme.border.card};
  box-shadow: ${({ theme }) => theme.shadow.normal};
`;

export const ProgressesInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 16px;
  margin-top: 10px;
  & > div {
    min-width: 132px;
  }
  & > p {
    width: 48px;
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
`;
