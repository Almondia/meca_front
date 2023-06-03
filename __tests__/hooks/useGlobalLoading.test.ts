import useGlobalLoading from '@/hooks/useGlobalLoading';
import { renderHook } from '@testing-library/react';
import { useRecoilState } from 'recoil';

jest.mock('recoil', () => ({
  useRecoilState: jest.fn(),
}));

jest.mock('@/atoms/common', () => ({
  isGlobalLoadingState: jest.fn(),
}));

describe('useGlobalLoading', () => {
  beforeEach(() => {
    (useRecoilState as jest.Mock).mockReturnValue([false, setIsGlobalLoading]);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const setIsGlobalLoading = jest.fn();

  const fakeAsyncFunction = jest.fn(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Success');
      }, 200);
    });
  });

  it('주어지는 비동기 함수 호출 성공 시 loading 상태가 변경된다.', async () => {
    const { result } = renderHook(() => useGlobalLoading());
    expect(result.current.isGlobalLoading).toBeFalsy();
    await result.current.asyncCallbackLoader(() => fakeAsyncFunction());
    expect(setIsGlobalLoading).toHaveBeenCalledWith(true);
    expect(setIsGlobalLoading).toHaveBeenLastCalledWith(false);
  });

  it('주어지는 비동기 함수 호출 에러 발생시에도 loading 상태가 변경된다.', async () => {
    const { result } = renderHook(() => useGlobalLoading());
    fakeAsyncFunction.mockRejectedValue(new Error('Async error'));
    expect(result.current.isGlobalLoading).toBeFalsy();
    await expect(async () => {
      await result.current.asyncCallbackLoader(() => fakeAsyncFunction());
    }).rejects.toThrowError(new Error('Async error'));
    expect(setIsGlobalLoading).toHaveBeenCalledWith(true);
    expect(setIsGlobalLoading).toHaveBeenLastCalledWith(false);
  });

  it('globalLoadingState를 변경할 수 있다.', async () => {
    const { result } = renderHook(() => useGlobalLoading());
    result.current.startLoading();
    expect(setIsGlobalLoading).toHaveBeenLastCalledWith(true);
    result.current.endLoading();
    expect(setIsGlobalLoading).toHaveBeenLastCalledWith(false);
  });
});
