import { memo } from 'react';

import Skeleton from '@/components/@common/atoms/Skeleton';
import CardSkeleton from '@/components/@common/molecules/Card/CardSkeleton';
import { TextBodySubtitle, TextCaption } from '@/styles/common';

import * as ST from './styled';

const QuizTimelineItemContent = () => (
  <div>
    <TextBodySubtitle>
      <Skeleton.Content style={{ height: '12px', width: '40px' }} />
    </TextBodySubtitle>
    <Skeleton.Content style={{ height: '16px', width: '80%' }} />
    <Skeleton.Content style={{ height: '12px', width: '60%' }} />
  </div>
);

const QuizTimelineItemSkeleton = memo(({ left, unindented }: ST.DefaultStyleProps) => (
  <ST.Wrapper left={left} unindented={unindented} data-testid="id-skeleton-timeline-item">
    <ST.TimelineCard left={left}>
      <CardSkeleton
        hasThumbnail={false}
        idx={0}
        body={
          <ST.SkeletonContentWrapper>
            <QuizTimelineItemContent />
            <QuizTimelineItemContent />
            <QuizTimelineItemContent />
          </ST.SkeletonContentWrapper>
        }
      />
      <ST.TimelineCardBubbleArea />
      <ST.TimelineCardBubble left={left} />
    </ST.TimelineCard>
    <ST.VerticallineBox>
      <ST.VerticalLinePoint color="var(--color-gray)" />
    </ST.VerticallineBox>
    <ST.TimelineSubInfoBox left={left}>
      <div>
        <Skeleton>
          <TextCaption>
            <Skeleton.Content style={{ width: '90px', marginBottom: '6px' }} />
          </TextCaption>
        </Skeleton>
      </div>
      <div>
        <Skeleton>
          <TextCaption>
            <Skeleton.Content style={{ width: '40px', height: '12px' }} />
          </TextCaption>
        </Skeleton>
      </div>
    </ST.TimelineSubInfoBox>
  </ST.Wrapper>
));

export default QuizTimelineItemSkeleton;
