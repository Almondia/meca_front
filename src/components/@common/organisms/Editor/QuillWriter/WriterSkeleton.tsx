import styled from 'styled-components';

import Skeleton from '@/components/@common/atoms/Skeleton';
import DeferredComponent from '@/components/@util/DeferredComponent';
import { FlexColumn } from '@/styles/layout';

const WriterSkeletonToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top-left-radius: ${({ theme }) => theme.border.button};
  border-top-right-radius: ${({ theme }) => theme.border.button};
  border: 1px solid var(--color-lightgray);
  padding: 8px 12px;
  column-gap: 12px;
  row-gap: 5px;
  & > * {
    opacity: 0.6;
    border-radius: ${({ theme }) => theme.border.card};
  }
`;

const WriterSkeletonContent = styled.div`
  ${FlexColumn};
  padding: 12px;
  gap: 12px;
  border-bottom-left-radius: ${({ theme }) => theme.border.button};
  border-bottom-right-radius: ${({ theme }) => theme.border.button};
  border: 1px solid var(--color-lightgray);
  & > * {
    border-radius: ${({ theme }) => theme.border.card};
    opacity: 0.6;
  }
`;

const WriterSkeleton = () => (
  <DeferredComponent delay={20} keepLayout>
    <Skeleton>
      <WriterSkeletonToolbar>
        <Skeleton.Content style={{ height: '24px', width: '278px' }} />
        <Skeleton.Content style={{ height: '24px', width: '84px' }} />
        <Skeleton.Content style={{ height: '24px', width: '84px' }} />
      </WriterSkeletonToolbar>
      <WriterSkeletonContent>
        <Skeleton.Content style={{ height: '120px' }} />
        <Skeleton.Content style={{ height: '30px', padding: '8px 0' }} />
      </WriterSkeletonContent>
    </Skeleton>
  </DeferredComponent>
);

export default WriterSkeleton;
