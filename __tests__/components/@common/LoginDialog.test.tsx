import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/__tests__/utils';
import mockRouter from 'next-router-mock';

import LoginDialog from '@/components/@common/organisms/LoginDialog';

describe('LoginDialog', () => {
  it.each([
    ['kakao', '카카오', process.env.NEXT_PUBLIC_KAKAO_LOGIN],
    ['google', '구글', process.env.NEXT_PUBLIC_GOOGLE_LOGIN],
    ['naver', '네이버', process.env.NEXT_PUBLIC_NAVER_LOGIN],
  ])('%s 로그인 버튼을 클릭하면 지정된 경로로 이동한다', (_, name: string, url: string | undefined) => {
    render(<LoginDialog visible={true} onClose={jest.fn()} />);
    const socialButton = screen.getByRole('button', {
      name: new RegExp(`${name}로 로그인하기$`, 'i'),
    });
    fireEvent.click(socialButton);
    expect((url ?? '').endsWith(mockRouter.asPath)).toBeTruthy();
  });
});
