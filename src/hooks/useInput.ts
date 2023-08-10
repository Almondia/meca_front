import { useCallback, useState } from 'react';

function useInput(initialInput: string) {
  const [input, setInput] = useState(initialInput);
  const [changed, setChange] = useState<boolean>(false);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      setChange(() => true);
    },
    [],
  );

  const inputReset = useCallback(() => {
    setInput('');
    setChange(false);
  }, []);

  return { input, setInput, onInputChange, inputReset, changed };
}

export default useInput;
