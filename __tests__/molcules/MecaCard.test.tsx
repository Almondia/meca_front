import MecaCard from '@/components/molcules/MecaCard';
import { renderQuery } from '../utils';
import { screen } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MecaCard', () => {
  it('주어지는 데이터에 대한 적절한 Card가 보여진다', () => {
    renderQuery(
      <MecaCard cardId={'cardId'} categoryId={'categoryId'} title={'title'} question={'question'} tagType={'ox'} />,
    );
    const titleText = screen.getByText('title');
    const tagText = screen.getByText(/OX퀴즈/i);
    expect(titleText).toBeInTheDocument();
    expect(tagText).toBeInTheDocument();
  });

  it('내 카드라면 dot button이 식별된다.', () => {
    renderQuery(
      <MecaCard
        isMine={true}
        cardId={'cardId'}
        categoryId={'categoryId'}
        title={'title'}
        question={'question'}
        tagType={'ox'}
      />,
    );
    const dotButton = screen.getByRole('button', {
      name: /icon/i,
    });
    expect(dotButton).toBeInTheDocument();
  });

  it('객관식 카드는 문항이 아닌 문제만 식별된다.', () => {
    renderQuery(
      <MecaCard
        isMine={true}
        cardId={'cardId'}
        categoryId={'categoryId'}
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
});
