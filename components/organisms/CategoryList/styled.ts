import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const CategoryListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, max-content));
  grid-column-gap: 30px;
  grid-row-gap: 16px;
  justify-content: center;
  margin-top: 40px;
`;

export const EmptyCategoryList = styled.div`
  ${FlexCenter};
  min-height: 50vh;
`;
