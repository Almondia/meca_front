import { renderQuery } from '../../utils';
import { screen, fireEvent } from '@testing-library/react';

import MecaWriteForm, { MecaWriteFormProps } from '@/components/meca/organisms/MecaWrite/MecaWriteForm';

const mockDivRef = {
  current: document.createElement('div'),
};

describe('MecaWriteForm', () => {
  it('SelectForm 수정하기 UI가 식별된다.', () => {
    const wrtieProps: MecaWriteFormProps = {
      cardId: 'cid01',
      categoryId: 'catid01',
      question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
      answer: '1',
      cardType: 'MULTI_CHOICE',
      createdAt: '2024',
      description: '나는 INFP이고 INFP가 나이다.',
      mecaTagType: 'select',
      title: '박동석 MBTI',
      titleRef: mockDivRef,
    };
    renderQuery(<MecaWriteForm {...wrtieProps} />);
    const selectLabel = screen.queryByText('문항 수를 선택하세요');
    const exam3Label = screen.getByText('보기 (3)');
    const questionTitleInput = screen.getByPlaceholderText('객관식 문제를 설명하세요');
    const questionExam3Input = screen.getByRole('textbox', { name: 'input-meca-case-3' });
    const answerRadio = screen.getByRole('radio', { name: '1' });
    expect(selectLabel).toBeInTheDocument();
    expect(exam3Label).toBeInTheDocument();
    expect(questionTitleInput).toHaveValue('다음 중 박동석의 MBTI로 적절한 것은?');
    expect(questionExam3Input).toHaveValue('ISTJ');
    expect(answerRadio).toBeChecked();
  });

  it('SelectForm 등록하기 UI가 식별된다.', () => {
    const wrtieProps: MecaWriteFormProps = {
      categoryId: 'catid01',
      titleRef: mockDivRef,
      mecaTagType: 'select',
    };
    renderQuery(<MecaWriteForm {...wrtieProps} />);
    const selectLabel = screen.queryByText('문항 수를 선택하세요');
    const exam3Label = screen.getByText('보기 (3)');
    const questionTitleInput = screen.getByPlaceholderText('객관식 문제를 설명하세요');
    const answerRadio = screen.getByRole('radio', { name: '1' });
    expect(selectLabel).toBeInTheDocument();
    expect(exam3Label).toBeInTheDocument();
    expect(questionTitleInput).toHaveValue('');
    expect(answerRadio).not.toBeDisabled();
  });

  /**
   * 보기3개 => (+)버튼 2번 클릭 => 보기 5개 => 보기 5 선택 => (-)버튼 1번 클릭 => 보기 4 선택됨
   */
  it('SelectForm 등록하기 문항 추가/제거 시 UI가 변경된다.', () => {
    const wrtieProps: MecaWriteFormProps = {
      categoryId: 'catid01',
      titleRef: mockDivRef,
      mecaTagType: 'select',
    };
    renderQuery(<MecaWriteForm {...wrtieProps} />);
    const exam4Label = screen.queryByText('보기 (4)');
    const plusButton = screen.getByRole('button', { name: '+' });
    const minusButton = screen.getByRole('button', { name: '-' });
    expect(exam4Label).not.toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    const exam5Label = screen.queryByText('보기 (5)');
    expect(exam5Label).toBeInTheDocument();
    const answerRadio5 = screen.getByRole('radio', { name: '5' });
    expect(answerRadio5).not.toBeChecked();
    fireEvent.click(answerRadio5);
    expect(answerRadio5).toBeChecked();
    fireEvent.click(minusButton);
    expect(exam5Label).not.toBeInTheDocument();
    const answerRadio4 = screen.getByRole('radio', { name: '4' });
    expect(answerRadio4).toBeChecked();
  });
});
