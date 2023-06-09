import { useCallback, useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';

import { CardHistoryListResponse } from '@/apis/cardHistoryApi';
import IconButton from '@/components/atoms/IconButton';
import { RelativeDateText } from '@/components/common/RelativeDateText';
import MecaTag from '@/components/molcules/MecaTag';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';

import {
  QuizHistoryListWrapper,
  QuizHistoryPageCursorButtonContainer,
  QuizHistoryTable,
  QuizHistoryTableContentRow,
  QuizHistoryTablePageController,
} from './styled';

export interface QuizHistoryListProps {
  excludeRows?: ('user' | 'question' | 'card-id')[];
  historyList: InfiniteData<CardHistoryListResponse> | undefined;
  fetchNextPage: () => void;
}

const QuizHistoryList = ({ excludeRows, historyList, fetchNextPage }: QuizHistoryListProps) => {
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    if (historyList?.pages[page].hasNext) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getRelativeDate = useCallback((date: string) => {
    const DateText = RelativeDateText({ date });
    return <DateText />;
  }, []);

  return (
    <QuizHistoryListWrapper excludeRows={excludeRows ?? []}>
      <QuizHistoryTable>
        <table>
          <thead>
            <tr>
              <th scope="col" className="card-id">
                문제ID
              </th>
              <th scope="col" className="user">
                푼사람
              </th>
              <th scope="col" className="question">
                문제유형
              </th>
              <th scope="col">문제정보</th>
              <th scope="col">점수</th>
              <th scope="col">일시</th>
            </tr>
          </thead>
          <tbody>
            {!historyList || historyList.pages[page].contents.length === 0 ? (
              <QuizHistoryTableContentRow>
                <td colSpan={6 - (excludeRows?.length ?? 0)}>아직 기록이 없습니다!</td>
              </QuizHistoryTableContentRow>
            ) : (
              <>
                {historyList.pages[page].contents.map((content) => {
                  const { question, answer } = getQuestionAnswerByCardType({ ...content });
                  const { answer: userAnswer } = getQuestionAnswerByCardType({
                    ...content,
                    answer: content.userAnswer,
                  });
                  return (
                    <QuizHistoryTableContentRow data-testid="id-history-list" key={content.cardHistoryId}>
                      <td className="card-id">{content.cardId}</td>
                      <td width="130px" className="user">
                        {content.solvedUserName}
                      </td>
                      <td className="question">
                        <MecaTag tagName={MECA_RESPONE_TO_TAG[content.cardType]} scale={0.8} />
                      </td>
                      <td className="quiz-content-devide">
                        <p className="question">
                          <strong>{question}</strong>
                        </p>
                        <p>
                          정답: <em>{answer}</em>
                        </p>
                        <p>
                          제출: <em>{userAnswer}</em>
                        </p>
                      </td>
                      <td>{content.score}</td>
                      <td>{getRelativeDate(content.createdAt)}</td>
                    </QuizHistoryTableContentRow>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </QuizHistoryTable>
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
    </QuizHistoryListWrapper>
  );
};

export default QuizHistoryList;
