import { render } from '../utils';
import { screen } from '@testing-library/react';
import MecaList from '@/components/organisms/MecaList';
import { InfiniteData } from '@tanstack/react-query';
import { MecaUserListResponse } from '@/apis/mecaApi';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockMecaList: InfiniteData<MecaUserListResponse> | undefined = {
  pageParams: [undefined],
  pages: [
    {
      contents: [
        {
          cardId: '1',
          title: 'title1',
          question: 'question1',
          answer: 'a1',
          cardType: 'OX_QUIZ',
          createdAt: 'c1',
          description: '',
          memberId: 'memberId',
          name: 'name',
          profile: '',
        },
        {
          cardId: '2',
          title: 'title2',
          question: 'question2',
          answer: 'a2',
          cardType: 'OX_QUIZ',
          createdAt: 'c2',
          description: '',
          memberId: 'memberId',
          name: 'name',
          profile: '',
        },
        {
          cardId: '3',
          title: 'title3',
          question: 'question3',
          answer: 'a3',
          cardType: 'OX_QUIZ',
          createdAt: 'c3',
          description: '',
          memberId: 'memberId',
          name: 'name',
          profile: '',
        },
      ],
      hasNext: '3',
      pageSize: 2,
      category: {
        categoryId: '1',
        title: 'category-title',
        memberId: 'memberId',
        shared: true,
        thumbnail: '',
      },
    },
  ],
};

describe('CategoryList', () => {
  it('메카 목록이 없다면 Empty 컴포넌트가 보여진다.', () => {
    render(<MecaList fetchNextPage={jest.fn()} />);
    const EmptyText = screen.getByText('목록이 존재하지 않습니다');
    expect(EmptyText).toBeInTheDocument();
  });

  it('카테고리 목록이 존재한다면 카테고리 목록이 보여진다.', () => {
    const mockFetchNextPage = jest.fn();
    render(<MecaList fetchNextPage={mockFetchNextPage} mecaList={mockMecaList} />);
    const pageListText = screen.getAllByText(/(^title)/);
    expect(pageListText.length).toBe(3);
    expect(mockFetchNextPage).not.toHaveBeenCalled();
    // 다음 데이터가 없기 때문에 로딩 컴포넌트는 보여지지 않아야 한다.
    const loadComponent = screen.queryByTestId('id-scroll-load-spinner');
    expect(loadComponent).not.toBeInTheDocument();
  });

  it('다음 페이지 데이터가 있다면 다음 페이지를 가져오기를 기다리는 컴포넌트가 보여진다.', async () => {
    const mockFetchNextPage = jest.fn();
    render(<MecaList fetchNextPage={mockFetchNextPage} mecaList={mockMecaList} hasNextPage={true} />);
    const loadComponent = screen.queryByTestId('id-scroll-load-spinner');
    expect(loadComponent).toBeInTheDocument();
  });
});
