import { renderQuery } from '../../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MOCK_QUIZS } from '@/mock/data';
import { implementServer, resetServer } from '@/mock/server';
import useQuiz from '@/hooks/quiz/useQuiz';
import { restHandler } from '@/mock/handlers';
import { mockedPostQuizResultApi } from '@/mock/api';
import cardHistoryApi from '@/apis/cardHistoryApi';

import QuizPage from '@/pages/quiz';
import mockRouter from 'next-router-mock';
import { Quiz } from '@/types/domain/quiz';

const mockQuizs = MOCK_QUIZS;

jest.mock('@/hooks/quiz/useQuiz', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/components/quiz/organisms/QuizPlayResultDashboard', () => {
  return () => <div></div>;
});

describe('QuizPage', () => {
  beforeEach(() => {
    (useQuiz as jest.Mock).mockReturnValue({ quizList: [...mockQuizs] });
    implementServer([restHandler(() => mockedPostQuizResultApi(50))]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('퀴즈 정보가 없는경우 만료 UI가 식별된다.', () => {
    (useQuiz as jest.Mock).mockReturnValue({ quizList: [] });
    renderQuery(<QuizPage />);
    expect(screen.getByRole('heading', { name: '퀴즈 정보가 만료되었어요' }));
    expect(screen.getByRole('button', { name: '뒤로가기' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '홈으로' }));
    expect(mockRouter.pathname).toEqual('/');
  });

  it('첫 퀴즈페이지 접근 시 주어진 문제 수와 question, input, 정답 제출 버튼이 식별된다.', async () => {
    renderQuery(<QuizPage />);
    const maxCountText = screen.getByTestId('id-count-indicator-maxcount');
    expect(maxCountText).toHaveTextContent(mockQuizs.length.toString());
    const cardType = mockQuizs[0].cardType;
    await waitFor(() => {
      if (cardType === 'KEYWORD') {
        expect(screen.getByPlaceholderText('정답 입력')).toBeInTheDocument();
      }
      expect(screen.getByRole('button', { name: '정답제출' })).toBeInTheDocument();
    });
    const pageHeading = screen.getByRole('heading', { name: mockQuizs[0].title });
    expect(pageHeading).toBeInTheDocument();
    expect(screen.getByText(mockQuizs[0].question)).toBeInTheDocument();
  });

  it('정답 제출 후 정답과 다음 문제 버튼이 식별된다.', async () => {
    renderQuery(<QuizPage />);
    await waitFor(() => {
      const submitButton = screen.getByRole('button', {
        name: '정답제출',
      });
      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);
    });
    const answerTitleText = await screen.findByText('Answer.');
    const answerText = await screen.findByText(mockQuizs[0].answer);
    expect(answerTitleText).toBeInTheDocument();
    expect(answerText).toBeInTheDocument();
    const nextButton = screen.getByRole('button', {
      name: '다음문제',
    });
    expect(nextButton).toBeInTheDocument();
  });

  it('정답을 입력하고 제출하면 score 계산 함수가 호출된다.', async () => {
    const spyPostScoreFn = jest.spyOn(cardHistoryApi, 'applyQuizHistory');
    renderQuery(<QuizPage />);
    await waitFor(() => {
      const answerInput = screen.getByPlaceholderText('정답 입력');
      expect(answerInput).toHaveValue('');
      fireEvent.change(answerInput, { target: { value: 'hello' } });
      expect(answerInput).toHaveValue('hello');
      const submitButton = screen.getByRole('button', { name: '정답제출' });
      fireEvent.click(submitButton);
    });
    expect(spyPostScoreFn).toHaveBeenCalled();
    spyPostScoreFn.mockClear();
  });

  it('score 계산에 실패 하면 toast가 식별된다.', async () => {
    resetServer([restHandler(mockedPostQuizResultApi, { status: 400 })]);
    renderQuery(<QuizPage />);
    jest.clearAllTimers();
    expect(await screen.findByText('점수를 계산하지 못했습니다.')).toBeInTheDocument();
  });

  it('모든 문제를 풀면 퀴즈 결과 UI가 식별된다.', async () => {
    const quizs: Quiz[] = [
      {
        cardId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1180',
        title: '박동석 알아보기',
        memberId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1181',
        question: '["박동석의 MBTI는 무엇인가", "INFP", "ENFJ", "ISTJ"]',
        categoryId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1182',
        cardType: 'MULTI_CHOICE',
        createdAt: '2023-08-09T18:54:04.3399113',
        answer: '1',
        description: 'description',
      },
    ];
    (useQuiz as jest.Mock).mockReturnValue({ quizList: quizs });
    renderQuery(<QuizPage />);
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: '정답제출' });
      const selections = screen.getAllByRole('radio');
      expect(selections).toHaveLength(3);
      fireEvent.click(selections[1]);
      expect(selections[1]).toBeChecked();
      fireEvent.click(submitButton);
      const showResultButton = screen.getByRole('button', { name: '결과보기' });
      fireEvent.click(showResultButton);
      expect(screen.getByRole('button', { name: '목록으로' })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: '다시풀기' })).toBeInTheDocument();
  });
});
