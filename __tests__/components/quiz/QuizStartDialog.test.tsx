import { renderQuery } from '../../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { restHandler } from '@/mock/handlers';
import { implementServer } from '@/mock/server';
import { mockedGetSimulationMecasApi } from '@/mock/api';
import mockRouter from 'next-router-mock';

import QuizStartDialog from '@/components/quiz/organisms/QuizStartDialog';

describe('QuizStartDialog', () => {
  const props = {
    categoryId: 'cid01',
    title: 'title',
    quizNum: 5,
    visible: true,
    onClose: jest.fn(),
  };

  it('count 슬라이더를 움직이면 수치가 함께 변경된다.', async () => {
    renderQuery(<QuizStartDialog {...props} />);
    const title = screen.getByText(props.title);
    const quizCountInput = screen.getByRole('spinbutton', { name: 'input-quizcount-text' });
    const quizCountRange = screen.getByRole('slider');
    expect(title).toBeInTheDocument();
    expect(quizCountInput).toHaveValue(5);
    expect(quizCountRange).toHaveValue('5');
    fireEvent.change(quizCountRange, { target: { value: '4' } });
    expect(quizCountRange).toHaveValue('4');
    expect(quizCountInput).toHaveValue(4);
  });

  it('count 슬라이더를 움직이면 수치가 함께 변경된다.', async () => {
    renderQuery(<QuizStartDialog {...props} />);
    const title = screen.getByText(props.title);
    const quizCountInput = screen.getByRole('spinbutton', { name: 'input-quizcount-text' });
    const quizCountRange = screen.getByRole('slider');
    expect(title).toBeInTheDocument();
    expect(quizCountInput).toHaveValue(5);
    expect(quizCountRange).toHaveValue('5');
    fireEvent.change(quizCountRange, { target: { value: '4' } });
    expect(quizCountRange).toHaveValue('4');
    expect(quizCountInput).toHaveValue(4);
  });

  it('퀴즈 플레이를 요청하면 해당 페이지로 이동한다.', async () => {
    implementServer([restHandler(mockedGetSimulationMecasApi)]);
    renderQuery(<QuizStartDialog {...props} />);
    const startButton = screen.getByRole('button', { name: '시작하기' });
    expect(startButton).toBeInTheDocument();
    fireEvent.click(startButton);
    await waitFor(() => expect(mockRouter.pathname).toEqual('/quiz'));
  });
});