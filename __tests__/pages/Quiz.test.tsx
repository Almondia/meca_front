import QuizPage from '@/pages/quiz';
import { RecoilObserver, renderQuery } from '../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MECAS } from '../__mocks__/msw/data';
import { MecaTagResponseType } from '@/types/domain';
import { quizTimeState } from '@/atoms/quiz';

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

  describe('QuizPage-NextPhase', () => {
    const fireNextQuizShouldShowNextQuizQuestion = async () => {
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
      return { submitButton2 };
    };

    it('마지막 문제를 확인하면 결과보기 버튼이 식별된다.', async () => {
      const { submitButton2 } = await fireNextQuizShouldShowNextQuizQuestion();
      fireEvent.click(submitButton2);
      const showResultButton = await screen.findByRole('button', {
        name: '결과보기',
      });
      expect(showResultButton).toBeInTheDocument();
    });
  });
});
