import { renderQuery } from '../../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { implementServer, resetServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedGetMecaHistoryByMemberApi } from '@/mock/api';

import QuizHistoryList from '@/components/quiz/organisms/QuizHistoryList';

const HISTORY_LIST = {
  contents: [
    {
      cardHistory: {
        cardHistoryId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf2b',
        userAnswer: 'ENFJ',
        score: 21,
        createdAt: '2023-06-16T14:24:57.2667251',
      },
      solvedMember: {
        solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        solvedMemberName: 'simon',
      },
      card: {
        cardId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf29',
        memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        title: '퀴즈제목',
        question: '박동석의 MBTI는 무엇일까요?',
        answer: 'INFP',
        cardType: 'KEYWORD',
        createdAt: '2023-06-16T14:24:57.2667251',
        modifiedAt: '2023-06-16T14:24:57.2667251',
      },
    },
    {
      cardHistory: {
        cardHistoryId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf2z',
        userAnswer:
          '천방지축 어리둥절 빙글빙글 돌아가는 짱구의 하루~ 우리의 짱구는 정말 못말려 (짱구야~) 짓굿은 장난은 나에게 맡기세요~',
        score: 64,
        createdAt: '2023-06-16T14:24:57.2667251',
      },
      solvedMember: {
        solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        solvedMemberName: 'simon',
      },
      card: {
        cardId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf29',
        memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        title: 'Event Loop',
        question: 'event loop를 설명해보세요',
        answer:
          'JavaScript 런타임 환경에서 동작하는 기능으로 callstack, callback queue, microtask queue를 감시하며 callstack이 비워졌을 경우 적절한 callback queue를 호출하도록 하는 비동기/논블로킹 동작의 핵심이 되는 기술',
        cardType: 'ESSAY',
        createdAt: '2023-06-16T14:24:57.2667251',
        modifiedAt: '2023-06-16T14:24:57.2667251',
      },
    },
    {
      cardHistory: {
        cardHistoryId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf99',
        userAnswer: '우하하하함ㅎㄷㅁㅎㅁ',
        score: 80,
        createdAt: '2023-06-16T14:24:57.2667251',
      },
      solvedMember: {
        solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        solvedMemberName: 'simon',
      },
      card: {
        cardId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf29',
        memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        title: 'Event Loop',
        question:
          '질문이 엄청나게 길어서 짤릴수도 있으니까 이렇게 길게써보려는데 어느정도 길이까지 커버가 가능할까요 질문이 엄청나게 길어서 짤릴수도 있으니까 이렇게 길게써보려는데 어느정도 길이까지 커버가 가능할까요',
        answer: '정답이아주길면어떡하지어떡해어떡해해야할까요',
        cardType: 'ESSAY',
        createdAt: '2023-06-16T14:24:57.2667251',
        modifiedAt: '2023-06-16T14:24:57.2667251',
      },
    },
  ],
  hasNext: '0188625a-433e-f7f6-0eb4-e24ef9a5bd99',
  pageSize: 3,
};

const EMPTY_LIST = {
  contents: [],
  hasNext: undefined,
  pageSize: 0,
};

describe('QuizHistoryList', () => {
  beforeEach(() => {
    implementServer([restHandler(() => mockedGetMecaHistoryByMemberApi(HISTORY_LIST))]);
  });
  it('Quiz History 목록 컴포넌트가 식별된다.', async () => {
    await waitFor(() =>
      renderQuery(<QuizHistoryList resourceId="0188625a-433e-f7f6-0eb4-e24ef9a5bd05" resourceType="members" />),
    );
    const historyList = await screen.findAllByTestId('id-history-list');
    expect(historyList).toHaveLength(3);
    expect(screen.getByText('문제ID')).toBeInTheDocument();
    expect(screen.getByText('점수')).toBeInTheDocument();
    historyList.forEach((_, i) => {
      expect(screen.getByText(HISTORY_LIST.contents[i].card.question)).toBeInTheDocument();
      expect(screen.getByText(HISTORY_LIST.contents[i].card.answer)).toBeInTheDocument();
    });
  });

  it('다음페이지 버튼 클릭 시 다음페이지를 호출할 수 있다.', async () => {
    await waitFor(() =>
      renderQuery(<QuizHistoryList resourceId="0188625a-433e-f7f6-0eb4-e24ef9a5bd05" resourceType="members" />),
    );
    const historyList = await screen.findAllByTestId('id-history-list');
    expect(historyList).toHaveLength(3);
    const nextButton = screen.getByRole('button', { name: /더보기/i });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByTestId('id-scroll-load-spinner')).toBeInTheDocument();
    expect(nextButton).toHaveStyleRule('visibility', 'hidden');
  });

  it('더이상 페이지가 없다면 더보기 버튼이 식별되지 않는다', async () => {
    const notHasNextHistoryList = { ...HISTORY_LIST, hasNext: false };
    resetServer([restHandler(() => mockedGetMecaHistoryByMemberApi(notHasNextHistoryList))]);
    await waitFor(() =>
      renderQuery(<QuizHistoryList resourceId="0188625a-433e-f7f6-0eb4-e24ef9a5bd05" resourceType="members" />),
    );
    const historyList = await screen.findAllByTestId('id-history-list');
    expect(historyList).toHaveLength(3);
    const nextButton = screen.queryByRole('button', { name: /더보기/i });
    expect(nextButton).not.toBeInTheDocument();
  });

  it('목록이 없다면 기록 없음 UI가 식별된다.', async () => {
    resetServer([restHandler(() => mockedGetMecaHistoryByMemberApi(EMPTY_LIST))]);
    await waitFor(() =>
      renderQuery(<QuizHistoryList resourceId="0188625a-433e-f7f6-0eb4-e24ef9a5bd05" resourceType="members" />),
    );
    expect(await screen.findByText(/아직 기록이 없습니다/i)).toBeInTheDocument();
  });
});
