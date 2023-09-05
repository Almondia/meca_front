import { act, renderHook } from '@testing-library/react';
import useImage from '@/hooks/useImage';
import { validImageFile } from '@/utils/imageHandler';

jest.mock('@/utils/imageHandler', () => ({
  validImageFile: jest.fn(),
}));

describe('useImage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('[onChange] 이미지 등록 시 image 상태에 반영 된다.', async () => {
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

  it('[onChange] 이미지 등록 실패 시 image 상태가 변경되지 않는다.', async () => {
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

  it('[onDelete] 이미지 삭제 시 image 상태가 clear된다.', async () => {
    const { result } = renderHook(() => useImage('abc.jpg'));
    act(() => result.current.onDelete());
    expect(result.current.image).toEqual('');
  });

  it('[onUploadLocalImage] 로컬 이미지를 업로드할 수 있다.', async () => {
    (validImageFile as jest.Mock).mockReturnValueOnce({ valid: true });
    const { result } = renderHook(() => useImage(undefined));
    const imageRef = result.current.hiddenImageRef;
    expect(imageRef).not.toBeUndefined();
    const imageElement = imageRef.current as HTMLInputElement;
    expect(imageElement).not.toBeUndefined();
    expect(imageElement).toHaveAttribute('type', 'file');
    imageElement.click = jest.fn();
    act(() => result.current.onUploadLocalImage());
    expect(imageElement.click).toHaveBeenCalledTimes(1);
  });

  it('[onSetFileImage] 이미지 파일을 통해 이미지 등록 시 image 상태에 반영된다.', () => {
    (validImageFile as jest.Mock).mockReturnValueOnce({ valid: true });
    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    const { result } = renderHook(() => useImage(undefined));
    expect(result.current.image).toBeUndefined();
    act(() => result.current.onSetFileImage(file));
    expect(result.current.image).toEqual(file);
  });
});
