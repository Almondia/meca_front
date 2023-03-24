import { renderQuery } from '../utils';

import { screen, fireEvent } from '@testing-library/react';
import CategoryCard from '@/components/molcules/CategoryCard';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('CategoryCard', () => {
  it('Category Card가 UI에 보여진다.', () => {
    renderQuery(<CategoryCard categoryId="c01" title="title1" />);
    const cardTitle = screen.queryByText('title1');
    expect(cardTitle).toBeInTheDocument();
  });

  it('Category Card 타이틀을 클릭하면 해당 카테고리의 카드 목록 페이지로 이동한다.', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    renderQuery(<CategoryCard categoryId="c01" title="title1" />);
    const cardTitle = screen.getByText('title1');
    expect(cardTitle).toBeInTheDocument();
    fireEvent.click(cardTitle);
    expect(mockPush).toHaveBeenCalledWith('/me/categories/c01');
  });
});