import Navigation from '@/components/organisms/Navigation';
import { renderQuery } from '../utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import mockRouter from 'next-router-mock';

describe('Navigation', () => {
  it('비로그인 사용자일 경우 navigation에 로그인 버튼이 식별된다.', async () => {
    renderQuery(<Navigation />);
    server.resetHandlers(
      rest.get('/api/user', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(null));
      }),
    );
    const loginButton = screen.getByRole('button', {
      name: '로그인',
    });
    expect(loginButton).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByRole('button', {
          name: '로그인',
        }),
      ).toBeInTheDocument();
    });
  });

  it('로그인 사용자일 경우 navigation에 프로필이 식별된다.', async () => {
    renderQuery(
      <>
        <Navigation />
      </>,
    );
    await waitFor(() => {
      expect(
        screen.queryByRole('button', {
          name: '로그인',
        }),
      ).not.toBeInTheDocument();
    });
    const imageAltText = await screen.findByAltText('/user.jpg');
    expect(imageAltText).toBeInTheDocument();
  });

  it('로그인 된 사용자가 navigation 프로필을 클릭해 logout하면 메인페이지로 이동한다.', async () => {
    renderQuery(
      <>
        <Navigation />
      </>,
    );
    const imageAltText = await screen.findByAltText('/user.jpg');
    expect(imageAltText).toBeInTheDocument();
    fireEvent.click(imageAltText);
    const logoutLink = await screen.findByRole('link', {
      name: /로그아웃/i,
    });
    fireEvent.click(logoutLink);
    await waitFor(() => expect(mockRouter.pathname).toEqual('/'));
    // 로그아웃되어 로그인 버튼이 식별된다.
    const loginButton = screen.getByRole('button', {
      name: '로그인',
    });
    expect(loginButton).toBeInTheDocument();
  });

  it('로그인된 사용자가 회원 정보 조회에 실패할 경우 메인페이지로 강제 이동하며 비로그인 사용자 UI가 식별된다.', async () => {
    renderQuery(
      <>
        <Navigation />
      </>,
    );
    server.resetHandlers(
      rest.get('/api/user', (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            message: '사용자 정보 조회 실패',
            status: 401,
          }),
        );
      }),
    );
    await waitFor(() => expect(mockRouter.pathname).toEqual('/'));
    await waitFor(() => {
      expect(
        screen.queryByRole('button', {
          name: '로그인',
        }),
      ).toBeInTheDocument();
    });
  });
});
