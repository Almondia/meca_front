import { renderQuery } from '../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MOCK_MECAS } from '@/mock/data';
import { MecaTagResponseType } from '@/types/domain';
import { implementServer, resetServer } from '@/mock/server';
import useQuiz from '@/hooks/quiz/useQuiz';
import { restHandler } from '@/mock/handlers';
import { mockedPostQuizResultApi } from '@/mock/api';
import cardHistoryApi from '@/apis/cardHistoryApi';

import QuizPage from '@/pages/quiz';

const mockQuizs = MOCK_MECAS.slice(0, 2);

jest.mock('@/hooks/quiz/useQuiz', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/components/quiz/organisms/QuizResult', () => {
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
  it('첫 퀴즈페이지 접근 시 주어진 문제 수와 question, input, 정답 제출 버튼이 식별된다.', async () => {
    renderQuery(<QuizPage />);
    const maxCountText = screen.getByTestId('id-count-indicator-maxcount');
    expect(maxCountText).toHaveTextContent(mockQuizs.length.toString());
    const cardType = mockQuizs[0].cardType as MecaTagResponseType;
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

  it('마지막 문제를 확인하면 결과보기 버튼이 식별된다.', async () => {
    await waitFor(() => renderQuery(<QuizPage />));
    const submitButton = screen.getByRole('button', {
      name: '정답제출',
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    const nextButton = await screen.findByRole('button', {
      name: '다음문제',
    });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    const quizQuestionText = await screen.findByText(mockQuizs[1].question);
    expect(quizQuestionText).toBeInTheDocument();
    const submitButton2 = screen.getByRole('button', {
      name: '정답제출',
    });
    expect(submitButton2).toBeInTheDocument();
    fireEvent.click(submitButton2);
    const showResultButton = await screen.findByRole('button', {
      name: '결과보기',
    });
    expect(showResultButton).toBeInTheDocument();
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
