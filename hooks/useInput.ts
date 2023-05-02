import { useState } from 'react';

function useInput(initialInput: string) {
  const [input, setInput] = useState(initialInput);
  const [changed, setChange] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    !changed && setChange(true);
  };

  const inputReset = () => {
    setInput('');
    setChange(false);
  };

  return { input, setInput, onInputChange, inputReset, changed };
}

export default useInput;
