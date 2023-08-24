import { renderQuery } from '../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MOCK_QUIZS } from '@/mock/data';
import { implementServer, resetServer } from '@/mock/server';
import useQuiz from '@/hooks/quiz/useQuiz';
import { restHandler } from '@/mock/handlers';
import { mockedPostQuizResultApi } from '@/mock/api';
import cardHistoryApi from '@/apis/cardHistoryApi';

import QuizPage from '@/pages/quiz';
import mockRouter from 'next-router-mock';

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
    const submitButton = screen.getByRole('button', {
      name: '정답제출',
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
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
    const answerInput = screen.getByPlaceholderText('정답 입력');
    expect(answerInput).toHaveValue('');
    fireEvent.change(answerInput, { target: { value: 'hello' } });
    expect(answerInput).toHaveValue('hello');
    const submitButton = screen.getByRole('button', { name: '정답제출' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(spyPostScoreFn).toHaveBeenCalled());
    spyPostScoreFn.mockClear();
  });

  it('정답 제출 시 score 계산을 하지 못하면 toast가 식별된다.', async () => {
    resetServer([restHandler(mockedPostQuizResultApi, { status: 400 })]);
    renderQuery(<QuizPage />);
    const answerInput = screen.getByPlaceholderText('정답 입력');
    expect(answerInput).toHaveValue('');
    fireEvent.change(answerInput, { target: { value: 'hello' } });
    expect(answerInput).toHaveValue('hello');
    const submitButton = screen.getByRole('button', { name: '정답제출' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.queryByText('점수를 계산하지 못했습니다.')).toBeInTheDocument());
  });
});
