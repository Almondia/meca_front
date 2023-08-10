import { useState } from 'react';

import { ContraintsResultType } from '@/utils/validation';

const useInputValidation = (initialInputNumber: number) => {
  const [inputsValidState, setInputsValidState] = useState<ContraintsResultType[]>(
    [...Array(initialInputNumber)].map(() => ({
      isValid: true,
      message: '',
    })),
  );

  const validateAll = (callbacks: (() => ContraintsResultType)[]) => {
    const hasInvalid = callbacks.some((callback, invalidIdx) => {
      const { isValid, message } = callback();
      if (!isValid) {
        setInputsValidState((prevInputsValid) =>
          prevInputsValid.map((_, idx) => (idx === invalidIdx ? { isValid, message } : { isValid: true, message: '' })),
        );
        return true;
      }
      return false;
    });
    return { hasInvalid };
  };

  const resetValidateState = () => {
    setInputsValidState(
      [...Array(initialInputNumber)].map(() => ({
        isValid: true,
        message: '',
      })),
    );
  };

  return { inputsValidState, validateAll, resetValidateState };
};

export default useInputValidation;
