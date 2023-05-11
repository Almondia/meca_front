import CategoryList from '@/components/organisms/CategoryList';
import { render } from '../utils';
import { screen, waitFor } from '@testing-library/react';

const mockCategoryList = {
  pageParams: [undefined],
  pages: [
    {
      contents: [
        {
          categoryId: '1',
          title: 'title1',
          thumbnail: '',
          shared: false,
        },
        {
          categoryId: '2',
          title: 'title2',
          thumbnail: '',
          shared: false,
        },
        {
          categoryId: '3',
          title: 'title3',
          thumbnail: '',
          shared: false,
        },
        {
          categoryId: '4',
          title: 'title4',
          thumbnail: '',
          shared: false,
        },
        {
          categoryId: '5',
          title: 'title5',
          thumbnail: '',
          shared: false,
        },
        {
          categoryId: '6',
          title: 'title6',
          thumbnail: '',
          shared: false,
        },
      ],
      pageNumber: 0,
      totalPages: 1,
    },
  ],
} as any;

describe('CategoryList', () => {
  it('카테고리 목록이 없다면 Empty 컴포넌트가 보여진다.', () => {
    render(<CategoryList fetchNextPage={jest.fn()} />);
    const EmptyText = screen.getByText('목록이 존재하지 않습니다');
    expect(EmptyText).toBeInTheDocument();
  });

  it('카테고리 목록이 존재한다면 카테고리 목록이 보여진다.', async () => {
    const mockFetchNextPage = jest.fn();
    render(<CategoryList fetchNextPage={mockFetchNextPage} categoryList={mockCategoryList} />);
    const pageListText = screen.getAllByRole('article');
    expect(pageListText.length).toBe(6);
    expect(mockFetchNextPage).not.toHaveBeenCalled();
    // 다음 데이터가 없기 때문에 로딩 컴포넌트는 보여지지 않아야 한다.
    await waitFor(() => expect(screen.queryByTestId('id-scroll-load-spinner')).not.toBeInTheDocument());
  });

  it('다음 페이지 데이터가 있다면 다음 페이지를 가져오기를 기다리는 컴포넌트가 보여진다.', async () => {
    const mockFetchNextPage = jest.fn();
    render(<CategoryList hasNextPage={true} fetchNextPage={mockFetchNextPage} categoryList={mockCategoryList} />);
    const loadComponent = await screen.findByTestId('id-scroll-load-spinner');
    expect(loadComponent).toBeInTheDocument();
  });
});
