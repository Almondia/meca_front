import { createQueryClientWrapper } from '../../utils';
import { renderHook, waitFor } from '@testing-library/react';

import { mockedGetQuizCardsSimulationStateByCategoryIdApi } from '@/mock/api';
import { MOCK_QUIZ_SIMULATION_INFO_LIST } from '@/mock/data';
import { restHandler, restOverridedResponseHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';

import useQuizInfoBeforePlay from '@/hooks/quiz/useQuizInfoBeforePlay';

const mockedQuizInfoList = MOCK_QUIZ_SIMULATION_INFO_LIST;

describe('useQuizInfoBeforePlay', () => {
  beforeEach(() => {
    implementServer([restHandler(mockedGetQuizCardsSimulationStateByCategoryIdApi)]);
  });
  it('퀴즈 시작을 위한 정보를 얻을 수 있다.', async () => {
    const { result } = renderHook(() => useQuizInfoBeforePlay('categoryId'), { wrapper: createQueryClientWrapper() });
    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => expect(result.current.simulationBaseScoreList).toHaveLength(mockedQuizInfoList.length));
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isEmpty).toBeFalsy();
  });

  it('퀴즈 시작을 위한 정보를 얻지 못할 경우 isEmpty 상태가 된다.', async () => {
    resetServer([restHandler(mockedGetQuizCardsSimulationStateByCategoryIdApi, { status: 400 })]);
    const { result } = renderHook(() => useQuizInfoBeforePlay('categoryId'), { wrapper: createQueryClientWrapper() });
    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.simulationBaseScoreList).toHaveLength(0);
    expect(result.current.isEmpty).toBeTruthy();
  });

  it('요청한 점수로 퀴즈 정보 목록 갯수 필터링 시 요청한 점수 이하만큼의 갯수가 리턴된다.', async () => {
    const { result } = renderHook(() => useQuizInfoBeforePlay('categoryId'), { wrapper: createQueryClientWrapper() });
    await waitFor(() => expect(result.current.simulationBaseScoreList).toHaveLength(mockedQuizInfoList.length));
    expect(result.current.getQuizCountByFilteredScore(50)).toEqual(9);
    expect(result.current.getQuizCountByFilteredScore(0)).toEqual(4);
    expect(result.current.getQuizCountByFilteredScore(-1)).toEqual(0);
  });

  it('요청한 점수로 퀴즈 정보 목록 갯수 필터링 시 30문제보다 많다면 30개가 리턴된다.', async () => {
    implementServer([
      restOverridedResponseHandler(mockedGetQuizCardsSimulationStateByCategoryIdApi, [
        {
          score: 12.5,
          count: 99,
        },
      ]),
    ]);
    const { result } = renderHook(() => useQuizInfoBeforePlay('categoryId'), { wrapper: createQueryClientWrapper() });
    await waitFor(() => expect(result.current.simulationBaseScoreList).toHaveLength(1));
    expect(result.current.getQuizCountByFilteredScore(50)).toEqual(30);
  });
});
