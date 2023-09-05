import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { restHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';
import queryKey from '@/query/queryKey';
import { mockedGetAuthUserdMecaApi, mockedGetSharedMecaApi } from '@/mock/api';

import { useRecoilValue } from 'recoil';

import { MOCK_MECA_ID, MOCK_MEMBER_ID } from '@/mock/data';
import mecaApi from '@/apis/mecaApi';
import { generateQueryClient } from '@/query/queryClient';

import useMeca from '@/hooks/meca/useMeca';

jest.mock('recoil', () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock('@/atoms/common', () => ({
  hasAuthState: jest.fn(),
}));

describe('useMeca', () => {
  const memberId = MOCK_MEMBER_ID;
  const cardId = MOCK_MECA_ID;

  beforeEach(() => {
    (useRecoilValue as jest.Mock).mockReturnValue(true);
    implementServer([restHandler(mockedGetSharedMecaApi), restHandler(mockedGetAuthUserdMecaApi)]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('개인 상세 meca가 조회된다.', async () => {
    const { result } = renderHook(() => useMeca(cardId, false), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.meca).not.toBeUndefined();
    });
  });

  it('인증되지 않았을 경우 개인 상세 meca가 조회되지 않는다.', async () => {
    const spyGetMyCardById = jest.spyOn(mecaApi, 'getMyCardById');
    (useRecoilValue as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useMeca(cardId, false), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.meca).toBeUndefined();
      expect(result.current.isError).not.toBeTruthy();
    });
    expect(spyGetMyCardById).not.toHaveBeenCalled();
    spyGetMyCardById.mockClear();
  });

  it('개인 상제 meca 조회에 실패하면 isError 상태와 undefined가 리턴된다.', async () => {
    implementServer([restHandler(mockedGetAuthUserdMecaApi, { status: 400 })]);
    const { result } = renderHook(() => useMeca(cardId, false), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.meca).toBeUndefined();
      expect(result.current.isError).toBeTruthy();
    });
  });

  it('공유 상세 meca가 조회된다.', async () => {
    (useRecoilValue as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useMeca(cardId, true, memberId), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.meca).not.toBeUndefined();
    });
  });

  it('공유 상세 meca 조회 실패 시 isError 상태를 반환함과 함께 기존 캐시를 초기화한다.', async () => {
    resetServer([restHandler(mockedGetSharedMecaApi, { status: 400, message: 'bad request' })]);
    const queryClient = generateQueryClient();
    queryClient.setQueryData = jest.fn();
    const { result } = renderHook(() => useMeca(cardId, true, memberId), {
      wrapper: createQueryClientWrapper(queryClient),
    });
    await waitFor(() => {
      expect(result.current.meca).toBeUndefined();
      expect(result.current.isError).toBeTruthy();
    });
    expect(queryClient.setQueryData).toHaveBeenCalledWith([queryKey.meca, cardId], undefined);
  });
});
