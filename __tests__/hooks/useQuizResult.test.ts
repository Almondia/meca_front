import { createQueryClientWrapper } from '../utils';

import useQuizResult from '@/hooks/quiz/useQuizResult';
import { MOCK_QUIZS, MOCK_QUIZ_RESULTS } from '@/mock/data';
import { renderHook, waitFor } from '@testing-library/react';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedPostQuizResultApi } from '@/mock/api';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';
import { MECA_TAGS } from '@/utils/constants';
import cardHistoryApi from '@/apis/cardHistoryApi';

jest.mock('@/utils/toastHandler', () => {
  return jest.fn();
});

describe('useQuizResult', () => {
  const mockQuizs = MOCK_QUIZS;
  const mockQuizsWithResult = MOCK_QUIZ_RESULTS;
  beforeEach(() => {
    (alertToast as jest.Mock).mockRejectedValue(jest.fn());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[applyQuizResult] quiz 풀이 결과를 제출하면 반영된다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], mockQuizs);
    implementServer([restHandler(() => mockedPostQuizResultApi(50))]);
    const { result } = renderHook(() => useQuizResult(), { wrapper: createQueryClientWrapper(queryClient) });
    expect(result.current.quizList).toHaveLength(mockQuizs.length);
    await waitFor(() => {
      result.current.applyQuizResult({ round: 1, answer: 'answer', spendTime: 5 });
    });
    const { result: quizResult } = result.current.quizList[0];
    expect(quizResult).not.toBeUndefined();
    expect(quizResult).toHaveProperty('score', 50);
    expect(quizResult).toHaveProperty('spendTime', 5);
    expect(quizResult).toHaveProperty('userAnswer', 'answer');
  });

  it('[applyQuizResult] quiz 풀이 목록에 없는 요청일 경우 결과가 반영되지 않는다.', async () => {
    const queryClient = new QueryClient();
    const spyApplyQuizHistory = jest.spyOn(cardHistoryApi, 'applyQuizHistory');
    queryClient.setQueryData([queryKey.quiz], mockQuizs);
    const { result } = renderHook(() => useQuizResult(), { wrapper: createQueryClientWrapper(queryClient) });
    expect(result.current.quizList).toHaveLength(mockQuizs.length);
    await waitFor(() => {
      result.current.applyQuizResult({ round: 25, answer: 'answer', spendTime: 5 });
    });
    expect(spyApplyQuizHistory).not.toHaveBeenCalled();
    expect(result.current.quizList).toEqual(mockQuizs);
  });

  it('[applyQuizResult] quiz 풀이 결과 요청에 대해 응답에 실패할 경우 0점 처리된다.', async () => {
    (alertToast as jest.Mock).mockImplementation(jest.fn());
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], mockQuizs);
    implementServer([restHandler(() => mockedPostQuizResultApi(50), { status: 400 })]);
    const { result } = renderHook(() => useQuizResult(), { wrapper: createQueryClientWrapper(queryClient) });
    expect(result.current.quizList).toHaveLength(mockQuizs.length);
    await waitFor(() => {
      result.current.applyQuizResult({ round: 1, answer: 'answer', spendTime: 5 });
    });
    expect(result.current.quizList[0].result).toHaveProperty('score', 0);
    expect(alertToast).toHaveBeenCalledTimes(1);
  });

  it('[refreshQuizResult] 스코어 필터링으로 quiz 결과를 초기화 할 수 있다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], mockQuizsWithResult);
    const score = 50;
    const mockRetryCallback = jest.fn();
    const mockQuizsLengthWithfilteredByScore = mockQuizsWithResult.filter((q) => (q.result?.score ?? 0) <= 50).length;
    const { result } = renderHook(() => useQuizResult(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => {
      result.current.refreshQuizResult(score, mockRetryCallback);
    });
    expect(mockRetryCallback).toHaveBeenCalledTimes(1);
    expect(result.current.quizList).toHaveLength(mockQuizsLengthWithfilteredByScore);
  });

  it('[refreshQuizResult] 스코어 필터링 후 조건에 맞는 퀴즈가 없다면 quiz 결과가 초기화되지 않는다.', async () => {
    (alertToast as jest.Mock).mockImplementation(jest.fn());
    const queryClient = new QueryClient();
    queryClient.setQueryData(
      [queryKey.quiz],
      mockQuizsWithResult.map((q) => ({ ...q, result: { ...q.result, score: 100 } })),
    );
    const score = 50;
    const mockRetryCallback = jest.fn();
    const { result } = renderHook(() => useQuizResult(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => {
      result.current.refreshQuizResult(score, mockRetryCallback);
    });
    expect(alertToast).toHaveBeenCalledTimes(1);
    expect(mockRetryCallback).toHaveBeenCalledTimes(0);
    expect(result.current.quizList).toHaveLength(mockQuizsWithResult.length);
  });

  it('[getAnswerRateResult] 퀴즈 결과에 대한 평균 점수와 평균 소요시간을 얻을 수 있다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], mockQuizsWithResult);
    const { result } = renderHook(() => useQuizResult(), { wrapper: createQueryClientWrapper(queryClient) });
    const answerRateResult = result.current.getAnswerRateResult();
    expect(answerRateResult.avgScore).not.toEqual(0);
    expect(answerRateResult.avgTime).not.toEqual(0);
  });

  it('[getQuizTypeRateResult] 퀴즈 유형별 결과 정보를 얻을 수 있다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], mockQuizsWithResult);
    const { result } = renderHook(() => useQuizResult(), { wrapper: createQueryClientWrapper(queryClient) });
    const quizTypeResult = result.current.getQuizTypeRateResult();
    const tagLength = Object.keys(MECA_TAGS).length;
    expect(quizTypeResult.names).toHaveLength(tagLength);
    expect(quizTypeResult.answerRate).toHaveLength(tagLength);
    expect(quizTypeResult.count).toHaveLength(tagLength);
  });
});
