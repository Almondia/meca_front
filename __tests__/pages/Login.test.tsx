import { render } from '../utils';
import Login, { getServerSideProps } from '@/pages/login';
import { screen, waitFor } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import nookies from 'nookies';

jest.mock('nookies', () => ({
  set: jest.fn(),
}));

describe('LoginPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');

  it('Login Page에 비정상적으로 접근(code, auth type없이)하면 메인페이지로 이동된다.', async () => {
    const mockedContext = {
      req: {
        url: '/login',
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(mockedContext.res.writeHead).toBeCalledWith(302, { Location: '/' });
    expect(mockedContext.res.end).toBeCalled();
    expect({ ...props }).toEqual({});
  });

  it('Login Page에 지정되지 않은 비정상적인 authtype이 있을 경우 메인페이지로 이동된다.', async () => {
    const mockedContext = {
      req: {
        url: '/login?auth=github&code=code',
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(mockedContext.res.writeHead).toBeCalledWith(302, { Location: '/' });
    expect(mockedContext.res.end).toBeCalled();
    expect({ ...props }).toEqual({});
  });

  it('지정된 querystring으로 접근했으나 부적절한 정보여서 로그인에 실패하면 toast 메시지와 함께 메인페이지로 이동된다.', async () => {
    const replaceMock = jest.fn();
    useRouterMock.mockImplementation(() => ({
      replace: replaceMock,
    }));
    server.resetHandlers(
      rest.post(`${ENDPOINT}/oauth/login/kakao`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: '알 수 없는 오류',
          }),
        );
      }),
    );
    const mockedContext = {
      req: {
        url: '/login?auth=kakao&code=abadaeg',
      },
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toEqual({
      message: '알 수 없는 오류',
    });
    render(<Login message={props.message} />);
    await waitFor(() => expect(screen.getByText(/please wait/i)).toBeInTheDocument());
    const toastText = await screen.findByText('알 수 없는 오류');
    expect(toastText).toBeInTheDocument();
    expect(replaceMock).toHaveBeenCalledWith('/');
  });

  it('Login Page에 지정된 kakao oauth로 적절한 정보와 함꼐 접근하여 로그인에 성공하면 toast 메시지와 함꼐 메인페이지로 이동된다..', async () => {
    const replaceMock = jest.fn();
    useRouterMock.mockImplementation(() => ({
      replace: replaceMock,
    }));
    const mockedContext = {
      req: {
        url: '/login?auth=kakao&code=code',
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(nookies.set).toBeCalled();
    expect(props).toEqual({
      message: '로그인 성공',
    });
    render(<Login message={props.message} />);
    await waitFor(() => expect(screen.getByText(/please wait/i)).toBeInTheDocument());
    const toastText = await screen.findByText('로그인 성공');
    expect(toastText).toBeInTheDocument();
    expect(replaceMock).toHaveBeenCalledWith('/');
  });
});
