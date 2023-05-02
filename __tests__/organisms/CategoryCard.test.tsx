import { renderQuery } from '../utils';

import { screen, fireEvent } from '@testing-library/react';
import CategoryCard from '@/components/organisms/CategoryCard';
import mockRouter from 'next-router-mock';

describe('CategoryCard', () => {
  it('Category Card가 UI에 보여진다.', () => {
    renderQuery(
      <CategoryCard categoryId="c01" title="title1" thumbnail="" memberId="mid">
        card
      </CategoryCard>,
    );
    const cardTitle = screen.queryByText('title1');
    const thumbnail = screen.getByRole('img', {
      name: /title1-category-thumbnail/i,
    });
    expect(cardTitle).toBeInTheDocument();
    expect(thumbnail).toBeInTheDocument();
  });

  it('Category Card 타이틀을 클릭하면 해당 카테고리의 카드 목록 페이지로 이동한다.', () => {
    renderQuery(
      <CategoryCard categoryId="c01" title="title1" thumbnail="" memberId="mid">
        card
      </CategoryCard>,
    );
    const cardTitle = screen.getByText('title1');
    expect(cardTitle).toBeInTheDocument();
    fireEvent.click(cardTitle);
    expect(mockRouter.pathname).toEqual('/categories/mid-c01');
  });

  it('Category Card Thumbnail을 클릭하면 해당 카테고리의 카드 목록 페이지로 이동한다.', () => {
    const mockPush = jest.fn();
    renderQuery(
      <CategoryCard categoryId="c01" title="title1" thumbnail="" memberId="mid">
        card
      </CategoryCard>,
    );
    const thumbnail = screen.getByRole('img', {
      name: /title1-category-thumbnail/i,
    });
    fireEvent.click(thumbnail);
    expect(mockRouter.pathname).toEqual('/categories/mid-c01');
  });
});
