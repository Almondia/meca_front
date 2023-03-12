import Navigation from '@/components/organisms/Navigation';
import { render } from '../utils';
import { screen, fireEvent } from '@testing-library/react';

describe('Navigation', () => {
  it('비로그인 사용자일 경우 navigation에 login 링크가 식별된다.', () => {
    render(<Navigation />);
    const linkText = screen.getByRole('link', {
      name: 'LOGIN',
    });
    expect(linkText).toBeInTheDocument();
  });

  it('로그인 사용자일 경우 navigation에 프로필이 식별된다.', () => {
    render(<Navigation loginUserName="user-name" profileImage="/abc/profile-image.jpg" />);
    const imageAltText = screen.getByAltText('/abc/profile-image.jpg');
    expect(imageAltText).toBeInTheDocument();
  });
});
