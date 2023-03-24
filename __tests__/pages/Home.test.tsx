import { renderQuery } from '../utils';
import { screen } from '@testing-library/react';
import Home from '@/pages';

describe('Homepage', () => {
  it('비로그인 사용자에게 메인 UI가 보여진다', () => {
    renderQuery(<Home />);
    const text = screen.getByRole('heading', {
      name: /조금 더 긴 서비스 설명을 설명해보고 설명하고 설명해보아요 배경을 꾸며요/i,
    });
    expect(text).toBeInTheDocument();
  });
});
