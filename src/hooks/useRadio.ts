import { useRef } from 'react';

const useRadio = () => {
  const fieldSet = useRef<HTMLFieldSetElement>(null);

  const forceClick = (value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
    if (!fieldSet.current) {
      return;
    }
    const inputs = Array.from(fieldSet.current.querySelectorAll(`input[type="radio"]`)) as HTMLInputElement[];
    const input = inputs.find((ip) => ip.value === value);
    if (input) {
      input.checked = true;
      const event = { target: input };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const hasCheckedRadio = () => {
    if (!fieldSet.current) {
      return false;
    }
    return fieldSet.current.querySelector('input[type="radio"]:checked');
  };

  return { fieldSet, forceClick, hasCheckedRadio };
};

export default useRadio;
