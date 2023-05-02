import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

const EmptyListWrapper = styled.div`
  ${FlexCenter};
  min-height: 50vh;
`;

export interface EmptyListProps {
  subInfo?: string;
}

const EmptyList = ({ subInfo }: EmptyListProps) => (
  <EmptyListWrapper>{subInfo && '에 대한'} 목록이 존재하지 않습니다</EmptyListWrapper>
);

export default EmptyList;
