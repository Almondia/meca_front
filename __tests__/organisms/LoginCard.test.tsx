import { screen, fireEvent } from '@testing-library/react';
import { render } from '../utils';
import LoginCard from '@/components/organisms/LoginCard';
import { hasBrowser } from '@/utils/common';

describe('LoginCard', () => {
  it('kakao 로그인 버튼을 클릭하면 지정된 경로로 이동한다', () => {
    render(<LoginCard />);

    const kakaoButton = screen.getByRole('button', {
      name: /카카오로 로그인/i,
    });
    const assignMock = jest.fn();
    if (!hasBrowser()) {
      return;
    }
    delete (window as any).location;
    (window as any).location = { ...window.location, assign: assignMock };
    fireEvent.click(kakaoButton);
    expect(assignMock).toHaveBeenCalledWith(process.env.NEXT_PUBLIC_KAKAO_LOGIN);
  });

  it('google 로그인 버튼을 클릭하면 지정된 경로로 이동한다', () => {
    render(<LoginCard />);

    const googleLogin = screen.getByRole('button', {
      name: /google로 로그인/i,
    });
    const assignMock = jest.fn();
    if (!hasBrowser()) {
      return;
    }
    delete (window as any).location;
    (window as any).location = { ...window.location, assign: assignMock };
    fireEvent.click(googleLogin);
    expect(assignMock).toHaveBeenCalledWith(process.env.NEXT_PUBLIC_GOOGLE_LOGIN);
  });
});
