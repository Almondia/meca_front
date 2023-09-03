import useQuizPhase from '@/hooks/quiz/useQuizPhase';
import { QuizPhase } from '@/types/domain/quiz';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

jest.mock('recoil', () => ({
  useRecoilValue: jest.fn(),
  useRecoilState: jest.fn((a) => a),
}));

jest.mock('@/atoms/quiz', () => ({
  quizPhaseState: jest.fn(),
  quizTimeState: jest.fn(),
}));

describe('useQuizPhase', () => {
  const mockSetQuizPhase = jest.fn();
  const initUseRecoilStateWithQuizPhase = (initialValue: QuizPhase) => {
    (useRecoilState as jest.Mock).mockReturnValue([initialValue, mockSetQuizPhase]);
  };
  beforeEach(() => {
    (useRecoilValue as jest.Mock).mockReturnValue(5);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('문제를 제출하면 quizPhase의 상태가 [done]으로 변경된다.', async () => {
    const mockApplyQuizResult = jest.fn();
    initUseRecoilStateWithQuizPhase('progress');
    const { result } = renderHook(() => useQuizPhase(2, mockApplyQuizResult));
    expect(result.current.quizPhase).toEqual('progress');
    result.current.solveQuiz('answer');
    expect(mockApplyQuizResult).toHaveBeenCalledTimes(1);
    expect(mockSetQuizPhase).toHaveBeenCalledWith('done');
  });

  it('마지막 문제를 제출하면 quizPhase의 상태가 [end]로 변경된다.', async () => {
    const mockApplyQuizResult = jest.fn();
    initUseRecoilStateWithQuizPhase('progress');
    const { result } = renderHook(() => useQuizPhase(1, mockApplyQuizResult));
    expect(result.current.quizPhase).toEqual('progress');
    result.current.solveQuiz('answer');
    expect(mockApplyQuizResult).toHaveBeenCalledTimes(1);
    expect(mockSetQuizPhase).toHaveBeenCalledWith('end');
  });

  it('다시 풀기 시 quizPhase와 round가 초기화된다.', async () => {
    const mockApplyQuizResult = jest.fn();
    initUseRecoilStateWithQuizPhase('progress');
    const { result } = renderHook(() => useQuizPhase(3, mockApplyQuizResult));
    result.current.solveQuiz('answer');
    result.current.progressNextQuiz();
    expect(mockSetQuizPhase).toHaveBeenCalledWith('progress');
    expect(mockSetQuizPhase).toHaveBeenCalledWith('done');
    result.current.solveQuiz('answer');
    await waitFor(() => {
      expect(result.current.round).toEqual(2);
    });
    result.current.retryQuiz();
    await waitFor(() => {
      expect(result.current.round).toEqual(1);
    });
    expect(mockSetQuizPhase).toHaveBeenCalledWith('progress');
  });

  it('퀴즈 풀이 진행 중 진행 시간이 만료되면 자동으로 정답을 제출한다.', async () => {
    const mockApplyQuizResult = jest.fn();
    jest.useFakeTimers({ timerLimit: 6000 });
    initUseRecoilStateWithQuizPhase('progress');
    const { result } = renderHook(() => useQuizPhase(3, mockApplyQuizResult));
    expect(result.current.quizPhase).toEqual('progress');
    jest.advanceTimersByTime(6000);
    expect(mockApplyQuizResult).toHaveBeenCalledTimes(1);
    expect(mockSetQuizPhase).toHaveBeenCalledWith('done');
    jest.clearAllTimers();
  });

  it('퀴즈 풀이 진행 중이 아니라면 풀이 진행 시간을 초기화한다.', async () => {
    const spyUseRef = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: 5 });
    const mockApplyQuizResult = jest.fn();
    jest.useFakeTimers({ timerLimit: 6000 });
    initUseRecoilStateWithQuizPhase('done');
    const { result } = renderHook(() => useQuizPhase(3, mockApplyQuizResult));
    expect(result.current.quizPhase).toEqual('done');
    jest.advanceTimersByTime(6000);
    expect(mockApplyQuizResult).not.toHaveBeenCalled();
    expect(spyUseRef).toHaveBeenCalledWith(0);
    jest.clearAllTimers();
  });
});
