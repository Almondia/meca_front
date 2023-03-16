import { render } from '../utils';
import Login from '@/pages/login';
import { screen } from '@testing-library/react';

describe('LoginPage', () => {
  const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');

  it('Login Page에 비정상적으로 접근(code, auth type없이)하면 메인페이지로 이동된다.', () => {
    const replaceMock = jest.fn();
    useRouterMock.mockImplementation(() => ({
      replace: replaceMock,
    }));
    render(<Login />);
    expect(useRouterMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith('/');
  });

  it('Login Page에 지정되지 않은 비정상적인 authtype이 있을 경우 메인페이지로 이동된다.', async () => {
    const replaceMock = jest.fn();
    useRouterMock.mockImplementation(() => ({
      asPath: '/login?auth=github&code=code',
      replace: replaceMock,
    }));
    render(<Login />);
    expect(useRouterMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith('/');
  });

  it('Login Page에 지정된 kakao oauth로 접근할 경우 로그인 성공 알림이 뜨며 메인페이지로 이동된다..', async () => {
    const replaceMock = jest.fn();
    useRouterMock.mockImplementation(() => ({
      asPath: '/login?auth=kakao&code=code',
      replace: replaceMock,
    }));
    render(<Login />);
    expect(useRouterMock).toHaveBeenCalled();
    const toastMessage = await screen.findByText('로그인 성공');
    expect(toastMessage).toBeInTheDocument();
    expect(replaceMock).toHaveBeenCalledWith('/');
  });
});
