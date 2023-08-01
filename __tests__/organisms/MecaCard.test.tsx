import MecaCard from '@/components/organisms/MecaCard';
import { renderQuery } from '../utils';
import { fireEvent, screen } from '@testing-library/react';

describe('MecaCard', () => {
  it('주어지는 데이터에 대한 적절한 Card가 보여진다', () => {
    renderQuery(
      <MecaCard
        cardId={'cardId'}
        memberId={''}
        categoryId={'categoryId'}
        title={'mytitle'}
        question={'question'}
        tagType={'ox'}
        thumbnail={'/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682306625453.png'}
      />,
    );
    const titleText = screen.getByText('mytitle');
    const tagText = screen.getByText(/OX퀴즈/i);
    const thumbnail = screen.getByRole('img', { name: /mytitle-meca-thumbnail/i });
    expect(titleText).toBeInTheDocument();
    expect(tagText).toBeInTheDocument();
    expect(thumbnail).toBeInTheDocument();
  });

  it('내 카드라면 dot button이 식별된다.', async () => {
    renderQuery(
      <MecaCard
        isMine={true}
        cardId={'cardId'}
        memberId={''}
        categoryId={'categoryId'}
        title={'title'}
        question={'question'}
        tagType={'ox'}
      />,
    );
    const dotButton = screen.getByRole('button', {
      name: /verticaldot/i,
    });
    expect(dotButton).toBeInTheDocument();
    fireEvent.click(dotButton);
    const modifyLink = await screen.findByRole('link', { name: '수정하기' });
    expect(modifyLink).toBeInTheDocument();
  });

  it('객관식 카드는 문항이 아닌 문제만 식별된다.', () => {
    renderQuery(
      <MecaCard
        isMine={true}
        cardId={'cardId'}
        categoryId={'categoryId'}
        memberId={''}
        title={'title'}
        question={'["real question","111","222","333"]'}
        tagType={'select'}
      />,
    );
    const tagText = screen.getByText(/객관식/i);
    expect(tagText).toBeInTheDocument();
    const wholeQuestionText = screen.queryByText('["real question","111","222","333"]');
    expect(wholeQuestionText).not.toBeInTheDocument();
    const questionText = screen.getByText('real question');
    expect(questionText).toBeInTheDocument();
  });

  it('통계 정보가 있다면 식별된다.', () => {
    renderQuery(
      <MecaCard
        isMine={true}
        cardId={'cardId'}
        categoryId={'categoryId'}
        memberId={''}
        title={'title'}
        question={'박동석의 MBTI는 무엇인가'}
        tagType={'keyword'}
        scoreAvg={24.46}
        tryCount={14}
      />,
    );
    const tagText = screen.getByText(/키워드/i);
    expect(tagText).toBeInTheDocument();
    const questionText = screen.getByText('박동석의 MBTI는 무엇인가');
    const countText = screen.getByTestId('id-meca-count');
    const scoreText = screen.getByTestId('id-meca-score');
    expect(questionText).toBeInTheDocument();
    expect(countText).toHaveTextContent('14회 풀이');
    expect(scoreText).toHaveTextContent('평균 24점');
  });
});
