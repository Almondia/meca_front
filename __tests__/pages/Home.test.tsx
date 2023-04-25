import { renderQuery } from '../utils';
import { screen, fireEvent } from '@testing-library/react';
import Home from '@/pages';
import { CATEGORIES } from '../__mocks__/msw/data';

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
    const profileImages = await screen.findAllByRole('img', {
      name: /profile-image/i,
    });
    expect(categoryCardList.length).toEqual(24);
    expect(profileImages.length).toEqual(24);
  });

  it('특정 제목 키워드로 검색 시 해당 카테고리 목록만 보여진다.', async () => {
    const containTitle = 'title1';
    const searchedCategories = CATEGORIES.filter((category) => category.title.indexOf(containTitle) !== -1);
    renderQuery(<Home />);
    const searchInput = screen.getByRole('textbox', {
      name: 'input-category-search',
    });
    expect(searchInput).toHaveValue('');
    fireEvent.change(searchInput, { target: { value: containTitle } });
    expect(searchInput).toHaveValue(containTitle);
    fireEvent.click(screen.getByRole('button', { name: '검색' }));
    const categoryCards = await screen.findAllByTestId('id-category-card');
    expect(categoryCards.length).toEqual(searchedCategories.length);
    categoryCards.forEach((card) => expect(card).toHaveTextContent(/title1/i));
  });
});
