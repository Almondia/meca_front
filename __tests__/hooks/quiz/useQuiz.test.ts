import { createQueryClientWrapper } from '../../utils';

import { implementServer, resetServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedGetSimulationMecasApi } from '@/mock/api';
import { MOCK_CATEGORY_ID } from '@/mock/data';

import { act, renderHook, waitFor } from '@testing-library/react';
import { useSetRecoilState } from 'recoil';

import useQuiz from '@/hooks/quiz/useQuiz';

jest.mock('recoil', () => ({
  useSetRecoilState: jest.fn(),
}));

jest.mock('@/atoms/quiz', () => ({
  quizPhaseState: jest.fn(),
  quizTimeState: jest.fn(),
  quizTitleState: jest.fn(),
}));

describe('useQuiz', () => {
  const categoryId = MOCK_CATEGORY_ID;

  beforeEach(() => {
    implementServer([restHandler(mockedGetSimulationMecasApi)]);
    (useSetRecoilState as jest.Mock).mockReturnValue(jest.fn());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('풀이할 퀴즈 정보를 요청하면 해당 quiz 목록을 얻는다.', async () => {
    const successHandler = jest.fn();
    const { result } = renderHook(() => useQuiz(successHandler), { wrapper: createQueryClientWrapper() });
    expect(result.current.quizList).toHaveLength(0);
    act(() => {
      result.current.initQuiz({ categoryId, quizTime: 30, score: 100, title: 'title', limit: 5 });
    });
    await waitFor(() => {
      expect(result.current.quizList).not.toHaveLength(0);
    });
    expect(successHandler).toHaveBeenCalledTimes(1);
  });

  it('풀이할 퀴즈 정보를 요청에 대해 응답 실패 시 fallback quiz 목록이 유지되고 errorHandler가 호출된다.', async () => {
    resetServer([restHandler(mockedGetSimulationMecasApi, { status: 400 })]);
    const errorHandler = jest.fn();
    const { result } = renderHook(() => useQuiz(undefined, errorHandler), { wrapper: createQueryClientWrapper() });
    act(() => {
      result.current.initQuiz({ categoryId, quizTime: 30, score: 100, title: 'title', limit: 5 });
    });
    await waitFor(() => {
      expect(result.current.quizList).toHaveLength(0);
      expect(result.current.isError).toBeTruthy();
    });
    expect(errorHandler).toHaveBeenCalledTimes(1);
  });

  it('풀이할 퀴즈 정보를 요청에 대해 응답 실패 후 재요청 하여 성공 시 해당 quiz 목록을 얻는다.', async () => {
    resetServer([restHandler(mockedGetSimulationMecasApi, { status: 400 })]);
    const errorHandler = jest.fn();
    const successHandler = jest.fn();
    const { result } = renderHook(() => useQuiz(successHandler, errorHandler), { wrapper: createQueryClientWrapper() });
    const initQuiz = () => {
      act(() => {
        result.current.initQuiz({ categoryId, quizTime: 30, score: 100, title: 'title', limit: 5 });
      });
    };
    initQuiz();
    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
    expect(errorHandler).toHaveBeenCalledTimes(1);
    resetServer([restHandler(mockedGetSimulationMecasApi)]);
    initQuiz();
    await waitFor(() => {
      expect(result.current.quizList).not.toHaveLength(0);
      expect(result.current.isError).toBeFalsy();
    });
    expect(successHandler).toHaveBeenCalledTimes(1);
  });
});
