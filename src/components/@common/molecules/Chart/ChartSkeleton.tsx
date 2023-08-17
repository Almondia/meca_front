import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

import Skeleton from '@/components/@common/atoms/Skeleton';
import { ChartWrapper } from '@/components/@common/molecules/Chart/styled';
import { FlexCenter } from '@/styles/layout';

const ChartContainer = styled.div`
  ${FlexCenter};
  height: 90%;
  padding: 16px;
  margin-left: -20px;
  & > * {
    box-shadow: var(--shadow-normal);
  }
`;

const SkeletonBarChartContainer = styled(ChartContainer)`
  align-items: flex-end;
`;

const SkeletonRoundChartContainer = styled(ChartContainer)`
  position: relative;
  ::after {
    content: '';
    position: absolute;
    margin: auto;
    background-color: var(--color-background);
    height: 60%;
    aspect-ratio: 1;
    border-radius: 50%;
  }
`;

interface ChartSkeletonProps {
  minHeights: ElementSizeType[];
  type?: 'rounded' | 'bar';
}

const ChartSkeleton = ({ minHeights, type = 'bar' }: ChartSkeletonProps) => (
  <Skeleton>
    <ChartWrapper minHeights={minHeights}>
      {type === 'bar' ? (
        <SkeletonBarChartContainer>
          <Skeleton.Content style={{ height: '40px', width: '30px' }} />
          <Skeleton.Content style={{ height: '60%', width: '30px' }} />
          <Skeleton.Content style={{ height: '100%', width: '30px' }} />
          <Skeleton.Content style={{ height: '80%', width: '30px' }} />
          <Skeleton.Content style={{ height: '60px', width: '30px' }} />
        </SkeletonBarChartContainer>
      ) : (
        <SkeletonRoundChartContainer>
          <Skeleton.Content style={{ height: '90%', aspectRatio: 1, borderRadius: '50%' }} />
        </SkeletonRoundChartContainer>
      )}
    </ChartWrapper>
  </Skeleton>
);

export default ChartSkeleton;
