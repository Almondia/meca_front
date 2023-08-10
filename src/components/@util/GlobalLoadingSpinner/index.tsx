import { useIsMutating } from '@tanstack/react-query';

import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import useGlobalLoading from '@/hooks/useGlobalLoading';

import { GlobalLoadingSpinnerWrapper } from './styled';

const GlobalLoadingSpinner = () => {
  const { isGlobalLoading } = useGlobalLoading();
  const isMutating = useIsMutating({ mutationKey: ['default'], exact: true });
  return (
    <GlobalLoadingSpinnerWrapper isVisible={!!(isMutating || isGlobalLoading)}>
      <LoadSpinner width="100%" height="100%" />
    </GlobalLoadingSpinnerWrapper>
  );
};

export default GlobalLoadingSpinner;
