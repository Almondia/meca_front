import { renderQuery } from '@/__tests__/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { restHandler, restOverridedResponseHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';
import { MOCK_MEMBER } from '@/mock/data';
import { mockedGetUserWithServerApi, mockedPostLogoutApi } from '@/mock/api';
import mockRouter from 'next-router-mock';

import Navigation from '@/components/@common/organisms/Navigation';

describe('Navigation', () => {
  beforeEach(() => {
    implementServer([
      restHandler(() => mockedGetUserWithServerApi({ ...MOCK_MEMBER, name: 'pds0309' })),
      restHandler(mockedPostLogoutApi),
    ]);
  });

  it('비로그인 사용자일 경우 navigation에 로그인 버튼이 식별된다.', async () => {
    renderQuery(<Navigation />);
    resetServer([restOverridedResponseHandler(mockedGetUserWithServerApi, null)]);
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
    renderQuery(<Navigation />);
    await waitFor(() => {
      expect(
        screen.queryByRole('button', {
          name: '로그인',
        }),
      ).not.toBeInTheDocument();
    });
    const imageAltText = await screen.findByAltText(/pds0309-avatar/i);
    expect(imageAltText).toBeInTheDocument();
  });

  it('로그인 된 사용자가 navigation 프로필을 클릭해 mypage로 이동할 수 있다.', async () => {
    renderQuery(<Navigation />);
    await waitFor(() => {
      expect(
        screen.queryByRole('button', {
          name: '로그인',
        }),
      ).not.toBeInTheDocument();
    });
    const imageAltText = await screen.findByAltText(/pds0309-avatar/i);
    fireEvent.click(imageAltText);
    const mypageLink = await screen.findByRole('link', {
      name: /내 정보/i,
    });
    fireEvent.click(mypageLink);
    await waitFor(() => expect(mockRouter.pathname).toEqual('/mypage'));
  });

  it('로그인 된 사용자가 navigation 프로필을 클릭해 logout하면 메인페이지로 이동한다.', async () => {
    renderQuery(<Navigation />);
    const imageAltText = await screen.findByAltText(/pds0309-avatar/i);
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

  it('로그인된 사용자가 회원 정보 조회에 실패할 경우 메인페이지로 이동하며 비로그인 사용자 UI가 식별된다.', async () => {
    resetServer([restHandler(mockedGetUserWithServerApi, { status: 400 })]);
    await waitFor(() => renderQuery(<Navigation />));
    await waitFor(() => expect(mockRouter.pathname).toEqual('/'));
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });
});
