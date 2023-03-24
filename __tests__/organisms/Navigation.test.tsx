import Navigation from '@/components/organisms/Navigation';
import { renderQuery } from '../utils';
import { screen, waitFor } from '@testing-library/react';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Navigation', () => {
  it('비로그인 사용자일 경우 navigation에 login 링크가 계속해서 식별된다.', async () => {
    renderQuery(<Navigation />);
    server.resetHandlers(
      rest.get('/api/user', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(null));
      }),
    );
    const linkText = screen.getByRole('link', {
      name: 'LOGIN',
    });
    expect(linkText).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByRole('link', {
          name: 'LOGIN',
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
        screen.queryByRole('link', {
          name: 'LOGIN',
        }),
      ).not.toBeInTheDocument();
    });
    const imageAltText = await screen.findByAltText('/user.jpg');
    expect(imageAltText).toBeInTheDocument();
  });

  it('로그인된 사용자가 회원 정보 조회에 실패할 경우 메인페이지로 강제 이동된다.', async () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
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
    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalledWith('/');
      },
      {
        timeout: 2000,
      },
    );
  });
});
