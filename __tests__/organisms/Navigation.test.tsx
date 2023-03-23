import Navigation from '@/components/organisms/Navigation';
import { RecoilObserver, renderQuery } from '../utils';
import { screen, fireEvent } from '@testing-library/react';
import { hasAuthState } from '@/atoms/common';

describe('Navigation', () => {
  it('비로그인 사용자일 경우 navigation에 login 링크가 식별된다.', () => {
    renderQuery(<Navigation />);
    const linkText = screen.getByRole('link', {
      name: 'LOGIN',
    });
    expect(linkText).toBeInTheDocument();
  });

  it('로그인 사용자일 경우 navigation에 프로필이 식별된다.', async () => {
    renderQuery(
      <>
        <Navigation />
      </>,
    );
    const imageAltText = await screen.findByAltText('/user.jpg');
    expect(imageAltText).toBeInTheDocument();
  });
});
