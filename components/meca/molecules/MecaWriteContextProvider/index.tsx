/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';

import useIncrease from '@/hooks/useCount';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import { MecaTagType, MecaType } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { Constraints, ContraintsResultType } from '@/utils/validation';

type InputContextProps = Omit<ReturnType<typeof useInput>, 'changed' | 'inputReset'>;
type NumberIncreaseProps = Omit<ReturnType<typeof useIncrease>, 'resetNumber'>;
interface MecaWriteContextProviderProps {
  children: React.ReactNode;
  meca: Partial<MecaType> & { cardType: MecaTagType; categoryId: string };
}
interface MecaValidatedInputsProps extends Omit<MecaType, 'cardId' | 'createdAt'> {
  cardId?: string;
}

const defaultUseInput = {
  input: '',
  onInputChange: () => {},
  setInput: () => {},
  isValid: false,
  message: '',
};
const MecaTitleInputContext = createContext<InputContextProps & ContraintsResultType>(defaultUseInput);
const MecaQuestionInputContext = createContext<InputContextProps & ContraintsResultType>(defaultUseInput);
const MecaAnswerInputContext = createContext<InputContextProps & ContraintsResultType>(defaultUseInput);
const MecaDescriptionInputContext = createContext<InputContextProps>(defaultUseInput);
const SelectCaseNumberContext = createContext<NumberIncreaseProps>({ number: 3, increaseNumber: () => {} });
const MecaValidatedInputs = createContext<() => MecaValidatedInputsProps | null>(() => null);

export const MecaWriteContextProvider = ({ children, meca }: MecaWriteContextProviderProps) => {
  const { cardId, categoryId, title, question, answer, description, cardType } = meca;
  const titleInput = useInput(title ?? '');
  const questionInput = useInput(question ?? '');
  const answerInput = useInput(answer ?? '');
  const descriptionInput = useInput(description ?? '');
  const caseNumberIncrease = useIncrease(
    question && cardType === 'MULTI_CHOICE' ? JSON.parse(question).length - 1 : 3,
    3,
    5,
  );
  const { inputsValidState, validateAll, resetValidateState } = useInputValidation(3);
  const titleInputContextProps = useMemo(
    () => ({ ...titleInput, ...inputsValidState[0] }),
    [titleInput.input, inputsValidState[0]],
  );
  const questionInputContextProps = useMemo(
    () => ({ ...questionInput, ...inputsValidState[1] }),
    [questionInput.input, inputsValidState[1]],
  );
  const answerInputContextProps = useMemo(
    () => ({ ...answerInput, ...inputsValidState[2] }),
    [answerInput.input, inputsValidState[2]],
  );
  const descriptionInputContextProps = useMemo(() => descriptionInput, [descriptionInput.input]);
  const caseNumberIncreaseContextProps = useMemo(() => caseNumberIncrease, [caseNumberIncrease.number]);

  useEffect(() => {
    resetValidateState();
    if (!cardId && questionInput.input) {
      questionInput.setInput((prev) => (cardType === 'MULTI_CHOICE' ? JSON.stringify([prev]) : prev));
    }
    return () => {
      if (cardId) {
        return;
      }
      questionInput.setInput(
        (prev) =>
          getQuestionAnswerByCardType({
            question: prev,
            cardType,
          }).question,
      );
      answerInput.setInput(answer ?? '');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardType]);

  const getAllValidatedInputsContextProps = useCallback(() => {
    const { hasInvalid } = validateAll([
      () => Constraints.cardTitle(titleInput.input),
      () => Constraints.cardQuestion(questionInput.input, cardType),
      () => Constraints.cardAnswer(answerInput.input, cardType),
    ]);
    if (hasInvalid) {
      return null;
    }
    return {
      cardId,
      categoryId,
      title: titleInput.input,
      question: questionInput.input,
      answer: answerInput.input,
      cardType,
      description: descriptionInput.input,
    };
  }, [titleInput.input, questionInput.input, answerInput.input, cardType]);

  return (
    <MecaTitleInputContext.Provider value={titleInputContextProps}>
      <MecaQuestionInputContext.Provider value={questionInputContextProps}>
        <MecaAnswerInputContext.Provider value={answerInputContextProps}>
          <MecaDescriptionInputContext.Provider value={descriptionInputContextProps}>
            <SelectCaseNumberContext.Provider value={caseNumberIncreaseContextProps}>
              <MecaValidatedInputs.Provider value={getAllValidatedInputsContextProps}>
                {children}
              </MecaValidatedInputs.Provider>
            </SelectCaseNumberContext.Provider>
          </MecaDescriptionInputContext.Provider>
        </MecaAnswerInputContext.Provider>
      </MecaQuestionInputContext.Provider>
    </MecaTitleInputContext.Provider>
  );
};

export const useMecaTitleContext = () => useContext(MecaTitleInputContext);
export const useMecaQuestionContext = () => useContext(MecaQuestionInputContext);
export const useMecaAnswerContext = () => useContext(MecaAnswerInputContext);
export const useMecaDescriptionContext = () => useContext(MecaDescriptionInputContext);
export const useMecaSelectTypeCaseNumberContext = () => useContext(SelectCaseNumberContext);
export const useGetValidatedMecaInputsContext = () => useContext(MecaValidatedInputs);
