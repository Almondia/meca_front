import { renderQuery } from '../utils';
import { screen } from '@testing-library/react';
import Home from '@/pages';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Homepage', () => {
  it('메인 UI 상단 Carousel이 보여진다', () => {
    renderQuery(<Home />);
    const text = screen.getByRole('heading', {
      name: /내가 만드는 나를 위한 학습 카드/i,
    });
    expect(text).toBeInTheDocument();
  });

  it('공유 카테고리 목록이 보여진다.', async () => {
    renderQuery(<Home />);
    const categoryCardList = await screen.findAllByTestId('id-category-card');
    expect(categoryCardList.length).toEqual(24);
    const profileImages = await screen.findAllByRole('img', {
      name: /profile-image/i,
    });
    expect(profileImages.length).toEqual(24);
  });
});
