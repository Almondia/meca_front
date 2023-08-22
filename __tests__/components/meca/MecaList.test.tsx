import { render } from '../../utils';
import { screen, waitFor } from '@testing-library/react';
import { MOCK_MEMBER, MOCK_MEMBER_ID } from '@/mock/data';

import type { MecaListPaginationResponse } from '@/types/domain/meca';
import MecaList from '@/components/meca/organisms/MecaList';

const mockMecaList: MecaListPaginationResponse = {
  contents: [
    {
      card: {
        cardId: '1',
        title: 'title1',
        question: 'question1',
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
    createdAt: '',
  },
  member: MOCK_MEMBER,
  categoryLikeCount: 0,
};

describe('MecaList', () => {
  it('Card 목록이 없다면 Empty 컴포넌트가 보여진다.', () => {
    render(<MecaList fetchNextPage={jest.fn()} isEmpty={true} mecaList={mockMecaList} />);
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
    const loadComponent = await screen.findAllByTestId('id-skeleton-card');
    expect(loadComponent).not.toHaveLength(0);
  });
});
