import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedPostCategoryApi, mockedPutCategoryApi } from '@/mock/api';
import { MOCK_CATEGORY_PAGINATION_LIST } from '@/mock/data';

import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import useFetchImage from '@/hooks/useFetchImage';
import useCategoryUpdate from '@/hooks/category/useCategoryUpdate';

jest.mock('@/hooks/useFetchImage', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useCategoryUpdate', () => {
  const mockUploadImage = jest.fn();
  beforeEach(() => {
    (useFetchImage as unknown as jest.Mock).mockReturnValue({ uploadImage: mockUploadImage });
    implementServer([restHandler(mockedPutCategoryApi), restHandler(mockedPostCategoryApi)]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[addCategory] 카테고리를 등록 시 successHandler callback이 동작한다.', async () => {
    const mockSuccessHandler = jest.fn();
    const { result } = renderHook(() => useCategoryUpdate(mockSuccessHandler), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      result.current.addCategory({ title: 'title', thumbnail: '' });
    });
    expect(mockSuccessHandler).toHaveBeenCalledTimes(1);
  });

  it('[updateCategory] 카테고리 수정 시 결과가 반영된다.', async () => {
    const mockSuccessHandler = jest.fn();
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.categories, 'me'], {
      pages: [{ contents: MOCK_CATEGORY_PAGINATION_LIST.contents }],
    });
    const { result } = renderHook(() => useCategoryUpdate(mockSuccessHandler), {
      wrapper: createQueryClientWrapper(queryClient),
    });
    const mockCategoryId = MOCK_CATEGORY_PAGINATION_LIST.contents[0].category.categoryId;
    const mutationData = { categoryId: mockCategoryId, title: 'changed-title', thumbnail: 'thumbnail', shared: true };
    await waitFor(() => {
      result.current.updateCategory(mutationData);
    });
    const updatedCategory = ((queryClient.getQueryData([queryKey.categories, 'me']) ?? []) as any).pages[0].contents[0]
      .category;
    expect(updatedCategory).toHaveProperty('title', mutationData.title);
    expect(updatedCategory).toHaveProperty('thumbnail', mutationData.thumbnail);
    expect(mockSuccessHandler).toHaveBeenCalledTimes(1);
  });

  it('[uploadThumbnail] image File에 대한 요청 시 이미지 업로드 후 결과를 리턴한다.', async () => {
    mockUploadImage.mockResolvedValueOnce('uploadedImage');
    const { result } = renderHook(() => useCategoryUpdate(), {
      wrapper: createQueryClientWrapper(),
    });
    const uploadedImage = await result.current.uploadThumbnail(new File(['file'], 'abc.jpeg'));
    expect(mockUploadImage).toHaveBeenCalledTimes(1);
    expect(uploadedImage).toEqual('uploadedImage');
  });

  it('[uploadThumbnail] File이 아닌 url 이미지일 경우 업로드하지 않고 해당 이미지를 그대로 리턴한다.', async () => {
    const { result } = renderHook(() => useCategoryUpdate(), {
      wrapper: createQueryClientWrapper(),
    });
    const uploadedImage = await result.current.uploadThumbnail('abc.jpeg');
    expect(mockUploadImage).not.toHaveBeenCalled();
    expect(uploadedImage).toEqual('abc.jpeg');
  });
});
