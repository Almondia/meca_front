import { renderHook, waitFor } from '@testing-library/react';
import useImage from '@/hooks/useImage';

describe('useImage', () => {
  it.each([['jpg'], ['jpeg'], ['png'], ['gif']])(
    '지정된 (%s) 이미지 파일에 대해 validation이 통과한다.',
    (arg0: string) => {
      const { result } = renderHook(() => useImage(undefined));
      const file = new File(['abc'], `file.${arg0}`, { type: `image/${arg0}` });
      const { valid } = result.current.validImageFile(file);
      expect(valid).toBeTruthy();
    },
  );

  it('지정되지 않은 이미지 파일에 대해 validation이 실패한다.', () => {
    const { result } = renderHook(() => useImage(undefined));
    const file = new File(['abc'], 'file.bmp', { type: 'image/bmp' });
    const { valid } = result.current.validImageFile(file);
    expect(valid).toBeFalsy();
  });

  it('지정되지 않은 파일에 대해 validation이 실패한다.', () => {
    const { result } = renderHook(() => useImage(undefined));
    const file = new File(['abc'], 'file.txt', { type: 'text/plain' });
    const { valid } = result.current.validImageFile(file);
    expect(valid).toBeFalsy();
  });

  it('이미지 이름에 "."이 포함되어있다면 validation이 실패한다.', () => {
    const { result } = renderHook(() => useImage(undefined));
    const file = new File(['abc'], 'img.img.jpeg', { type: 'image/jpeg' });
    const { valid } = result.current.validImageFile(file);
    expect(valid).toBeFalsy();
  });

  it('이미지 파일의 info를 얻을 수 있다.', () => {
    const { result } = renderHook(() => useImage(undefined));
    const file = new File(['abc'], 'name.jpeg', { type: 'image/jpeg' });
    const { fileName, extension } = result.current.getImageInfo(file);
    expect(fileName).toEqual('name');
    expect(extension).toEqual('jpeg');
  });
});
