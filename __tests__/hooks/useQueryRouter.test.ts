import useQueryRouter from '@/hooks/useQueryRouter';
import { renderHook, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('useQueryRouter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('지정된 쿼리로 replace시 해당 쿼리로 router replace가 동작한다.', async () => {
    window.history.replaceState = jest.fn();
    const { result } = renderHook(() => useQueryRouter<'exam'>({ exam: '' }));
    expect(result.current.exam).toEqual('');
    await waitFor(() => result.current.replaceWithQuery({ exam: 'hello' }));
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { as: '/?exam=hello', url: '/?exam=hello' },
      '',
      '/?exam=hello',
    );
    expect(result.current.exam).toEqual('hello');
    await waitFor(() => result.current.replaceWithQuery({ exam: 'hell world!' }));
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { as: '/?exam=hell+world%21', url: '/?exam=hell+world%21' },
      '',
      '/?exam=hell+world%21',
    );
    await waitFor(() => expect(result.current.exam).toEqual('hell world!'));
  });

  it('지정된 여러 쿼리로 replace시 해당 쿼리들로 router replace가 동작한다. ', async () => {
    mockRouter.push('/?a=a-val');
    window.history.replaceState = jest.fn();
    const { result } = renderHook(() => useQueryRouter<'a' | 'b' | 'c'>({ a: 'a-val', b: '', c: '' }));
    expect(result.current.a).toEqual('a-val');
    expect(result.current.b).toEqual('');
    const inputQueries = { a: 'a-value', b: 'b-value', c: 'c-value' };
    await waitFor(() => result.current.replaceWithQuery(inputQueries));
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { as: '/?a=a-value&b=b-value&c=c-value', url: '/?a=a-value&b=b-value&c=c-value' },
      '',
      '/?a=a-value&b=b-value&c=c-value',
    );
  });

  it('이전과 동일한 쿼리 정보를 가졌을 경우 router replace가 호출되지 않는다.', async () => {
    mockRouter.push('/abc?a=a-val&b=b-val&kkkk=123');
    window.history.replaceState = jest.fn();
    const { result } = renderHook(() => useQueryRouter<'a' | 'b' | 'c'>({ a: 'a-val', b: 'b-val', c: '' }));
    expect(mockRouter).toMatchObject({
      asPath: '/abc?a=a-val&b=b-val&kkkk=123',
      pathname: '/abc',
      query: { a: 'a-val', b: 'b-val' },
    });
    const inputQueries = { b: 'b-val', a: 'a-val' };
    await waitFor(() => result.current.replaceWithQuery(inputQueries));
    await waitFor(() => result.current.replaceWithQuery(inputQueries));
    expect(window.history.replaceState).not.toHaveBeenCalled();
    expect(mockRouter).toMatchObject({
      asPath: '/abc?a=a-val&b=b-val&kkkk=123',
      pathname: '/abc',
      query: { a: 'a-val', b: 'b-val' },
    });
  });
});
