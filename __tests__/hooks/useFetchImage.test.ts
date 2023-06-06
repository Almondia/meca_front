import { implementServer } from '../__mocks__/msw/server';

import useFetchImage from '@/hooks/useFetchImage';
import { renderHook } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { ENDPOINT, restHandler } from '../__mocks__/msw/handlers';
import { mockedGetPresignImageUrlApi, mockedPutImageUploadApi } from '../__mocks__/msw/api';

describe('useFetchImage', () => {
  it('presigned url을 발급받고 이미지를 업로드 할 수 있다.', async () => {
    implementServer([
      restHandler(mockedGetPresignImageUrlApi),
      restHandler(() => mockedPutImageUploadApi(`${ENDPOINT}/card/file.png`)),
    ]);
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
    expect(res).toEqual('card/file.png');
  });

  it('presigned url을 발급받을 수 없다면 undefined가 리턴된다.', async () => {
    implementServer([
      restHandler(mockedGetPresignImageUrlApi, { message: 'internel server error', status: 500 }),
      restHandler(() => mockedPutImageUploadApi(`${ENDPOINT}/card/file.png`)),
    ]);
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
