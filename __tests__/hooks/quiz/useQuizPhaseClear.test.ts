import { createQueryClientWrapper } from '../../utils';

import { renderHook } from '@testing-library/react';
import useQuizPhaseClear from '@/hooks/quiz/useQuizPhaseClear';
import { useSetRecoilState } from 'recoil';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import { MOCK_QUIZS } from '@/mock/data';
import { quizTimeState } from '@/atoms/quiz';

jest.mock('recoil', () => ({
  useSetRecoilState: jest.fn(),
}));

jest.mock('@/atoms/quiz', () => ({
  quizPhaseState: jest.fn(),
  quizTimeState: jest.fn(),
  quizTitleState: jest.fn(),
}));

describe('useQuizPhaseClear', () => {
  const setQuizTime = jest.fn();
  const setQuizTitle = jest.fn();
  const setQuizPhase = jest.fn();
  it('[clearQuizResult] 퀴즈 결과 캐시 데이터 및 클라이언트 상태가 초기화 된다.', () => {
    (useSetRecoilState as jest.Mock)
      .mockReturnValueOnce(setQuizTime)
      .mockReturnValueOnce(setQuizTitle)
      .mockReturnValueOnce(setQuizPhase);
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], MOCK_QUIZS);
    renderHook(() => useQuizPhaseClear(), { wrapper: createQueryClientWrapper(queryClient) }).result.current();
    expect(setQuizTime).toHaveBeenCalledWith(0);
    expect(setQuizTitle).toHaveBeenCalledWith('');
    expect(setQuizPhase).toHaveBeenCalledWith('progress');
    expect(queryClient.getQueryData([queryKey.quiz])).toEqual([]);
  });
});
