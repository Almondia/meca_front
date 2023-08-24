import useRouteChangeBlocking from '@/hooks/useRouteChangeBlocking';
import { renderHook, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('useRouteChangeBlock', () => {
  it('route change시 blocking이 발생하며 url이 변경되지 않는다.', async () => {
    await mockRouter.push('/abc');
    const mockedBlockingCallback = jest.fn();
    const spyMockRouteEmitEvent = jest.spyOn(mockRouter.events, 'emit');
    renderHook(() => useRouteChangeBlocking(mockedBlockingCallback));
    expect(mockRouter.asPath).toEqual('/abc');
    try {
      await mockRouter.push('/hello');
    } catch (e) {
      // XXX: 'next-router-mock` not implemented router.events 'routeChangeError'
      // rejects.toThrowError 방식으로 변경 고려
      expect(e).toEqual('OK, This is Not Error');
    }
    await waitFor(() => expect(mockedBlockingCallback).toHaveBeenCalledTimes(1));
    expect(spyMockRouteEmitEvent).toHaveBeenCalledWith('routeChangeStart', '/hello', { shallow: false });
    expect(spyMockRouteEmitEvent).toHaveBeenCalledWith('routeChangeError');
    expect(mockRouter.asPath).toEqual('/abc');
    spyMockRouteEmitEvent.mockClear();
  });

  it('같은 경로로의 route change시 blocking이 발생하지 않는다.', async () => {
    await mockRouter.push('/abc');
    const mockedBlockingCallback = jest.fn();
    const spyMockRouteEvent = jest.spyOn(mockRouter.events, 'emit');
    renderHook(() => useRouteChangeBlocking(mockedBlockingCallback));
    await mockRouter.push('/abc?hello=world');
    expect(spyMockRouteEvent).toHaveBeenCalledWith('routeChangeStart', '/abc?hello=world', { shallow: false });
    expect(mockedBlockingCallback).not.toHaveBeenCalled();
    expect(mockRouter.asPath).toEqual('/abc?hello=world');
  });

  it('route change event off를 호출하면 이전에 blocking 했던 경로로 이동한다..', async () => {
    await mockRouter.push('/abc');
    const mockedBlockingCallback = jest.fn();
    const mockedOffCallback = jest.fn();
    const spyMockRouteOffEvent = jest.spyOn(mockRouter.events, 'off');
    const { result } = renderHook(() => useRouteChangeBlocking(mockedBlockingCallback));
    try {
      await mockRouter.push('/hello');
    } catch (e) {
      expect(e).toEqual('OK, This is Not Error');
    }
    await waitFor(() => expect(mockedBlockingCallback).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockRouter.asPath).toEqual('/abc'));

    const { offRouteChangeBlocking } = result.current;
    await waitFor(() => offRouteChangeBlocking(mockedOffCallback));
    expect(mockedOffCallback).toHaveBeenCalledTimes(1);
    expect(mockRouter.asPath).toEqual('/hello');
    expect(spyMockRouteOffEvent).toHaveBeenCalledWith('routeChangeStart', expect.any(Function));
    spyMockRouteOffEvent.mockClear();
  });
});
