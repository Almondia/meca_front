import { useState } from 'react';

function useInput(initialInput: string) {
  const [input, setInput] = useState(initialInput);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
  };

  const inputReset = () => {
    setInput('');
  };

  return { input, setInput, onInputChange, inputReset };
}

export default useInput;
