import { act, renderHook } from '@testing-library/react';
import useDetactToken from '@/hooks/useDetactToken';
import storage from '@/utils/storageHandler';
import { RecoilRoot } from 'recoil';

jest.mock('@/utils/storageHandler', () => {
  const storage = {
    getItem: jest.fn(),
  };
  return storage;
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useDetactToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('storage에 토큰이 없다면 false를 리턴한다.', () => {
    (storage.getItem as jest.Mock).mockReturnValueOnce(null);
    const { result } = renderHook(() => useDetactToken(), { wrapper: RecoilRoot });
    expect(result.current.hasToken).toBe(false);
    expect(storage.getItem).toHaveBeenCalledTimes(1);
    expect(storage.getItem).toHaveBeenCalledWith('token');
  });

  it('storage에 토큰이 있다면 true를 리턴한다.', () => {
    (storage.getItem as jest.Mock).mockReturnValueOnce({ accessToken: '123', refreshToken: '456' });
    const { result } = renderHook(() => useDetactToken(), { wrapper: RecoilRoot });
    expect(result.current.hasToken).toBe(true);
    expect(storage.getItem).toHaveBeenCalledTimes(1);
    expect(storage.getItem).toHaveBeenCalledWith('token');
  });

  it('storage에 토큰이 있었다가 사라지면 false로 상태가 변경된다.', () => {
    (storage.getItem as jest.Mock).mockReturnValueOnce({ accessToken: '123', refreshToken: '456' });
    const { result } = renderHook(() => useDetactToken(), { wrapper: RecoilRoot });
    expect(result.current.hasToken).toBe(true);
    act(() => {
      (storage.getItem as jest.Mock).mockReturnValueOnce(null);
      window.dispatchEvent(new Event('storage'));
    });
    expect(result.current.hasToken).toBe(false);
  });
});
