import type { Quiz } from '@/types/domain/quiz';

import { renderQuery } from '../../utils';
import { screen, waitFor } from '@testing-library/react';
import { mockedPostKeywords } from '@/mock/api';
import { restHandler } from '@/mock/handlers';
import { implementServer } from '@/mock/server';

import queryKey from '@/query/queryKey';
import { QueryClient } from '@tanstack/react-query';
import statisticsApi from '@/apis/statisticsApi';
import QuizPlayResultDashboard from '@/components/quiz/organisms/QuizPlayResultDashboard';

const MOCK_QUIZS: Quiz[] = [
  {
    cardId: 'cid01',
    categoryId: 'cat01',
    memberId: 'mid01',
    title: 'title01',
    question: 'question01',
    answer: 'O',
    cardType: 'OX_QUIZ',
    createdAt: '',
    description: '',
    result: {
      score: 0,
      spendTime: 5,
      userAnswer: 'X',
    },
  },
  {
    cardId: 'cid02',
    categoryId: 'cat02',
    memberId: 'mid01',
    title: 'title02',
    question: '["다음 중 박동석의 MBTI로 적절한 것은?","ENFJ","INFP","ISTJ","ESTJ"]',
    answer: '2',
    cardType: 'MULTI_CHOICE',
    createdAt: '',
    description: '',
    result: {
      score: 100,
      spendTime: 10,
      userAnswer: '2',
    },
  },
];

jest.mock('@/components/@common/molecules/Chart/WordCloud', () => {
  return ({ words }: { words: { text: string; value: number }[] }) => (
    <div data-testid="id-wordcloud">{words.map((word) => `${word.text}-${word.value}`)}</div>
  );
});

jest.mock('@/components/@common/molecules/Chart/DonutChart', () => {
  return ({ values }: { values: number[] }) => <div data-testid="id-dchart">{values[0]}%</div>;
});

jest.mock('@/components/@common/molecules/Chart/GroupBarChart', () => {
  return () => <div data-testid="id-gchart">GroupBarChart</div>;
});

jest.mock('@/components/@common/molecules/Chart/RadialChart', () => {
  return ({ value, maxValue }: { value: number; maxValue: number }) => (
    <div data-testid="id-rchart">
      {value}-{maxValue}
    </div>
  );
});

describe('QuizResult', () => {
  it('퀴즈 결과 UI가 식별된다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], MOCK_QUIZS);
    const spyApplyQuizKeywordFn = jest.spyOn(statisticsApi, 'postKeywordBySentence');
    implementServer([restHandler(() => mockedPostKeywords({ hello: 25, world: 10 }))]);
    renderQuery(<QuizPlayResultDashboard maxQuizTime={20} />, undefined, queryClient);
    expect(screen.getByRole('heading', { name: 'Keyword Cloud' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '유형별 평균점수/문제 수' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '전체 정답률' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '평균 소요 시간' })).toBeInTheDocument();

    const mockedDonutChart = await screen.findByTestId('id-dchart');
    const mockedRadialChart = await screen.findByTestId('id-rchart');
    expect(mockedDonutChart).toHaveTextContent('0.5%');
    // case 2 : [5, 10]
    expect(mockedRadialChart).toHaveTextContent('7.5-20');
    await waitFor(() => expect(screen.queryByTestId('id-wordcloud')).toHaveTextContent(/hello-25/i));
    expect(spyApplyQuizKeywordFn).toHaveBeenCalledWith(expect.any(String));
    spyApplyQuizKeywordFn.mockClear();
  });
});
