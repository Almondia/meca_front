import { render } from '../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import { InfiniteData } from '@tanstack/react-query';

import { CardHistoryListResponse } from '@/apis/cardHistoryApi';
import QuizHistoryList from '@/components/organisms/QuizHistoryList';

const HISTORY_LIST: InfiniteData<CardHistoryListResponse> = {
  pageParams: [null, '0188625a-433e-f7f6-0eb4-e24ef9a5bd04'],
  pages: [
    {
      contents: [
        {
          cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd00',
          solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd01',
          solvedMemberName: '이름이엄청길수도있어요',
          userAnswer: 'answer',
          score: 62,
          categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
          cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
          createdAt: '2023-05-28T21:34:22.6543507',
          title: 'title',
          question: '박동석의 MBTI는 무엇일까요?',
          answer: 'answer',
          cardType: 'KEYWORD',
          memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        },
        {
          cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd01',
          solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
          solvedMemberName: 'name',
          userAnswer: '1',
          score: 0,
          categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
          cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
          createdAt: '2023-05-24T21:34:22.6543507',
          title: 'title',
          question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
          answer: '1',
          cardType: 'MULTI_CHOICE',
          memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        },
      ],
      hasNext: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
      pageSize: 2,
    },
    {
      contents: [
        {
          cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
          solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
          solvedMemberName: 'name',
          userAnswer: 'answer',
          score: 35,
          categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd07',
          cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd08',
          createdAt: '2023-05-22T21:34:22.6543507',
          title: 'title',
          question: 'question',
          answer: '정답이아주길면어떡하지어떡해어떡해해야할까요',
          cardType: 'KEYWORD',
          memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        },
      ],
      hasNext: undefined,
      pageSize: 2,
    },
  ],
};

const EMPTY_LIST: InfiniteData<CardHistoryListResponse> = {
  pageParams: [null],
  pages: [
    {
      contents: [],
      hasNext: undefined,
      pageSize: 2,
    },
  ],
};

describe('QuizHistoryList', () => {
  it('목록 컴포넌트가 식별된다.', async () => {
    const mockedFetchNext = jest.fn();
    await waitFor(() => render(<QuizHistoryList historyList={HISTORY_LIST} fetchNextPage={mockedFetchNext} />));
    const table = screen.getByRole('table');
    const historyList = screen.getAllByTestId('id-history-list');
    expect(table).toBeInTheDocument();
    expect(historyList).toHaveLength(2);
    expect(screen.getByText('문제ID')).toBeInTheDocument();
    expect(screen.getByText('문제유형')).toBeInTheDocument();
    expect(screen.getByText('문제정보')).toBeInTheDocument();
    expect(screen.getByText('점수')).toBeInTheDocument();
    expect(screen.getByText('박동석의 MBTI는 무엇일까요?')).toBeInTheDocument();
    expect(screen.getByText('다음 중 박동석의 MBTI로 적절한 것은?')).toBeInTheDocument();
  });

  it('다음페이지가 있다면 로드 시 다음페이지를 호출한다.', async () => {
    const mockedFetchNext = jest.fn();
    await waitFor(() => render(<QuizHistoryList historyList={HISTORY_LIST} fetchNextPage={mockedFetchNext} />));
    expect(mockedFetchNext).toHaveBeenCalledTimes(1);
  });

  it('다음페이지 버튼 클릭 시 다음페이지가 식별된다.', async () => {
    const mockedFetchNext = jest.fn();
    await waitFor(() => render(<QuizHistoryList historyList={HISTORY_LIST} fetchNextPage={mockedFetchNext} />));
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    await waitFor(() => expect(screen.getAllByTestId('id-history-list')).toHaveLength(1));
    expect(screen.getByText('정답이아주길면어떡하지어떡해어떡해해야할까요')).toBeInTheDocument();
  });

  it('더이상 페이지가 없다면 다음페이지를 호출하지 않는다.', async () => {
    const mockedFetchNext = jest.fn();
    await waitFor(() => render(<QuizHistoryList historyList={undefined} fetchNextPage={mockedFetchNext} />));
    expect(mockedFetchNext).not.toHaveBeenCalled();
  });

  it('이전페이지 버튼 클릭 시 이전페이지가 다시 식별된다.', async () => {
    const mockedFetchNext = jest.fn();
    await waitFor(() => render(<QuizHistoryList historyList={HISTORY_LIST} fetchNextPage={mockedFetchNext} />));
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    await waitFor(() => expect(screen.getAllByTestId('id-history-list')).toHaveLength(1));
    expect(screen.getByText('정답이아주길면어떡하지어떡해어떡해해야할까요')).toBeInTheDocument();
    const prevButton = screen.getByRole('button', { name: /Prev/i });
    fireEvent.click(prevButton);
    await waitFor(() => expect(screen.getAllByTestId('id-history-list')).toHaveLength(2));
    expect(screen.getByText('박동석의 MBTI는 무엇일까요?')).toBeInTheDocument();
    expect(mockedFetchNext).toHaveBeenCalledTimes(2);
  });

  it('목록이 없다면 기록 없음 UI가 식별된다.', async () => {
    const mockedFetchNext = jest.fn();
    await waitFor(() => render(<QuizHistoryList historyList={EMPTY_LIST} fetchNextPage={mockedFetchNext} />));
    expect(mockedFetchNext).not.toHaveBeenCalled();
    expect(screen.getByText(/아직 기록이 없습니다/i)).toBeInTheDocument();
  });
});
