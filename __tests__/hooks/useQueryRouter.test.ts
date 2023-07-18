import useQueryRouter from '@/hooks/useQueryRouter';
import { renderHook, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('useQueryRouter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('지정된 쿼리로 replace시 해당 쿼리로 router replace가 동작한다.', async () => {
    mockRouter.push('/');
    const { result } = renderHook(() => useQueryRouter<'exam'>({}));
    expect(result.current.exam).toBeUndefined();
    await waitFor(() => result.current.replaceWithQuery({ exam: 'hello' }));
    expect(mockRouter).toMatchObject({
      asPath: '/?exam=hello',
      pathname: '/',
      query: { exam: 'hello' },
    });
    expect(result.current.exam).toEqual('hello');
    await waitFor(() => result.current.replaceWithQuery({ exam: 'hell world!' }));
    expect(mockRouter).toMatchObject({
      asPath: '/?exam=hell%20world!',
      pathname: '/',
      query: { exam: 'hell world!' },
    });
    expect(result.current.exam).toEqual('hell world!');
    await waitFor(() => result.current.replaceWithQuery({}));
    expect(mockRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
      query: {},
    });
  });

  it('지정된 여러 쿼리로 replace시 해당 쿼리들로 router replace가 동작한다. ', async () => {
    mockRouter.push('/abc');
    const { result } = renderHook(() => useQueryRouter<'a' | 'b' | 'c'>({ a: 'a-val' }));
    expect(result.current.a).toEqual('a-val');
    const inputQueries = { a: 'a-value', b: 'b-value', c: 'c-value' };
    await waitFor(() => result.current.replaceWithQuery(inputQueries));
    expect(mockRouter).toMatchObject({
      asPath: '/abc?a=a-value&b=b-value&c=c-value',
      pathname: '/abc',
      query: inputQueries,
    });
  });
});
