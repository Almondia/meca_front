import { rest } from 'msw';
import { server } from '../__mocks__/msw/server';

import useFetchImage from '@/hooks/useFetchImage';
import { renderHook } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import { screen } from '@testing-library/react';

describe('useFetchImage', () => {
  it('presigned url을 발급받고 이미지를 업로드 할 수 있다.', async () => {
    const { result } = renderHook(() => useFetchImage(), {
      wrapper: createQueryClientWrapper(),
    });
    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    const headers = { 'Content-Type': 'application/octet-stream' };
    server.use(
      rest.put(`${ENDPOINT}/card/file.png`, async (_, res, ctx) => {
        return res(ctx.status(200), ctx.set(headers));
      }),
    );
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
    server.resetHandlers(
      rest.get(`${ENDPOINT}/presign/images/upload`, async (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    const { result } = renderHook(() => useFetchImage(), {
      wrapper: createQueryClientWrapper(),
    });
    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    const headers = { 'Content-Type': 'application/octet-stream' };
    server.use(
      rest.put(`${ENDPOINT}/card/file.png`, async (_, res, ctx) => {
        return res(ctx.status(200), ctx.set(headers));
      }),
    );
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
