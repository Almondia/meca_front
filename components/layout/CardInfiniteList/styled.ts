/* eslint-disable import/prefer-default-export */
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

export const CardInfiniteListWrapper = styled(InfiniteScroll)<{ visible: string }>`
  margin-top: 40px;
  & > * {
    opacity: ${(props) => (props.visible === 'true' ? 1 : 0)};
  }
`;

export const CardInfiniteGridContainer = styled.div`
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
  @media (max-width: 732px) {
    grid-template-columns: 1fr;
  }
`;
