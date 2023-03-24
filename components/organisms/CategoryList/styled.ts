import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';

// eslint-disable-next-line import/prefer-default-export
export const CategoryListWrapper = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, max-content));
  grid-column-gap: 30px;
  grid-row-gap: 16px;
  justify-content: center;
  margin-top: 40px;
`;
