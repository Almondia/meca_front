/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { memo } from 'react';

import { ElementSizeType } from '@/types/common';

import Skeleton from '@/components/@common/atoms/Skeleton';
import {
  CardBodyWrapper,
  CardContentSkeletonWrapper,
  CardSkeletonWrapper,
  CardThumbnailSkeletonWrapper,
  CardTitleWrapper,
} from '@/components/@common/molecules/Card/styled';

interface CardSkeletonProps {
  idx?: number;
  hasThumbnail?: boolean;
  thumbnailRatio?: number;
  body?: React.ReactNode;
  bodyHeight?: ElementSizeType | 'auto';
}

interface CardSkeletonsProps extends Omit<CardSkeletonProps, 'idx'> {
  keyId: string;
  length: number;
}

const CardSkeleton = memo(
  ({ idx = 0, hasThumbnail = true, thumbnailRatio, body, bodyHeight = 'auto' }: CardSkeletonProps) => (
    <Skeleton>
      <CardSkeletonWrapper idx={idx} data-testid="id-skeleton-card">
        {hasThumbnail && (
          <CardThumbnailSkeletonWrapper ratio={thumbnailRatio ?? 4}>
            <Skeleton.Content style={{ height: '100%' }} />
          </CardThumbnailSkeletonWrapper>
        )}
        <CardBodyWrapper>
          <div>
            <CardTitleWrapper>
              <Skeleton.Content style={{ width: '50%' }} />
            </CardTitleWrapper>
          </div>
          {body || (
            <CardContentSkeletonWrapper height={bodyHeight}>
              <div>
                <Skeleton.Content style={{ width: '36px', height: '12px' }} />
                <Skeleton.Content style={{ flex: 0.7, height: '12px' }} />
              </div>
              <div>
                <Skeleton.Content style={{ width: '36px' }} />
                <Skeleton.Content style={{ flex: 0.5 }} />
              </div>
            </CardContentSkeletonWrapper>
          )}
        </CardBodyWrapper>
      </CardSkeletonWrapper>
    </Skeleton>
  ),
);

export const cardSkeletons = (props: CardSkeletonsProps) => {
  const list: JSX.Element[] = [];
  Array.from(Array(props.length).keys()).forEach((_, index) => {
    list.push(<CardSkeleton key={props.keyId + index} {...props} idx={index} />);
  });
  return list;
};

export default CardSkeleton;
