import { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

import ColorizedScore from '@/components/atoms/ColorizedScore';
import LinkButton from '@/components/atoms/LinkButton';
import RelativeDateText from '@/components/common/RelativeDateText';
import InfiniteList from '@/components/molcules/InfiniteList';
import QuizResultItem from '@/components/molcules/QuizResultItem';
import useMecaHistory from '@/hooks/meca/useMecaHistory';
import { TextBodySubtitle, TextCaption } from '@/styles/common';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import {
  QuizHistoryInfiniteListContainer,
  QuizHistoryListEmpty,
  QuizHistoryListHeader,
  QuizHistoryListItem,
  QuizHistoryListWrapper,
  QuizHistoryMoreButton,
} from './styled';

export interface QuizHistoryListProps {
  resourceId: string;
  resourceType: 'members' | 'cards';
  excludeRows?: ('user' | 'card-id' | 'quiz-type')[];
}

const QuizHistoryList = ({ resourceId, resourceType, excludeRows }: QuizHistoryListProps) => {
  const router = useRouter();
  const [requestedNextPage, setRequeustedNextPage] = useState(false);
  const {
    cardHistoryList: historyList,
    fetchNextPage,
    hasNextPage,
    isEmpty,
    isFetching,
  } = useMecaHistory(resourceType, resourceId);
  const hasQuizType = !excludeRows?.some((excluded) => excluded === 'quiz-type');

  useEffect(() => {
    if (isFetching && requestedNextPage) {
      setRequeustedNextPage(false);
    }
  }, [requestedNextPage, isFetching]);

  const moreButtonVisible = !!hasNextPage && !isFetching && !requestedNextPage;

  const handleMoreButtonClick = useCallback(() => {
    moreButtonVisible && setRequeustedNextPage(true);
  }, [moreButtonVisible]);

  const handleCardLinkClick = ({ memberId, cardId }: { memberId: string; cardId: string }) => {
    const cardPath = combineUUID(memberId, cardId);
    router.push(`/mecas/${cardPath}`);
  };

  return (
    <QuizHistoryListWrapper excludeRows={excludeRows ?? []}>
      <QuizHistoryListHeader>
        <TextBodySubtitle>
          <span className="card-id">문제ID</span>
          <span className="user">제출자</span>
          <span className="question-info">문제정보</span>
          <span>점수</span>
          <span>일시</span>
        </TextBodySubtitle>
      </QuizHistoryListHeader>
      {isEmpty ? (
        <QuizHistoryListEmpty>
          <div>
            <p>아직 기록이 없습니다!</p>
          </div>
        </QuizHistoryListEmpty>
      ) : (
        <QuizHistoryInfiniteListContainer>
          <InfiniteList loadMore={fetchNextPage} hasNext={requestedNextPage && hasNextPage} type="wide">
            {historyList.contents.map((content) => {
              const { question, answer } = getQuestionAnswerByCardType({ ...content });
              const { answer: userAnswer } = getQuestionAnswerByCardType({
                ...content,
                answer: content.userAnswer,
              });
              return (
                <QuizHistoryListItem data-testid="id-history-list" key={content.cardHistoryId}>
                  <div>
                    <TextCaption className="card-id">
                      <LinkButton onClick={() => handleCardLinkClick({ ...content })}>
                        {content.cardId.slice(-6)}
                      </LinkButton>
                    </TextCaption>
                    <TextCaption className="user">{content.solvedMemberName}</TextCaption>
                    <div className="question-info">
                      <QuizResultItem
                        question={question}
                        answer={answer}
                        userAnswer={userAnswer}
                        quizType={hasQuizType ? MECA_RESPONE_TO_TAG[content.cardType] : undefined}
                      />
                    </div>
                    <TextCaption>
                      <ColorizedScore score={content.score} size="caption" hasPostFixText />
                    </TextCaption>
                    <TextCaption>
                      <RelativeDateText date={content.createdAt} />
                    </TextCaption>
                  </div>
                </QuizHistoryListItem>
              );
            })}
            <br />
            <QuizHistoryMoreButton
              visible={moreButtonVisible}
              width="100%"
              colorTheme="cancel"
              size="small"
              onClick={handleMoreButtonClick}
            >
              더보기+
            </QuizHistoryMoreButton>
          </InfiniteList>
        </QuizHistoryInfiniteListContainer>
      )}
    </QuizHistoryListWrapper>
  );
};

export default QuizHistoryList;
