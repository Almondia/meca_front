import styled from 'styled-components';

import InfiniteScroll from 'react-infinite-scroller';

// eslint-disable-next-line import/prefer-default-export
export const CategoryListWrapper = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24%, 300px));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  justify-content: center;
  margin-top: 40px;
`;
