/* eslint-disable import/prefer-default-export */
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

export const MecaListWrapper = styled(InfiniteScroll)<{ visible: boolean }>`
  margin-top: 40px;
  & > * {
    opacity: ${(props) => (props.visible ? 1 : 0)};
  }
`;
