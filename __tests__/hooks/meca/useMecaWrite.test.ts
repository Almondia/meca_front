import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { restHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';

import { mockedPostMecaApi, mockedPutMecaUpdateApi } from '@/mock/api';
import { MOCK_CATEGORY_ID, MOCK_MECA_ID, MOCK_MEMBER_ID } from '@/mock/data';

import mockRouter from 'next-router-mock';

import { combineUUID } from '@/utils/uuidHandler';
import alertToast from '@/utils/toastHandler';

import useMecaWrite from '@/hooks/meca/useMecaWrite';

jest.mock('@/utils/toastHandler', () => {
  return jest.fn();
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('useMecaWrite', () => {
  const cardId = MOCK_MECA_ID;
  const categoryId = MOCK_CATEGORY_ID;
  const memberId = MOCK_MEMBER_ID;
  const mockRequest = {
    title: 'title',
    question: 'question',
    answer: 'answer',
    cardType: 'ESSAY',
    cardId: cardId,
    categoryId: categoryId,
    description: 'description',
  } as any;
  beforeEach(() => {
    (alertToast as jest.Mock).mockReturnValueOnce(jest.fn());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[createMeca] 카드를 생성하면 성공 toast와 함께 생성된 페이지로 이동한다.', async () => {
    implementServer([restHandler(mockedPostMecaApi)]);
    const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      result.current.createMeca(mockRequest);
    });
    expect(alertToast).toHaveBeenCalledTimes(1);
    expect(mockRouter.asPath.startsWith('/meca/')).toBeTruthy();
  });

  it('[createMeca] 카드 생성 요청이 실패하면 실패 toast와 함께 페이지 이동이 없다.', async () => {
    resetServer([restHandler(mockedPostMecaApi, { status: 400, message: 'bad-request' })]);
    await mockRouter.push('/meca/123/write-card');
    const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      result.current.createMeca(mockRequest);
    });
    expect(alertToast).toHaveBeenCalledWith('bad-request', 'warning');
    expect(mockRouter.asPath).toEqual('/meca/123/write-card');
  });

  it('[updateMeca] 카드를 수정하면 성공 toast와 함께 생성된 페이지로 이동한다.', async () => {
    implementServer([restHandler(mockedPutMecaUpdateApi)]);
    const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      result.current.updateMeca(mockRequest);
    });
    expect(alertToast).toHaveBeenCalledTimes(1);
    expect(mockRouter.asPath.startsWith('/meca/')).toBeTruthy();
  });

  it('[updateMeca] 카드 수정 요청이 실패하면 실패 toast와 함께 페이지 이동이 없다.', async () => {
    resetServer([restHandler(mockedPutMecaUpdateApi, { status: 400, message: 'bad-request' })]);
    await mockRouter.push('/meca/123/write-card');
    const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      result.current.updateMeca(mockRequest);
    });
    expect(alertToast).toHaveBeenCalledWith('bad-request', 'warning');
    expect(mockRouter.asPath).toEqual('/meca/123/write-card');
  });
});
