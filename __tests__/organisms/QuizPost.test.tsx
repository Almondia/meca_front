import QuizPost, { QuizPostProps } from '@/components/organisms/QuizPost';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { render } from '../utils';

const OX_QUIZ: QuizPostProps = {
  question: '박동석의 MBTI는 ENFP이다.',
  answer: 'X',
  handleSucceed: {
    succeedHandler: jest.fn(),
    succeedText: '제출',
  },
  description:
    '<h4>nextjs에서 dynamic import로 quill editor 사용하기</h4><p>hello</p><p>맛이좋아<img alt="img-alt" src="/images/noimage.png"></p><p><strong class="ql-size-huge" style="color: rgb(230, 0, 0);"><em>돔돔ㄷ</em></strong></p>',
  isAnswerState: false,
  quizType: 'OX_QUIZ',
} as const;

const SELECT_QUIZ: QuizPostProps = {
  ...OX_QUIZ,
  question: '["다음 중 박동석의 MBTI로 적절한 것은?","ENFJ","INFP","ISTJ","ESTJ"]',
  answer: '2',
  quizType: 'MULTI_CHOICE',
} as const;

describe('QuizPost', () => {
  it('정답을 보지 않은 상태의 객관식 QuizPost UI가 식별된다.', () => {
    const props = SELECT_QUIZ;
    render(<QuizPost {...props} />);
    const questions = stringToJsonStringArrayConverter(props.question);
    questions.forEach((q) => {
      expect(screen.queryByText(q)).toBeInTheDocument();
    });
    const answerRadio = screen.getByLabelText(/INFP/i);
    const succeedButton = screen.getByRole('button', { name: props.handleSucceed.succeedText });
    const cancelButton = screen.getByRole('button', { name: '나가기' });
    expect(answerRadio).not.toBeChecked();
    expect(succeedButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(answerRadio);
    expect(answerRadio).toBeChecked();
    fireEvent.click(cancelButton);
    const modalText = screen.queryByText(/현재 페이지로 다시 돌아올 수 없습니다/i);
    expect(modalText).toBeInTheDocument();
  });

  it('정답을 본 상태의 OX QuizPost UI가 식별된다.', async () => {
    const props = OX_QUIZ;
    await waitFor(() => render(<QuizPost {...props} isAnswerState={true} />));
    const questionText = screen.queryByText(props.question);
    const editor = screen.queryByTestId('id-quizpost-editor');
    const editorSmapleImage = screen.queryByRole('img', { name: 'img-alt' });
    expect(questionText).toBeInTheDocument();
    expect(editor).toBeInTheDocument();
    expect(editorSmapleImage).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    radios.forEach((radio) => expect(radio).toBeDisabled());
    const answerCheckedElement = screen.getByTestId('id-oxquiz-post-answer-circle');
    expect(answerCheckedElement.parentElement).toHaveTextContent('Ax');
  });

  it('정답을 체크하고 정답 확인 상태로 변경되면 input이 초기화 되고 UI가 변경된다.', async () => {
    const props = OX_QUIZ;
    const QuizWrapper = () => {
      const [isAnswerState, setIsAnswerState] = useState(false);
      return (
        <div>
          <button onClick={() => setIsAnswerState((prev) => !prev)}>change</button>
          <QuizPost {...props} isAnswerState={isAnswerState} />
        </div>
      );
    };
    render(<QuizWrapper />);
    const xRadio = screen.getByRole('radio', { name: 'Ax' });
    expect(xRadio).not.toBeChecked();
    expect(screen.queryByTestId('id-quizpost-editor')).not.toBeInTheDocument();
    fireEvent.click(xRadio);
    expect(xRadio).toBeChecked();
    expect(screen.queryByText('Selected')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'change' }));
    await waitFor(() => {
      // input should be reset!
      expect(xRadio).not.toBeChecked();
      expect(xRadio).toBeDisabled();
      const answerCheckedElement = screen.getByTestId('id-oxquiz-post-answer-circle');
      expect(answerCheckedElement.parentElement).toHaveTextContent('Ax');
    });
    expect(screen.queryByTestId('id-quizpost-editor')).toBeInTheDocument();
  });
});
