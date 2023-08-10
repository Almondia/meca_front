import { render } from '../../utils';
import { screen } from '@testing-library/react';

import MecaPost from '@/components/meca/organisms/MecaPost';
import { ComponentProps } from 'react';

const selectionMecaPost: ComponentProps<typeof MecaPost> = {
  cardType: 'MULTI_CHOICE',
  question: '["다음 중 박동석의 MBTI로 적절한 것은?","ENFJ","INFP","ISTJ","ESTJ"]',
  answer: '2',
  description: '설명',
  createdAt: '2023-03-11T12:56:22.954816',
};

const oxMecaPost: ComponentProps<typeof MecaPost> = {
  cardType: 'OX_QUIZ',
  question: '박동석의 MBTI는 ENFJ이다.',
  answer: 'x',
  description: '설명',
  createdAt: '2023-03-11T12:56:22.954816',
};

describe('MecaPost', () => {
  it('객관식 타입의 문제에 대해 객관식 UI가 식별된다.', async () => {
    render(<MecaPost {...selectionMecaPost} />);
    const cardTypeText = await screen.findByText('객관식');
    const questionHeading = screen.getByRole('heading', { name: /question/i });
    const answerHeadings = screen.getAllByRole('heading', { name: /Q[0-9]+/i });
    const descriptionHeading = screen.getByRole('heading', { name: /description/i });
    expect(cardTypeText).toBeInTheDocument();
    expect(questionHeading.parentElement).toHaveTextContent('다음 중 박동석의 MBTI로 적절한 것은?');
    expect(answerHeadings).toHaveLength(4);
    expect(answerHeadings[1].parentElement).toHaveTextContent('INFP');
    expect(answerHeadings[1].parentElement?.childNodes[1]).toHaveStyleRule('color', 'var(--color-success)');
    expect(descriptionHeading.parentElement).toHaveTextContent('설명');
  });

  it('OX 타입의 문제에 대해 OX UI가 식별된다.', async () => {
    render(<MecaPost {...oxMecaPost} />);
    const cardTypeText = await screen.findByText('OX퀴즈');
    const questionHeading = screen.getByRole('heading', { name: /question/i });
    const answerHeading = screen.getByRole('heading', { name: /answer/i });
    expect(questionHeading.parentElement).toHaveTextContent('박동석의 MBTI는 ENFJ이다.');
    expect(answerHeading.parentElement).toHaveTextContent('Ax');
    expect(cardTypeText).toBeInTheDocument();
  });
});
