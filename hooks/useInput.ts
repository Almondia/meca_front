import { useState } from 'react';

function useInput(initialInput: string) {
  const [input, setInput] = useState(initialInput);
  const [changed, setChange] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
    !changed && setChange(true);
  };

  const inputReset = () => {
    setInput('');
    setChange(false);
  };

  return { input, setInput, onInputChange, inputReset, changed };
}

export default useInput;
