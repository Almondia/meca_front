import QuizPage from '@/pages/quiz';
import { RecoilObserver, renderQuery } from '../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MECAS } from '../__mocks__/msw/data';
import { MecaTagResponseType } from '@/types/domain';
import { quizTimeState } from '@/atoms/quiz';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import statisticsApi from '@/apis/statisticsApi';

const mockQuizs = MECAS.slice(0, 2);

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    ...jest.requireActual('@tanstack/react-query').useQueryClient(),
    getQueryData: jest.fn().mockReturnValueOnce(mockQuizs),
    setQueryData: jest.fn(),
  }),
}));

describe('QuizPage', () => {
  beforeEach(() => {
    server.use(
      rest.post('/api/score', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ score: 50 }));
      }),
    );
  });
  it('첫 퀴즈페이지 접근 시 주어진 문제 수와 question, input, 정답 제출 버튼이 식별된다.', async () => {
    renderQuery(
      <>
        <RecoilObserver node={quizTimeState} defaultValue={30} />
        <QuizPage />
      </>,
    );
    const maxCountText = screen.getByTestId('id-count-indicator-maxcount');
    expect(maxCountText).toHaveTextContent(mockQuizs.length.toString());
    const cardType = mockQuizs[0].cardType as MecaTagResponseType;
    await waitFor(() => {
      if (cardType === 'KEYWORD') {
        expect(screen.queryByText('키워드를 입력하세요')).toBeInTheDocument();
      }
      expect(screen.queryByText(mockQuizs[0].question)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '정답제출' })).toBeInTheDocument();
    });
  });

  it('정답 제출 후 정답과 다음 문제 버튼이 식별된다.', async () => {
    renderQuery(<QuizPage />);
    const submitButton = screen.getByRole('button', {
      name: '정답제출',
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    const answerTitleText = await screen.findByText('A.');
    const answerText = await screen.findByText(mockQuizs[0].answer);
    expect(answerTitleText).toBeInTheDocument();
    expect(answerText).toBeInTheDocument();
    const nextButton = screen.getByRole('button', {
      name: '다음문제',
    });
    expect(nextButton).toBeInTheDocument();
  });

  it('마지막 문제를 확인하면 결과보기 버튼이 식별된다.', async () => {
    renderQuery(<QuizPage />);
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
    const spyPostScoreFn = jest.spyOn(statisticsApi, 'postScoreByAnswerInput');
    renderQuery(<QuizPage />);
    const answerInput = screen.getByPlaceholderText('정답 입력하기');
    expect(answerInput).toHaveValue('');
    fireEvent.change(answerInput, { target: { value: 'hello' } });
    expect(answerInput).toHaveValue('hello');
    const submitButton = screen.getByRole('button', { name: '정답제출' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(spyPostScoreFn).toHaveBeenCalledWith('hello', expect.any(String)));
    spyPostScoreFn.mockClear();
  });

  it('정답을 입력하지 않고 제출하면 score 계산 함수가 호출되지 않는다.', async () => {
    const spyPostScoreFn = jest.spyOn(statisticsApi, 'postScoreByAnswerInput');
    renderQuery(<QuizPage />);
    const answerInput = screen.getByPlaceholderText('정답 입력하기');
    expect(answerInput).toHaveValue('');
    const submitButton = screen.getByRole('button', { name: '정답제출' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(spyPostScoreFn).not.toHaveBeenCalled());
    spyPostScoreFn.mockClear();
  });

  it('정답 제출 시 score 계산을 하지 못하면 toast가 식별된다.', async () => {
    server.use(
      rest.post('/api/score', (_, res, ctx) => {
        return res(ctx.status(400));
      }),
    );
    renderQuery(<QuizPage />);
    const answerInput = screen.getByPlaceholderText('정답 입력하기');
    expect(answerInput).toHaveValue('');
    fireEvent.change(answerInput, { target: { value: 'hello' } });
    expect(answerInput).toHaveValue('hello');
    const submitButton = screen.getByRole('button', { name: '정답제출' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.queryByText('점수를 계산하지 못했습니다.')).toBeInTheDocument());
  });
});
