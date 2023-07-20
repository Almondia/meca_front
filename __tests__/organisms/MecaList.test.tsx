import { render } from '../utils';
import { screen, waitFor } from '@testing-library/react';
import MecaList from '@/components/organisms/MecaList';
import { InfiniteData } from '@tanstack/react-query';
import { MecaListResponse } from '@/apis/mecaApi';
import { MOCK_MEMBER, MOCK_MEMBER_ID } from '../__mocks__/msw/data';

const mockMecaList: InfiniteData<MecaListResponse> | undefined = {
  pageParams: [undefined],
  pages: [
    {
      contents: [
        {
          card: {
            cardId: '1',
            title: 'title1',
            question: 'question1',
            answer: 'a1',
            cardType: 'OX_QUIZ',
            createdAt: 'c1',
            description: '',
            memberId: MOCK_MEMBER_ID,
            categoryId: '1',
          },
          statistics: {
            scoreAvg: 0,
            tryCount: 0,
          },
        },
        {
          card: {
            cardId: '2',
            title: 'title2',
            question: 'question2',
            answer: 'a2',
            cardType: 'OX_QUIZ',
            createdAt: 'c2',
            description: '',
            memberId: MOCK_MEMBER_ID,
            categoryId: '1',
          },
          statistics: {
            scoreAvg: 0,
            tryCount: 0,
          },
        },
        {
          card: {
            cardId: '3',
            title: 'title3',
            question: 'question3',
            answer: 'a3',
            cardType: 'OX_QUIZ',
            createdAt: 'c3',
            description: '',
            memberId: MOCK_MEMBER_ID,
            categoryId: '1',
          },
          statistics: {
            scoreAvg: 0,
            tryCount: 0,
          },
        },
      ],
      hasNext: '3',
      pageSize: 2,
      category: {
        categoryId: '1',
        title: 'category-title',
        memberId: MOCK_MEMBER_ID,
        shared: true,
        thumbnail: '',
        likeCount: 0,
      },
      member: MOCK_MEMBER,
      categoryLikeCount: 0,
    },
  ],
};

describe('CategoryList', () => {
  it('메카 목록이 없다면 Empty 컴포넌트가 보여진다.', () => {
    render(<MecaList fetchNextPage={jest.fn()} />);
    const EmptyText = screen.getByText('목록이 존재하지 않습니다');
    expect(EmptyText).toBeInTheDocument();
  });

  it('카테고리 목록이 존재한다면 카테고리 목록이 보여진다.', async () => {
    const mockFetchNextPage = jest.fn();
    render(<MecaList fetchNextPage={mockFetchNextPage} mecaList={mockMecaList} />);
    const pageListText = screen.getAllByText(/(^title)/);
    expect(pageListText.length).toBe(3);
    expect(mockFetchNextPage).not.toHaveBeenCalled();
    // 다음 데이터가 없기 때문에 로딩 컴포넌트는 보여지지 않아야 한다.
    await waitFor(() => expect(screen.queryByTestId('id-scroll-load-spinner')).not.toBeInTheDocument());
  });

  it('다음 페이지 데이터가 있다면 다음 페이지를 가져오기를 기다리는 컴포넌트가 보여진다.', async () => {
    const mockFetchNextPage = jest.fn();
    render(<MecaList fetchNextPage={mockFetchNextPage} mecaList={mockMecaList} hasNextPage={true} />);
    const loadComponent = await screen.findByTestId('id-scroll-load-spinner');
    expect(loadComponent).toBeInTheDocument();
  });
});
