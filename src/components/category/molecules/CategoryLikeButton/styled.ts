import styled from 'styled-components';

export const CategoryLikeButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  @media ${({ theme }) => theme.media.mobile} {
    justify-content: flex-end;
  }
`;
