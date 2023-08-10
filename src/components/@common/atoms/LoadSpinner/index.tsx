import { memo } from 'react';

import { ElementSizeType } from '@/types/common';

import { LoadSpinnerWrapper } from './styled';

interface LoadSpinnerProps {
  width: ElementSizeType;
  height?: ElementSizeType;
  size?: ElementSizeType;
}

const LoadSpinner = memo(({ width, height, size = '2.25rem' }: LoadSpinnerProps) => (
  <LoadSpinnerWrapper data-testid="id-scroll-load-spinner" width={width} height={height} size={size}>
    <div />
  </LoadSpinnerWrapper>
));

export default LoadSpinner;
