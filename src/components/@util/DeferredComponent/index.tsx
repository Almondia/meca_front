/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';

interface DeferredComponentProps {
  children: React.ReactNode;
  delay?: number;
  keepLayout?: boolean;
}

const DeferredComponent = ({ children, delay = 200, keepLayout = false }: DeferredComponentProps) => {
  const [isDeferred, setIsDeferred] = useState<boolean>(false);
  const debouncedSetDeffered = useDebounce(() => setIsDeferred(true), delay);
  useEffect(() => {
    debouncedSetDeffered();
  }, []);
  if (!isDeferred) {
    return null;
  }
  return keepLayout ? <div style={{ opacity: 0 }}>{children}</div> : <>{children}</>;
};

export default DeferredComponent;
