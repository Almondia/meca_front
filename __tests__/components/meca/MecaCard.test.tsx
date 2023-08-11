import { renderQuery } from '../../utils';
import { fireEvent, screen } from '@testing-library/react';

import MecaCard from '@/components/meca/organisms/MecaCard';
import { MOCK_MECA_CONTENT } from '@/mock/data';
import { Meca } from '@/types/domain/meca';

describe('MecaCard', () => {
  it('주어지는 데이터에 대한 적절한 Card가 보여진다', () => {
    const card: Partial<Meca> = {
      cardId: 'cardId',
      memberId: 'memberId',
      categoryId: 'categoryId',
      title: 'mytitle',
      question: 'hello question',
      cardType: 'OX_QUIZ',
      thumbnail: '/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682306625453.png',
    };
    renderQuery(<MecaCard {...MOCK_MECA_CONTENT} card={{ ...MOCK_MECA_CONTENT.card, ...card }} />);
    const titleText = screen.getByText('mytitle');
    const tagText = screen.getByText(/OX퀴즈/i);
    const thumbnail = screen.getByRole('img', { name: /mytitle-meca-thumbnail/i });
    const questionText = screen.getByText('hello question');
    expect(titleText).toBeInTheDocument();
    expect(tagText).toBeInTheDocument();
    expect(thumbnail).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    const { scoreAvg, tryCount } = MOCK_MECA_CONTENT.statistics;
    const countText = screen.getByTestId('id-meca-count');
    const scoreText = screen.getByTestId('id-meca-score');
    expect(countText).toHaveTextContent(`${tryCount}회 풀이`);
    expect(scoreText).toHaveTextContent(`평균 ${scoreAvg.toFixed(0)}점`);
  });

  it('본인의 카드라면 dot button이 식별된다.', async () => {
    renderQuery(<MecaCard {...MOCK_MECA_CONTENT} isMine />);
    const dotButton = screen.getByRole('button', {
      name: /verticaldot/i,
    });
    expect(dotButton).toBeInTheDocument();
    fireEvent.click(dotButton);
    const updateLink = await screen.findByRole('link', { name: '수정하기' });
    const deleteLink = screen.getByRole('link', { name: '삭제하기' });
    expect(updateLink).toBeInTheDocument();
    expect(deleteLink).toBeInTheDocument();
  });

  it('객관식 카드는 문항이 아닌 문제만 식별된다.', () => {
    const card: Partial<Meca> = {
      cardId: 'cardId',
      memberId: 'memberId',
      categoryId: 'categoryId',
      title: 'mytitle',
      question: '["real question","111","222","333"]',
      cardType: 'MULTI_CHOICE',
      thumbnail: '/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682306625453.png',
    };
    renderQuery(<MecaCard {...MOCK_MECA_CONTENT} card={{ ...MOCK_MECA_CONTENT.card, ...card }} />);
    const tagText = screen.getByText(/객관식/i);
    expect(tagText).toBeInTheDocument();
    const wholeQuestionText = screen.queryByText('["real question","111","222","333"]');
    expect(wholeQuestionText).not.toBeInTheDocument();
    const questionText = screen.getByText('real question');
    expect(questionText).toBeInTheDocument();
  });
});
