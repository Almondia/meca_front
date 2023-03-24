import { renderQuery } from '../utils';
import { screen, fireEvent } from '@testing-library/react';
import MecaWrite from '@/components/organisms/MecaWrite';
import { CATEGORIES, MECAS } from '../__mocks__/msw/data';
import { useRouter } from 'next/router';

const EXISTS_CATEGORY = CATEGORIES[CATEGORIES.length - 1];

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MecaWrite', () => {
  it('카드 등록이면(카드 정보가 없다면) 최초에 OX퀴즈 등록 UI가 식별된다,', () => {
    renderQuery(<MecaWrite categoryId={EXISTS_CATEGORY.categoryId} />);
    const selectedTagToggle = screen.getByRole('button', {
      name: /OX퀴즈/i,
    });
    expect(selectedTagToggle.firstChild).toHaveStyleRule('opacity', '1');
    const notSelectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(notSelectedTagToggle.firstChild).toHaveStyleRule('opacity', '0.5');
    const oxQuizQuestionText = screen.getByText('OX퀴즈 문제를 설명하세요');
    expect(oxQuizQuestionText).toBeInTheDocument();
    const questionInput = screen.getByRole('textbox', {
      name: 'input-meca-ox-question',
    });
    expect(questionInput).toHaveValue('');
    const radioInput = screen.getByRole('radio', { name: 'O' });
    expect(radioInput).toBeChecked();
  });

  it('카드 등록 UI에서 특정 태그를 클릭하면 해당 등록 UI로 변경된다,', async () => {
    renderQuery(<MecaWrite categoryId={EXISTS_CATEGORY.categoryId} />);
    const selectedTagToggle = screen.getByRole('button', {
      name: /OX퀴즈/i,
    });
    expect(selectedTagToggle.firstChild).toHaveStyleRule('opacity', '1');
    const notSelectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(notSelectedTagToggle.firstChild).toHaveStyleRule('opacity', '0.5');
    fireEvent.click(notSelectedTagToggle);
    const changedTagToggle = await screen.findByRole('button', {
      name: /키워드/i,
    });
    expect(changedTagToggle.firstChild).toHaveStyleRule('opacity', '1');
    const questionInput = screen.getByRole('textbox', {
      name: 'input-meca-keyword-question',
    });
    expect(questionInput).toBeInTheDocument();
  });

  it('카드 수정(카드 정보가 있다면) 해당 카드에 맞는 수정 UI가 식별된다(기존의 태그 타입만 식별된다).', () => {
    const card = MECAS[0];
    renderQuery(<MecaWrite {...card} cardType="KEYWORD" />);
    const selectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(selectedTagToggle.firstChild).toHaveStyleRule('opacity', '1');
    // 이미 선택된 태그가 존재해 다른 태그타입을 선택할 수 없다.
    const notSelectedTagToggle = screen.queryByRole('button', {
      name: /OX퀴즈/i,
    });
    expect(notSelectedTagToggle).not.toBeInTheDocument();
    const questionInput = screen.getByRole('textbox', {
      name: 'input-meca-keyword-question',
    });
    expect(questionInput).toHaveValue(card.question);
  });

  it('카드를 정상적으로 등록하면 성공 toast가 식별된다,', async () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    renderQuery(<MecaWrite categoryId={EXISTS_CATEGORY.categoryId} />);
    const questionInput = screen.getByRole('textbox', {
      name: 'input-meca-ox-question',
    });
    expect(questionInput).toBeInTheDocument();
    fireEvent.change(questionInput, { target: { value: 'quizText' } });
    expect(questionInput).toHaveValue('quizText');
    const radioInput = screen.getByRole('radio', { name: 'X' });
    expect(radioInput).not.toBeChecked();
    fireEvent.click(radioInput);
    const checkedRadioInput = await screen.findByRole('radio', { name: 'X' });
    expect(checkedRadioInput).toBeChecked();
    const submitButton = screen.getByRole('button', {
      name: /작성 완료/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    const successToastText = await screen.findByText(/카드 등록 성공/i);
    expect(successToastText).toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledTimes(1);
  });

  it('카드 수정(카드 정보가 있다면)을 정상적으로 시도하면 수정 toast가 식별된다.', async () => {
    const card = MECAS[0];
    renderQuery(<MecaWrite {...card} cardType="KEYWORD" />);
    const selectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(selectedTagToggle.firstChild).toHaveStyleRule('opacity', '1');
    const questionInput = screen.getByRole('textbox', {
      name: 'input-meca-keyword-question',
    });
    expect(questionInput).toHaveValue(card.question);
    fireEvent.change(questionInput, { target: { value: 'ABCD' } });
    expect(questionInput).toHaveValue('ABCD');
    const submitButton = screen.getByRole('button', {
      name: /작성 완료/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    const successToastText = await screen.findByText(/카드 수정 성공/i);
    expect(successToastText).toBeInTheDocument();
  });

  // TODO: 등록 시 validation fail 테스트 추가하기
});
