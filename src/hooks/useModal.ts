import { useCallback, useState } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
  }, []);

  return { visible, close, open };
};

export default useModal;
