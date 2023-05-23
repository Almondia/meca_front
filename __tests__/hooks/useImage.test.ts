import { act, renderHook } from '@testing-library/react';
import useImage from '@/hooks/useImage';
import { validImageFile } from '@/utils/imageHandler';

jest.mock('@/utils/imageHandler', () => ({
  validImageFile: jest.fn(),
}));

describe('useImage', () => {
  it('이미지 변경 성공 시 image state가 변경 된다.', async () => {
    (validImageFile as jest.Mock).mockReturnValueOnce({ valid: true });
    const { result } = renderHook(() => useImage(undefined));
    const event = new CustomEvent<HTMLInputElement>('change') as unknown as React.ChangeEvent<HTMLInputElement>;
    Object.defineProperty(event, 'target', {
      value: {
        files: ['abc.jpg'],
      },
    });
    act(() => result.current.onChange(event));
    expect(result.current.image).toEqual('abc.jpg');
  });

  it('이미지 변경 실패 시 image state가 변경되지 않는다.', async () => {
    (validImageFile as jest.Mock).mockReturnValueOnce({ valid: false });
    const { result } = renderHook(() => useImage(undefined));
    const event = new CustomEvent<HTMLInputElement>('change') as unknown as React.ChangeEvent<HTMLInputElement>;
    Object.defineProperty(event, 'target', {
      value: {
        files: ['abc.jpg'],
      },
    });
    act(() => result.current.onChange(event));
    expect(result.current.image).toBeUndefined();
  });

  it('이미지 삭제 시 image state는 ""로 변경된다.', async () => {
    const { result } = renderHook(() => useImage('abc.jpg'));
    act(() => result.current.onDelete());
    expect(result.current.image).toEqual('');
  });
});
