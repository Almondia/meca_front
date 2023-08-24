import { render } from '../../utils';
import { screen } from '@testing-library/react';
import { MOCK_QUIZ_RESULTS } from '@/mock/data';

import type { Quiz } from '@/types/domain/quiz';
import QuizPlayResultTimeline from '@/components/quiz/organisms/QuizPlayResultTimeline';

describe('QuizPlayResultTimeline', () => {
  it('5개 이상의 Quiz 결과가 있다면 최대 5개까지 식별된다.', () => {
    const mockedQuizList = MOCK_QUIZ_RESULTS;
    render(<QuizPlayResultTimeline quizList={mockedQuizList} />);
    const quizTimelineItems = screen.getAllByRole('article');
    expect(quizTimelineItems).toHaveLength(Math.min(mockedQuizList.length, 5));
    expect(mockedQuizList.length).toBeGreaterThan(5);
  });

  it('결과가 없을 경우 EmptyList UI가 식별된다.', () => {
    const mockedQuizList: Quiz[] = [];
    render(<QuizPlayResultTimeline quizList={mockedQuizList} />);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
    expect(screen.getByText(/문제 풀이 결과에 대한 목록이 존재하지 않습니다/));
  });
});
