import { useCallback, useState } from 'react';

import InfiniteList from '@/components/@common/molecules/InfiniteList';
import DeferredComponent from '@/components/@util/DeferredComponent';
import QuizTimelineItem from '@/components/quiz/organisms/QuizTimelineItem';
import QuizTimelineItemSkeleton from '@/components/quiz/organisms/QuizTimelineItem/QuizTimelineItemSkeleton';
import useMecaHistory from '@/hooks/meca/useMecaHistory';
import { combineUUID } from '@/utils/uuidHandler';

import { QuizHistoryTimelineEmpty, QuizHistoryTimelineMoreFetchButton, QuizHistoryTimelineWrapper } from './styled';

interface QuizHistoryTimelineProps {
  resourceId: string;
  resourceType: 'members' | 'cards';
}

const QuizHistoryTimeline = ({ resourceId, resourceType }: QuizHistoryTimelineProps) => {
  const [requestedNextPage, setRequeustedNextPage] = useState(false);
  const {
    cardHistoryList: historyList,
    fetchNextPage,
    hasNextPage,
    isEmpty,
    isFetching,
  } = useMecaHistory(resourceType, resourceId);

  const moreButtonVisible = !!hasNextPage && !isFetching && !requestedNextPage;

  const handleMoreButtonClick = useCallback(() => {
    setRequeustedNextPage(true);
  }, []);

  if (isEmpty) {
    return (
      <QuizHistoryTimelineEmpty>
        <div>
          <p>아직 기록이 없습니다!</p>
        </div>
      </QuizHistoryTimelineEmpty>
    );
  }
  return (
    <QuizHistoryTimelineWrapper hided={moreButtonVisible}>
      <InfiniteList loadMore={fetchNextPage} hasNext={requestedNextPage && hasNextPage} type="wide">
        {historyList.contents.map((content, idx) => {
          const { card, cardHistory, solvedMember } = content;
          return (
            <QuizTimelineItem
              key={cardHistory.cardHistoryId}
              unindented={idx !== 0}
              left={idx % 2 === 0}
              cardLink={`/mecas/${combineUUID(card.memberId, card.cardId)}`}
              {...card}
              {...cardHistory}
              scorePostfixText={resourceType === 'cards' ? `by ${solvedMember.solvedMemberName}` : ''}
            />
          );
        })}
        {!moreButtonVisible && (
          <DeferredComponent delay={requestedNextPage ? 0 : 200}>
            <QuizTimelineItemSkeleton unindented={requestedNextPage} left={historyList.contents.length % 2 === 0} />
            <QuizTimelineItemSkeleton unindented left={historyList.contents.length % 2 !== 0} />
          </DeferredComponent>
        )}
      </InfiniteList>
      {moreButtonVisible && (
        <QuizHistoryTimelineMoreFetchButton
          visible={moreButtonVisible}
          width="100%"
          colorTheme="cancel"
          size="small"
          onClick={handleMoreButtonClick}
        >
          계속보기
        </QuizHistoryTimelineMoreFetchButton>
      )}
    </QuizHistoryTimelineWrapper>
  );
};

export default QuizHistoryTimeline;
