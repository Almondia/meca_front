import MecaCard from '@/components/molcules/MecaCard';
import { renderQuery } from '../utils';
import { screen } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

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
        description={
          "<p>161616<img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682306625453.png'></p><p><br></p><p>&lt;img src=\"hello\"/&gt;</p><p><br></p><p><img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300937980.png'></p>"
        }
      />,
    );
    const titleText = screen.getByText('mytitle');
    const tagText = screen.getByText(/OX퀴즈/i);
    const thumbnail = screen.getByRole('img', { name: /mytitle-meca-thumbnail/i });
    expect(titleText).toBeInTheDocument();
    expect(tagText).toBeInTheDocument();
    expect(thumbnail).toBeInTheDocument();
  });

  it('내 카드라면 dot button이 식별된다.', () => {
    renderQuery(
      <MecaCard
        isMine={true}
        cardId={'cardId'}
        memberId={''}
        categoryId={'categoryId'}
        title={'title'}
        question={'question'}
        tagType={'ox'}
        description=""
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
        memberId={''}
        title={'title'}
        question={'["real question","111","222","333"]'}
        tagType={'select'}
        description=""
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
