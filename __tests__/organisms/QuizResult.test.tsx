import statisticsApi from '@/apis/statisticsApi';
import QuizResult from '@/components/organisms/QuizResult';
import queryKey from '@/query/queryKey';
import { QuizType } from '@/types/domain';
import { QueryClient } from '@tanstack/react-query';
import { screen, waitFor } from '@testing-library/react';
import { renderQuery } from '../utils';
import { mockedPostKeywords } from '../__mocks__/msw/api';
import { restHandler } from '../__mocks__/msw/handlers';
import { implementServer } from '../__mocks__/msw/server';

const MOCK_QUIZS: QuizType[] = [
  {
    cardId: 'cid01',
    categoryId: 'cat01',
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

jest.mock('@/components/molcules/Chart', () => ({
  WordCloud: ({ words }: { words: { text: string; value: number }[] }) => (
    <div data-testid="id-wordcloud">{words.map((word) => `${word.text}-${word.value}`)}</div>
  ),
  DoughnutChart: ({ values }: { values: number[] }) => <div data-testid="id-dchart">{values[0]}%</div>,
  GroupBarChart: () => <div data-testid="id-gchart">GroupBarChart</div>,
  RadialChart: ({ value, maxValue }: { value: number; maxValue: number }) => (
    <div data-testid="id-rchart">
      {value}-{maxValue}
    </div>
  ),
}));

describe('QuizResult', () => {
  it('퀴즈 결과 UI가 식별된다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], MOCK_QUIZS);
    const spyApplyQuizKeywordFn = jest.spyOn(statisticsApi, 'postKeywordBySentence');
    implementServer([restHandler(() => mockedPostKeywords({ hello: 25, world: 10 }))]);
    renderQuery(<QuizResult quizList={MOCK_QUIZS} maxQuizTime={20} />, undefined, queryClient);
    const loadSpinner = screen.getByTestId('id-scroll-load-spinner');
    expect(screen.getByRole('heading', { name: 'Quiz Timeline' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Keyword Cloud' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '유형별 점수 비율' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '전체 정답률' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '평균 소요 시간' })).toBeInTheDocument();
    expect(loadSpinner).toBeInTheDocument();
    await waitFor(() => {
      expect(loadSpinner).not.toBeInTheDocument();
    });
    expect(spyApplyQuizKeywordFn).toHaveBeenCalledWith(expect.any(String));
    const mockedWordCloud = screen.queryByTestId('id-wordcloud');
    const mockedDChart = screen.queryByTestId('id-dchart');
    const mockedRChart = screen.queryByTestId('id-rchart');
    expect(mockedWordCloud).toHaveTextContent(/hello-25/i);
    expect(mockedDChart).toHaveTextContent('0.5%');
    // case 2 : [5, 10]
    expect(mockedRChart).toHaveTextContent('7.5-20');
    const timelineAnswers = screen.getAllByText(/문제 정답:/i);
    const timelineMySolutions = screen.getAllByText(/나의 풀이:/i);
    expect(timelineAnswers).toHaveLength(2);
    expect(timelineMySolutions).toHaveLength(2);
    expect(timelineAnswers[0].children.item(0)).toHaveTextContent('O');
    expect(timelineMySolutions[0].children.item(0)).toHaveTextContent('X');
    expect(timelineAnswers[1].children.item(0)).toHaveTextContent('INFP');
    expect(timelineMySolutions[1].children.item(0)).toHaveTextContent('INFP');
    spyApplyQuizKeywordFn.mockClear();
  });
});
