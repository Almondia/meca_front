import { render } from '@/__tests__/utils';
import { screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import CategoryCard from '@/components/category/organisms/CategoryCard';

describe('CategoryCard', () => {
  describe('CardContainer', () => {
    it('Category Card가 UI에 보여진다.', () => {
      render(
        <CategoryCard categoryId="c01" title="title1" thumbnail="" memberId="mid" likeCount={5}>
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
      render(
        <CategoryCard categoryId="c01" title="title1" thumbnail="" memberId="mid" likeCount={5}>
          card
        </CategoryCard>,
      );
      const cardTitle = screen.getByText('title1');
      expect(cardTitle).toBeInTheDocument();
      fireEvent.click(cardTitle);
      expect(mockRouter.pathname).toEqual('/categories/mid-c01');
    });

    it('Category Card Thumbnail을 클릭하면 해당 카테고리의 카드 목록 페이지로 이동한다.', () => {
      render(
        <CategoryCard categoryId="c01" title="title1" thumbnail="" memberId="mid" likeCount={5}>
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

  describe('CardBody', () => {
    it('개인 카테고리 카드 UI가 식별된다.', async () => {
      render(
        <CategoryCard.Private
          title="title"
          categoryId="c01"
          memberId="m1"
          thumbnail=""
          shared
          createdAt="2023"
          totalCount={5}
          solveCount={4}
          scoreAvg={50}
          likeCount={5}
        />,
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
      expect(updateLink).toBeInTheDocument();
    });

    it('공유되지 않은 개인 카테고리 카드 UI가 식별된다.', () => {
      render(
        <CategoryCard.Private
          title="title"
          categoryId="c01"
          memberId="m1"
          thumbnail=""
          shared={false}
          createdAt="2023"
          totalCount={5}
          solveCount={4}
          likeCount={5}
          scoreAvg={45}
        />,
      );
      const answerRateLabel = screen.getByText('정답률');
      const answerRateText = screen.getByText('45.0%');
      const privateTag = screen.queryByTestId('id-private-tag');
      expect(answerRateLabel).toBeInTheDocument();
      expect(answerRateText).toBeInTheDocument();
      expect(privateTag).toBeInTheDocument();
    });

    it('다른사람의 카테고리 카드 UI가 식별된다.', () => {
      render(<CategoryCard.Shared memberId="memberId" name="사람" profile="" likeCount={5} />);
      const profileImage = screen.getByRole('img', { name: '사람-avatar' });
      const username = screen.getByText('사람');
      expect(profileImage).toBeInTheDocument();
      expect((profileImage as HTMLImageElement).src).toContain('noprofile.png');
      expect(username).toBeInTheDocument();
    });
  });
});
