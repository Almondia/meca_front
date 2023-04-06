import styled from 'styled-components';

import InfiniteScroll from 'react-infinite-scroller';

export const MecaListWrapper = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 340px));
  grid-column-gap: 30px;
  grid-row-gap: 16px;
  justify-content: center;
  margin-top: 40px;
`;

export const A = 1;
