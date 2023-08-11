import { render, renderQuery } from '../../utils';
import { screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import CategoryCard from '@/components/category/organisms/CategoryCard';
import { MOCK_CATEGORY_CONTENT } from '@/mock/data';

const mockedCategoryContent = MOCK_CATEGORY_CONTENT;

describe('CategoryCard', () => {
  it('Category Card가 UI에 보여진다.', () => {
    render(<CategoryCard {...mockedCategoryContent} />);
    const cardTitle = screen.queryByText('title1');
    const thumbnail = screen.getByRole('img', {
      name: /title1-category-thumbnail/i,
    });
    const likeIcon = screen.getByText('Like');
    expect(cardTitle).toBeInTheDocument();
    expect(thumbnail).toBeInTheDocument();
    expect(likeIcon).toBeInTheDocument();
  });

  it('Category Card 타이틀을 클릭하면 해당 카테고리의 카드 목록 페이지로 이동한다.', () => {
    render(<CategoryCard {...mockedCategoryContent} />);
    const { memberId, categoryId } = mockedCategoryContent.category;
    const cardTitle = screen.getByText('title1');
    expect(cardTitle).toBeInTheDocument();
    fireEvent.click(cardTitle);
    expect(mockRouter.pathname).toEqual(`/categories/${memberId}-${categoryId}`);
  });

  it('Category Card Thumbnail을 클릭하면 해당 카테고리의 카드 목록 페이지로 이동한다.', () => {
    render(<CategoryCard {...mockedCategoryContent} />);
    const { memberId, categoryId } = mockedCategoryContent.category;
    const thumbnail = screen.getByRole('img', {
      name: /title1-category-thumbnail/i,
    });
    fireEvent.click(thumbnail);
    expect(mockRouter.pathname).toEqual(`/categories/${memberId}-${categoryId}`);
  });

  it('본인의 카테고리 카드 UI가 식별된다.', async () => {
    renderQuery(
      <CategoryCard {...mockedCategoryContent} isMine statistics={{ scoreAvg: 50, solveCount: 4, totalCount: 5 }} />,
    );
    const quizCountLabel = screen.getByText('문제개수');
    const quizCountText = screen.getByText('4 / 5');
    const privateTag = screen.queryByTestId('id-private-tag');
    expect(quizCountLabel).toBeInTheDocument();
    expect(quizCountText).toBeInTheDocument();
    expect(privateTag).not.toBeInTheDocument();
    const dotIconButton = screen.getByRole('button', { name: /verticaldot/i });
    fireEvent.click(dotIconButton);
    const updateLink = await screen.findByRole('link', { name: '수정하기' });
    const deleteLink = screen.getByRole('link', { name: '삭제하기' });
    expect(updateLink).toBeInTheDocument();
    expect(deleteLink).toBeInTheDocument();
  });

  it('공유 되지 않은 개인 카테고리일 경우 비공개 UI가 식별된다.', () => {
    const notSharedCategoryContent = {
      ...mockedCategoryContent,
      category: { ...mockedCategoryContent.category, shared: false },
    };
    renderQuery(<CategoryCard {...notSharedCategoryContent} isMine />);
    const privateTag = screen.queryByTestId('id-private-tag');
    expect(privateTag).toBeInTheDocument();
  });

  it('다른 사람의 카테고리 카드 UI가 식별된다.', () => {
    const memberName = mockedCategoryContent.member?.name;
    render(<CategoryCard {...mockedCategoryContent} />);
    const profileImage = screen.getByRole('img', { name: `${memberName}-avatar` });
    const username = screen.getByText(memberName as string);
    expect(profileImage).toBeInTheDocument();
    expect((profileImage as HTMLImageElement).src).toContain('noprofile.png');
    expect(username).toBeInTheDocument();
  });
});
