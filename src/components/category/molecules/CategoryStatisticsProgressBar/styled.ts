import styled from 'styled-components';

export const CategoryStatisticsProgressBarWrapper = styled.div`
  & > div {
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
  }
`;
