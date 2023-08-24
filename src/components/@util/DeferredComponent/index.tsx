/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import useDebounce from '@/hooks/useDebounce';

interface DeferredComponentProps {
  children: React.ReactNode;
  delay?: number;
  keepLayout?: boolean;
}

const DefferedComponentWrapper = styled.div`
  opacity: 0;
  .skeleton-item::before {
    display: none;
  }
`;

const DeferredComponent = ({ children, delay = 200, keepLayout = false }: DeferredComponentProps) => {
  const [isDeferred, setIsDeferred] = useState<boolean>(false);
  const debouncedSetDeffered = useDebounce(() => setIsDeferred(true), delay);
  useEffect(() => {
    debouncedSetDeffered();
  }, []);
  if (!isDeferred) {
    return keepLayout ? <DefferedComponentWrapper>{children}</DefferedComponentWrapper> : null;
  }
  return <>{children}</>;
};

export default DeferredComponent;
