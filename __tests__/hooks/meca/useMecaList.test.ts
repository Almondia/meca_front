import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { restHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';
import { mockedGetAuthUserMecaListApi, mockedGetSharedMecaListApi } from '@/mock/api';
import { MOCK_CATEGORY_ID, MOCK_MECA_PAGINATION_LIST } from '@/mock/data';

import { useRecoilValue } from 'recoil';
import mecaApi from '@/apis/mecaApi';
import { generateQueryClient } from '@/query/queryClient';

import useMecaList from '@/hooks/meca/useMecaList';
import ApiError from '@/apis/error/ApiError';

jest.mock('recoil', () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock('@/atoms/common', () => ({
  hasAuthState: jest.fn(),
}));

describe('useMecaList', () => {
  const categoryId = MOCK_CATEGORY_ID;
  beforeEach(() => {
    implementServer([restHandler(mockedGetAuthUserMecaListApi), restHandler(mockedGetSharedMecaListApi)]);
    (useRecoilValue as jest.Mock).mockReturnValue(true);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('개인 카드 목록이 조회된다.', async () => {
    const { result } = renderHook(() => useMecaList(categoryId, true), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      const { mecaList } = result.current;
      expect(mecaList.contents).not.toHaveLength(0);
      expect(mecaList).toHaveProperty('isMine', true);
    });
  });

  it('개인 카드 목록 조회 실패 시 빈 목록 콘텐츠가 리턴된다.', async () => {
    resetServer([restHandler(mockedGetAuthUserMecaListApi, { status: 400 })]);
    const { result } = renderHook(() => useMecaList(categoryId, true), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.mecaList.contents).toHaveLength(0);
      expect(result.current.isEmpty).toBeTruthy();
    });
  });

  it('인증되지 않았을 경우 개인 카드 목록이 조회되지 않는다.', async () => {
    const spyGetMyMecaList = jest.spyOn(mecaApi, 'getMyMecaList');
    (useRecoilValue as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useMecaList(categoryId, true), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.mecaList.contents).toHaveLength(0);
      expect(result.current.isEmpty).toBeTruthy();
    });
    expect(spyGetMyMecaList).not.toHaveBeenCalled();
  });

  it('공유 카드 목록이 조회된다.', async () => {
    (useRecoilValue as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useMecaList(categoryId, false), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      const { mecaList } = result.current;
      expect(mecaList.contents).not.toHaveLength(0);
      expect(mecaList).not.toHaveProperty('isMine');
    });
  });

  it('[fetchInfiniteQuery] 조회 실패 시 ApiError를 반환한다.', async () => {
    resetServer([restHandler(mockedGetSharedMecaListApi, { status: 400, message: '조회 실패' })]);
    MOCK_MECA_PAGINATION_LIST;
    const queryClient = generateQueryClient();
    await expect(async () => {
      await useMecaList.fetchInfiniteQuery(categoryId, false, queryClient);
    }).rejects.toThrow(ApiError);
  });
});
