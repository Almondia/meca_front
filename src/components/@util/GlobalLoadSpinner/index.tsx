/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

import { useIsMutating } from '@tanstack/react-query';

import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import useDebounce from '@/hooks/useDebounce';
import useGlobalLoading from '@/hooks/useGlobalLoading';

import { GlobalLoadSpinnerWrapper } from './styled';

const GlobalLoadSpinner = () => {
  const { isGlobalLoading } = useGlobalLoading();
  const isMutating = useIsMutating({ mutationKey: ['default'], exact: true });
  const isLoading = !!(isMutating || isGlobalLoading);
  const [isDeferred, setIsDeferred] = useState(false);
  const debouncedSetDeferred = useDebounce(setIsDeferred, 200);
  useEffect(() => {
    if (isLoading) {
      debouncedSetDeferred(true);
      return () => {
        debouncedSetDeferred(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <GlobalLoadSpinnerWrapper isDeferred={isDeferred} isVisible={isLoading}>
      <LoadSpinner width="100%" height="100%" />
    </GlobalLoadSpinnerWrapper>
  );
};

export default GlobalLoadSpinner;
