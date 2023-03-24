import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

const EmptyPaginationWrapper = styled.div`
  ${FlexCenter};
  min-height: 50vh;
`;

export interface EmptyPaginationProps {
  subInfo?: string;
}

const EmptyPagination = ({ subInfo }: EmptyPaginationProps) => (
  <EmptyPaginationWrapper>{subInfo && '에 대한'} 목록이 존재하지 않습니다</EmptyPaginationWrapper>
);

export default EmptyPagination;
