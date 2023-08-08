import { renderQuery } from '../../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MOCK_CATEGORIES, MOCK_MECAS } from '@/mock/data';
import { useRouter } from 'next/router';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedGetMecaCountApi, mockedPostMecaApi, mockedPostRevalidateApi, mockedPutMecaUpdateApi } from '@/mock/api';

import MecaWrite from '@/components/meca/organisms/MecaWrite';

const EXISTS_CATEGORY = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MecaWrite', () => {
  beforeEach(() => {
    implementServer([
      restHandler(mockedPostMecaApi),
      restHandler(mockedPutMecaUpdateApi),
      restHandler(() => mockedGetMecaCountApi(1)),
      restHandler(() => mockedPostRevalidateApi(true)),
    ]);
  });

  it('카드 등록이면(카드 정보가 없다면) 최초에 OX퀴즈 등록 UI가 식별된다,', async () => {
    await waitFor(() => renderQuery(<MecaWrite categoryId={EXISTS_CATEGORY.categoryId} />));
    const selectedTagToggle = screen.getByRole('button', {
      name: /OX퀴즈/i,
    });
    expect(selectedTagToggle).toHaveStyleRule('opacity', '1');
    const notSelectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(notSelectedTagToggle).toHaveStyleRule('opacity', '0.3');
    const oxQuizQuestionText = screen.getByText('OX퀴즈 문제를 설명하세요');
    expect(oxQuizQuestionText).toBeInTheDocument();
    const questionInput = screen.getByPlaceholderText('OX 문제를 설명하세요');
    expect(questionInput).toHaveValue('');
    const radioInput = screen.getByRole('radio', { name: 'O' });
    expect(radioInput).toBeChecked();
  });

  it('카드 등록 UI에서 특정 태그를 클릭하면 해당 등록 UI로 변경된다,', async () => {
    await waitFor(() => renderQuery(<MecaWrite categoryId={EXISTS_CATEGORY.categoryId} />));
    const notSelectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    fireEvent.click(notSelectedTagToggle);
    const questionInput = screen.getByPlaceholderText('키워드 문제를 설명하세요');
    expect(questionInput).toBeInTheDocument();
  });

  it('카드 수정(카드 정보가 있다면) 해당 카드에 맞는 수정 UI가 식별된다(기존의 태그 타입만 식별된다).', async () => {
    const card = MOCK_MECAS[0];
    await waitFor(() => renderQuery(<MecaWrite {...card} cardType="KEYWORD" />));
    const selectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(selectedTagToggle).toHaveStyleRule('opacity', '1');
    // 이미 선택된 태그가 존재해 다른 태그타입을 선택할 수 없다.
    const notSelectedTagToggle = screen.queryByRole('button', {
      name: /OX퀴즈/i,
    });
    expect(selectedTagToggle).toHaveStyleRule('opacity', '1');
    const questionInput = screen.getByPlaceholderText('키워드 문제를 설명하세요');
    expect(questionInput).toHaveValue(card.question);
  });

  it('카드를 정상적으로 등록하면 성공 toast가 식별된다,', async () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
    renderQuery(<MecaWrite categoryId={EXISTS_CATEGORY.categoryId} />);
    const questionInput = screen.getByPlaceholderText('OX 문제를 설명하세요');
    expect(questionInput).toBeInTheDocument();
    fireEvent.change(questionInput, { target: { value: 'quizText' } });
    expect(questionInput).toHaveValue('quizText');
    const radioInput = screen.getByRole('radio', { name: 'X' });
    expect(radioInput).not.toBeChecked();
    fireEvent.click(radioInput);
    const checkedRadioInput = await screen.findByRole('radio', { name: 'X' });
    expect(checkedRadioInput).toBeChecked();
    const titleInput = screen.getByRole('textbox', { name: 'input-meca-title' });
    fireEvent.change(titleInput, { target: { value: 'title' } });
    const submitButton = screen.getByRole('button', {
      name: /작성 완료/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    const successToastText = await screen.findByText(/카드 등록 성공/i);
    expect(successToastText).toBeInTheDocument();
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('카드 수정(카드 정보가 있다면)을 정상적으로 시도하면 수정 toast가 식별된다.', async () => {
    const card = MOCK_MECAS[0];
    renderQuery(<MecaWrite {...card} cardType="KEYWORD" />);
    const selectedTagToggle = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(selectedTagToggle.firstChild).toBeInTheDocument();
    const questionInput = screen.getByPlaceholderText('키워드 문제를 설명하세요');
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

  it('항목을 입력하지 않고 등록을 시도하면 등록되지 않고 invalid text가 식별된다.', async () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
    renderQuery(<MecaWrite categoryId={EXISTS_CATEGORY.categoryId} />);
    const submitButton = screen.getByRole('button', {
      name: /작성 완료/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.queryByText(/카드 등록 성공/i)).not.toBeInTheDocument());
    const invalidTitle = screen.getByText('제목을 2글자 이상 40글자이하로 작성해주세요');
    expect(invalidTitle).toBeInTheDocument();

    const titleInput = screen.getByRole('textbox', { name: 'input-meca-title' });
    fireEvent.change(titleInput, { target: { value: 'title' } });
    fireEvent.click(submitButton);
    const invalidQuestion = screen.getByText('문제를 입력했는지 확인해주세요!');
    expect(invalidQuestion).toBeInTheDocument();
  });
});
