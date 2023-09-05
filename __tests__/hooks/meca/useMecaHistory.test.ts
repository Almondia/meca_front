import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { restHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';
import { mockedGetMecaHistoryByCardApi, mockedGetMecaHistoryByMemberApi } from '@/mock/api';
import { MOCK_HISTORY_LIST, MOCK_MECA_ID, MOCK_MEMBER_ID } from '@/mock/data';

import useMecaHistory from '@/hooks/meca/useMecaHistory';
import cardHistoryApi from '@/apis/cardHistoryApi';

describe('useMecaHistory', () => {
  const memberId = MOCK_MEMBER_ID;
  const cardId = MOCK_MECA_ID;
  beforeEach(() => {
    implementServer([restHandler(mockedGetMecaHistoryByCardApi), restHandler(mockedGetMecaHistoryByMemberApi)]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('회원에 대한 히스토리 목록이 조회된다.', async () => {
    const { result } = renderHook(() => useMecaHistory('members', memberId), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.cardHistoryList.contents).not.toHaveLength(0);
      expect(result.current.isEmpty).not.toBeTruthy();
    });
  });

  it('회원에 대한 히스토리 목록이 비어있을 경우 빈 목록 콘텐츠가 리턴된다.', async () => {
    resetServer([restHandler(() => mockedGetMecaHistoryByMemberApi({ ...MOCK_HISTORY_LIST, contents: [] }))]);
    const { result } = renderHook(() => useMecaHistory('members', memberId), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.cardHistoryList.contents).toHaveLength(0);
      expect(result.current.isEmpty).toBeTruthy();
      expect(result.current.hasNextPage).toBeFalsy();
    });
  });

  it('회원에 대한 히스토리 목록 조회 실패 시 빈 목록 콘텐츠가 리턴된다.', async () => {
    const spyGetHistories = jest.spyOn(cardHistoryApi, 'getHistories');
    resetServer([restHandler(mockedGetMecaHistoryByMemberApi, { status: 400 })]);
    const { result } = renderHook(() => useMecaHistory('members', memberId), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.cardHistoryList.contents).toHaveLength(0);
      expect(result.current.isEmpty).toBeTruthy();
      expect(result.current.hasNextPage).toBeFalsy();
    });
    await result.current.fetchNextPage();
    await result.current.fetchNextPage();
    expect(spyGetHistories).toHaveBeenCalledTimes(1);
  });

  it('카드에 대한 히스토리 목록이 조회된다.', async () => {
    const { result } = renderHook(() => useMecaHistory('cards', cardId), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.cardHistoryList.contents).not.toHaveLength(0);
      expect(result.current.isEmpty).not.toBeTruthy();
    });
  });

  it('다음 데이터가 있다면 추가적인 fetch 시 api가 호출된다.', async () => {
    const spyGetHistories = jest.spyOn(cardHistoryApi, 'getHistories');
    resetServer([restHandler(() => mockedGetMecaHistoryByMemberApi({ ...MOCK_HISTORY_LIST, hasNext: 'id' }))]);
    const { result } = renderHook(() => useMecaHistory('members', memberId), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.cardHistoryList.contents).not.toHaveLength(0);
      expect(result.current.hasNextPage).toBeTruthy();
    });
    await result.current.fetchNextPage();
    expect(spyGetHistories).toHaveBeenCalledTimes(2);
    spyGetHistories.mockClear();
  });

  it('다음 데이터 호출에 실패할 경우 throw 없이 기존 데이터가 유지된다.', async () => {
    resetServer([restHandler(() => mockedGetMecaHistoryByMemberApi({ ...MOCK_HISTORY_LIST, hasNext: 'id' }))]);
    const { result } = renderHook(() => useMecaHistory('members', memberId), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.cardHistoryList.contents).not.toHaveLength(0);
      expect(result.current.hasNextPage).toBeTruthy();
    });
    const historyListWithFetchedOnce = { ...result.current.cardHistoryList };
    implementServer([restHandler(mockedGetMecaHistoryByMemberApi, { status: 400 })]);
    await result.current.fetchNextPage();
    expect(result.current.cardHistoryList).toEqual(historyListWithFetchedOnce);
    expect(result.current.isEmpty).toBeFalsy();
    // TODO: [infinite scroll 공통 사항] 스크롤 도중 에러 발생 시 별도의 처리를 통해 다시 탐색해나갈 수 있게 구현해보기?
  });
});
