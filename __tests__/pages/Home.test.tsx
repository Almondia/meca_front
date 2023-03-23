import { renderQuery, render } from '../utils';
import { screen } from '@testing-library/react';
import Home from '@/pages';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Homepage', () => {
  it('비로그인 사용자에게 메인 UI가 보여진다', () => {
    renderQuery(<Home />);
    const text = screen.getByRole('heading', {
      name: /조금 더 긴 서비스 설명을 설명해보고 설명하고 설명해보아요 배경을 꾸며요/i,
    });
    expect(text).toBeInTheDocument();
  });

  it('로그인 사용자에게 본인 카테고리 목록 UI가 보여진다.', async () => {
    renderQuery(<Home hasAuth={true} />);
    const categoryListPageHead = await screen.findByRole('heading', {
      name: '카테고리 목록',
    });
    expect(categoryListPageHead).toBeInTheDocument();
  });
});
