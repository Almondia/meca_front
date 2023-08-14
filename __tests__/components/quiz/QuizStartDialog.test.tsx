import { renderQuery } from '../../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { restHandler } from '@/mock/handlers';
import { implementServer } from '@/mock/server';
import { mockedGetQuizCardsSimulationStateByCategoryIdApi, mockedGetSimulationMecasApi } from '@/mock/api';
import mockRouter from 'next-router-mock';

import QuizStartDialog from '@/components/quiz/organisms/QuizStartDialog';

describe('QuizStartDialog', () => {
  const props = {
    categoryId: 'cid01',
    title: 'title',
    visible: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    implementServer([restHandler(mockedGetQuizCardsSimulationStateByCategoryIdApi)]);
  });

  it('Quiz Simulation Info 목록이 존재한다면 내부 input 컨텐츠들이 식별된다.', async () => {
    renderQuery(<QuizStartDialog {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    const quizRangeInputs = await screen.findAllByRole('slider');
    expect(quizRangeInputs).toHaveLength(2);
    expect(screen.getByText('문제 수 (최대 30문제)')).toBeInTheDocument();
    expect(screen.getByText('점수 필터링')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '15초' })).toHaveStyleRule('background-color', 'var(--color-brand)');
  });

  it('count 슬라이더의 초기값이 식별되며 이를 변경하고 점수 필터링을 변경하면 반영된다.', async () => {
    renderQuery(<QuizStartDialog {...props} />);
    const quizCountRange = await screen.findByLabelText('quiz-count');
    const scoreFilterRange = screen.getByLabelText('score-filter-input');
    expect(quizCountRange).toHaveValue('13');
    expect(scoreFilterRange).toHaveValue('100');
    fireEvent.change(scoreFilterRange, { target: { value: '0' } });
    expect(screen.getByText(/0점 이하의 문제를 풀이합니다/)).toBeInTheDocument();
    expect(screen.getByLabelText('quiz-count')).toHaveValue('4');
  });

  it('퀴즈 플레이를 요청하면 해당 페이지로 이동한다.', async () => {
    implementServer([restHandler(mockedGetSimulationMecasApi)]);
    renderQuery(<QuizStartDialog {...props} />);
    await screen.findByLabelText('quiz-count');
    const startButton = screen.getByRole('button', { name: '시작하기' });
    expect(startButton).toBeInTheDocument();
    fireEvent.click(startButton);
    await waitFor(() => expect(mockRouter.pathname).toEqual('/quiz'));
  });

  it('퀴즈 플레이 응답에 실패하면 error toast가 식별된다.', async () => {
    implementServer([restHandler(mockedGetSimulationMecasApi, { status: 400 })]);
    renderQuery(<QuizStartDialog {...props} />);
    await screen.findByLabelText('quiz-count');
    const startButton = screen.getByRole('button', { name: '시작하기' });
    expect(startButton).toBeInTheDocument();
    fireEvent.click(startButton);
    await waitFor(() => expect(screen.getByText('퀴즈를 진행할 수 없습니다. 잠시 후 시도해주세요')));
  });
});
