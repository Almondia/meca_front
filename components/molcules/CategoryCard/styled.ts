import styled from 'styled-components';

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

export const CategoryCardInfoBox = styled.div`
  transform: scale(0.85);
  margin-left: -30px;
  margin-bottom: 5px;
`;

export const CategoryCardBodyContainer = styled.div``;
