import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';

import { CardHistoryListResponse } from '@/apis/cardHistoryApi';
import ColorizedScore from '@/components/atoms/ColorizedScore';
import IconButton from '@/components/atoms/IconButton';
import LinkButton from '@/components/atoms/LinkButton';
import RelativeDateText from '@/components/common/RelativeDateText';
import QuizResultItem from '@/components/molcules/QuizResultItem';
import { TextBodySubtitle, TextCaption } from '@/styles/common';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import {
  QuizHistoryListEmpty,
  QuizHistoryListHeader,
  QuizHistoryListItem,
  QuizHistoryListWrapper,
  QuizHistoryPageCursorButtonContainer,
  QuizHistoryTablePageController,
} from './styled';

export interface QuizHistoryListProps {
  excludeRows?: ('user' | 'card-id' | 'quiz-type')[];
  historyList: InfiniteData<CardHistoryListResponse> | undefined;
  fetchNextPage: () => void;
}

const QuizHistoryList = ({ excludeRows, historyList, fetchNextPage }: QuizHistoryListProps) => {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const hasQuizType = !excludeRows?.some((excluded) => excluded === 'quiz-type');

  useEffect(() => {
    if (historyList?.pages[page].hasNext) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleCardLinkClick = ({ memberId, cardId }: { memberId: string; cardId: string }) => {
    const cardPath = combineUUID(memberId, cardId);
    router.push(`/mecas/${cardPath}`);
  };

  return (
    <>
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
        {!historyList || historyList.pages[page].contents.length === 0 ? (
          <QuizHistoryListEmpty>
            <div>
              <p>아직 기록이 없습니다!</p>
            </div>
          </QuizHistoryListEmpty>
        ) : (
          <>
            {historyList.pages[page].contents.map((content) => {
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
          </>
        )}
      </QuizHistoryListWrapper>
      <br />
      <QuizHistoryTablePageController>
        <QuizHistoryPageCursorButtonContainer isEnabled={page !== 0}>
          <IconButton
            icon="Prev"
            name="이전 퀴즈 기록 목록 보기 버튼"
            iconSize="1rem"
            onClick={() => page !== 0 && setPage((prev) => prev - 1)}
          />
        </QuizHistoryPageCursorButtonContainer>
        <QuizHistoryPageCursorButtonContainer isEnabled={!!historyList?.pages[page].hasNext}>
          <IconButton
            icon="Next"
            name="다음 퀴즈 기록 목록 보기 버튼"
            iconSize="1rem"
            onClick={() => !!historyList?.pages[page].hasNext && setPage((prev) => prev + 1)}
          />
        </QuizHistoryPageCursorButtonContainer>
      </QuizHistoryTablePageController>
    </>
  );
};

export default QuizHistoryList;
