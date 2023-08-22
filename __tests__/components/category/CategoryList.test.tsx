import { render } from '../../utils';
import { screen, waitFor } from '@testing-library/react';

import CategoryList from '@/components/category/organisms/CategoryList';
import { MOCK_CATEGORY_PAGINATION_LIST } from '@/mock/data';

const mockedCategoryList = MOCK_CATEGORY_PAGINATION_LIST;

describe('CategoryList', () => {
  it('카테고리 목록이 없다면 Empty 컴포넌트가 보여진다.', () => {
    render(<CategoryList fetchNextPage={jest.fn()} categoryList={mockedCategoryList} isEmpty />);
    const EmptyText = screen.getByText('목록이 존재하지 않습니다');
    expect(EmptyText).toBeInTheDocument();
  });

  it('카테고리 목록이 존재한다면 카테고리 목록이 보여진다.', async () => {
    const mockFetchNextPage = jest.fn();
    render(<CategoryList fetchNextPage={mockFetchNextPage} categoryList={mockedCategoryList} />);
    const pageListText = await screen.findAllByRole('article');
    expect(pageListText.length).toBe(2);
    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('다음 페이지 데이터가 있다면 다음 페이지를 가져오기를 기다리는 컴포넌트가 보여진다.', async () => {
    const mockFetchNextPage = jest.fn();
    render(<CategoryList hasNextPage={true} fetchNextPage={mockFetchNextPage} categoryList={mockedCategoryList} />);
    const loadComponents = await screen.findAllByTestId('id-skeleton-card');
    expect(loadComponents).not.toHaveLength(0);
  });
});
