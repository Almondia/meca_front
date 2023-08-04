import styled from 'styled-components';

export const InfiniteListWrapper = styled.div`
  margin-top: 40px;
`;

export const GridListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  justify-content: center;
  @media ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 632px) {
    grid-template-columns: 1fr;
  }
`;

export const MasonryListWrapper = styled.div<{ isMounted: boolean }>`
  opacity: ${(props) => (props.isMounted ? 1 : 0)};
  transition: opacity 0.3s ease-in;
`;

export const WideListWrapper = styled.div``;

export const InfiniteListIntersectionBox = styled.div`
  width: 10px;
  height: 50px;
`;
