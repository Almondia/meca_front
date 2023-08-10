import { render } from '../../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';

import Avatar from '@/components/@common/atoms/Avatar';

const DEFAULT_AVATAR_IMAGE = 'noprofile.png';

describe('Avatar', () => {
  it('Avatar 이미지가 식별된다.', () => {
    render(<Avatar imgName="name" imgSize={30} imgSrc="/images/noimage.png" />);
    const image = screen.getByRole('img', { name: 'name-avatar' }) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('noimage.png');
  });

  it('이미지가 없을 경우 기본이미지가 식별된다.', async () => {
    render(<Avatar imgName="name" imgSize={30} imgSrc="" />);
    const image = screen.getByRole('img', { name: 'name-avatar' }) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    await waitFor(() => {
      expect(image.src).toContain(DEFAULT_AVATAR_IMAGE);
    });
  });

  it('Avatar 이미지가 존재했다가 지워질 경우 기본이미지가 식별된다.', () => {
    const AvatarWrapper = () => {
      const [imgSrc, setImgSrc] = useState('/images/noimage.png');
      return (
        <div>
          <button onClick={() => setImgSrc('')}>setBlank</button>
          <Avatar imgName="name" imgSize={30} imgSrc={imgSrc} />
        </div>
      );
    };
    render(<AvatarWrapper />);
    const image = screen.getByRole('img', { name: 'name-avatar' }) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('noimage.png');
    fireEvent.click(screen.getByRole('button'));
    const changedImage = screen.getByRole('img', { name: 'name-avatar' }) as HTMLImageElement;
    expect(changedImage.src).toContain(DEFAULT_AVATAR_IMAGE);
  });
});
