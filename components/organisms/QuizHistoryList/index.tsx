import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';

import { CardHistoryListResponse } from '@/apis/cardHistoryApi';
import IconButton from '@/components/atoms/IconButton';
import LinkButton from '@/components/atoms/LinkButton';
import RelativeDateText from '@/components/common/RelativeDateText';
import MecaTag from '@/components/molcules/MecaTag';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import {
  QuizHistoryListWrapper,
  QuizHistoryPageCursorButtonContainer,
  QuizHistoryTable,
  QuizHistoryTableContentRow,
  QuizHistoryTablePageController,
} from './styled';

export interface QuizHistoryListProps {
  excludeRows?: ('user' | 'question' | 'card-id' | 'quiz-type')[];
  historyList: InfiniteData<CardHistoryListResponse> | undefined;
  fetchNextPage: () => void;
}

const QuizHistoryList = ({ excludeRows, historyList, fetchNextPage }: QuizHistoryListProps) => {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();

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
              <th scope="col" className="quiz-type">
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
                      <td className="card-id">
                        <LinkButton onClick={() => handleCardLinkClick({ ...content })}>
                          {content.cardId.slice(-4)}
                        </LinkButton>
                      </td>
                      <td width="130px" className="user">
                        {content.solvedMemberName}
                      </td>
                      <td className="quiz-type">
                        <MecaTag tagName={MECA_RESPONE_TO_TAG[content.cardType]} scale={0.8} />
                      </td>
                      <td className="quiz-content-devide">
                        <p className="question">
                          <strong>{question}</strong>
                        </p>
                        <div>
                          <p>[정답]</p> <em>{answer}</em>
                        </div>
                        <div>
                          <p>[제출]</p> <em>{userAnswer}</em>
                        </div>
                      </td>
                      <td>{content.score}</td>
                      <td>
                        <RelativeDateText date={content.createdAt} />
                      </td>
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
