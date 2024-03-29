import { implementServer } from '@/mock/server';
import { renderHook } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { restHandler } from '@/mock/handlers';
import { mockedPutImageUploadApi } from '@/mock/api';

import useFetchImage from '@/hooks/useFetchImage';

describe('useFetchImage', () => {
  it('이미지를 업로드하면 업로드된 이미지 url이 리턴된다.', async () => {
    implementServer([restHandler(mockedPutImageUploadApi)]);
    const { result } = renderHook(() => useFetchImage(), {
      wrapper: createQueryClientWrapper(),
    });
    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    const res = await result.current.uploadImage(
      {
        extension: 'png',
        purpose: 'card',
        fileName: 'file',
      },
      file,
    );
    expect(res).toEqual('file.png');
  });

  it('이미지 업로드에 실패하면 undefined가 리턴된다.', async () => {
    implementServer([restHandler(mockedPutImageUploadApi, { status: 400 })]);
    const { result } = renderHook(() => useFetchImage(), {
      wrapper: createQueryClientWrapper(),
    });
    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    const res = await result.current.uploadImage(
      {
        extension: 'png',
        purpose: 'card',
        fileName: 'file',
      },
      file,
    );
    expect(res).toEqual(undefined);
  });
});
